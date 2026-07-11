import { NextResponse } from 'next/server'
import { getProjects, saveProjects, ProjectItem } from '@/lib/db'

export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const projects = await getProjects()

    const newProject: ProjectItem = {
      id: body.id || `proj-${Date.now()}`,
      title: body.title || 'Untitled Project',
      category: body.category || 'Cinematic',
      year: body.year || new Date().getFullYear().toString(),
      img: body.img || '/images/reel.png',
      description: body.description || 'A cinematic exploration of light and shadow.',
      active: body.active !== undefined ? body.active : true,
      featured: body.featured !== undefined ? body.featured : true,
    }

    projects.unshift(newProject)
    await saveProjects(projects)

    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const projects = await getProjects()

    // Support bulk reordering or replacing
    if (Array.isArray(body)) {
      await saveProjects(body)
      return NextResponse.json(body)
    }

    // Update single item
    const index = projects.findIndex((p) => p.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    projects[index] = { ...projects[index], ...body }
    await saveProjects(projects)

    return NextResponse.json(projects[index])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      const body = await req.json().catch(() => ({}))
      if (!body.id) {
        return NextResponse.json({ error: 'Project ID required' }, { status: 400 })
      }
      const projects = await getProjects()
      const filtered = projects.filter((p) => p.id !== body.id)
      await saveProjects(filtered)
      return NextResponse.json({ success: true, count: filtered.length })
    }

    const projects = await getProjects()
    const filtered = projects.filter((p) => p.id !== id)
    await saveProjects(filtered)

    return NextResponse.json({ success: true, count: filtered.length })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
