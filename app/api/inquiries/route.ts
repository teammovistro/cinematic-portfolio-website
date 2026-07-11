import { NextResponse } from 'next/server'
import { getInquiries, saveInquiries, InquiryItem, sendTelegramNotification } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    
    let inquiries = await getInquiries()
    if (status && status !== 'all') {
      inquiries = inquiries.filter((inq) => inq.status === status)
    }

    // Sort by newest first
    inquiries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json(inquiries)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const inquiries = await getInquiries()

    const newInquiry: InquiryItem = {
      id: `inq-${Date.now()}`,
      name: body.name || 'Anonymous Client',
      email: body.email || 'no-reply@example.com',
      type: body.type || 'general',
      budget: body.budget || 'Not specified',
      message: body.message || '',
      status: 'new',
      date: new Date().toISOString(),
      notes: '',
    }

    inquiries.unshift(newInquiry)
    await saveInquiries(inquiries)

    // Automatically trigger Telegram notification broadcast asynchronously
    sendTelegramNotification(newInquiry).catch((err) =>
      console.error('Failed async Telegram notification:', err)
    )

    return NextResponse.json(newInquiry, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const inquiries = await getInquiries()

    const index = inquiries.findIndex((inq) => inq.id === body.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 })
    }

    inquiries[index] = { ...inquiries[index], ...body }
    await saveInquiries(inquiries)

    return NextResponse.json(inquiries[index])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      const body = await req.json().catch(() => ({}))
      if (!body.id) {
        return NextResponse.json({ error: 'Inquiry ID required' }, { status: 400 })
      }
      const inquiries = await getInquiries()
      const filtered = inquiries.filter((inq) => inq.id !== body.id)
      await saveInquiries(filtered)
      return NextResponse.json({ success: true })
    }

    const inquiries = await getInquiries()
    const filtered = inquiries.filter((inq) => inq.id !== id)
    await saveInquiries(filtered)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 })
  }
}
