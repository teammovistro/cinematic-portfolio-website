import { NextResponse } from 'next/server'
import { getTelegramConfig, saveTelegramConfig } from '@/lib/db'

export async function GET() {
  try {
    const config = await getTelegramConfig()
    return NextResponse.json(config)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Telegram config' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    await saveTelegramConfig(body)
    return NextResponse.json(body)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save Telegram config' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const botToken = body.botToken
    const recipients = body.recipients || []

    if (!botToken) {
      return NextResponse.json({ error: 'Bot token is missing' }, { status: 400 })
    }

    const activeRecipients = recipients.filter((r: any) => r.enabled && r.chatId)
    if (activeRecipients.length === 0) {
      return NextResponse.json({ error: 'No active recipient chat IDs configured' }, { status: 400 })
    }

    const text = `🎬 *MOVISTRO STUDIO OS — TELEGRAM BOT TEST*\n\n` +
      `⚡ This is a test transmission from your Studio Executive OS.\n\n` +
      `*System Status:* \`ONLINE & OPERATIONAL\`\n` +
      `*Recipients Configured:* \`${activeRecipients.length} Studio Team Member(s)\`\n\n` +
      `_Your Telegram notification pipeline is connected and ready to broadcast real-time client inquiries._`

    const results = await Promise.all(
      activeRecipients.map(async (recipient: any) => {
        try {
          const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: recipient.chatId,
              text,
              parse_mode: 'Markdown',
            }),
          })
          const data = await res.json()
          return { recipient: recipient.name, chatId: recipient.chatId, ok: data.ok, result: data }
        } catch (err: any) {
          return { recipient: recipient.name, chatId: recipient.chatId, ok: false, error: err.message }
        }
      })
    )

    return NextResponse.json({ success: true, results })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send test notification' }, { status: 500 })
  }
}
