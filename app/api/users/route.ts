import { NextResponse } from 'next/server'
import { getUsers, saveUsers, UserItem } from '@/lib/db'

export async function GET() {
  try {
    const users = await getUsers()
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const users = await getUsers()

    // check if username exists
    if (users.some((u) => u.username.toLowerCase() === body.username.toLowerCase())) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 })
    }

    const newUser: UserItem = {
      id: `user-${Date.now()}`,
      username: body.username,
      password: body.password || 'movistro',
      name: body.name || 'Movistro Team Member',
      role: body.role || 'viewer',
      email: body.email || `${body.username}@movistro.com`,
      createdAt: new Date().toISOString(),
      active: true,
    }

    const updated = [newUser, ...users]
    await saveUsers(updated)
    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const users = await getUsers()

    const index = users.findIndex((u) => u.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // prevent demoting last super_admin if active status or role is changing
    if (users[index].role === 'super_admin' && (body.role !== 'super_admin' || body.active === false)) {
      const superAdminsCount = users.filter((u) => u.role === 'super_admin' && u.active).length
      if (superAdminsCount <= 1) {
        return NextResponse.json({ error: 'Cannot demote or deactivate the last active Super Admin' }, { status: 400 })
      }
    }

    const updatedUser = {
      ...users[index],
      ...body,
    }

    users[index] = updatedUser
    await saveUsers(users)
    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const users = await getUsers()
    const userToDelete = users.find((u) => u.id === id)

    if (!userToDelete) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (userToDelete.role === 'super_admin') {
      const superAdminsCount = users.filter((u) => u.role === 'super_admin' && u.active).length
      if (superAdminsCount <= 1) {
        return NextResponse.json({ error: 'Cannot delete the last remaining Super Admin' }, { status: 400 })
      }
    }

    const filtered = users.filter((u) => u.id !== id)
    await saveUsers(filtered)
    return NextResponse.json({ success: true, deletedId: id })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
