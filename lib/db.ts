import fs from 'fs/promises'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

export interface ProjectItem {
  id: string
  title: string
  category: string
  year: string
  img: string
  description: string
  active: boolean
  featured: boolean
}

export interface InquiryItem {
  id: string
  name: string
  email: string
  phone?: string
  type: string
  budget?: string
  message: string
  status: 'new' | 'in-review' | 'contacted' | 'archived'
  date: string
  notes?: string
}

export interface SettingsData {
  name: string
  tagline: string
  foundedYear: string
  email: string
  phone: string
  location: string
  aboutText: string
  enableVignette: boolean
  enableFilmGrain: boolean
  socials?: {
    instagram?: string
    vimeo?: string
    youtube?: string
  }
}

export type UserRole = 'super_admin' | 'editor' | 'viewer'

export interface UserItem {
  id: string
  username: string
  password?: string
  name: string
  role: UserRole
  email: string
  createdAt: string
  active: boolean
}

export interface TelegramRecipient {
  id: string
  name: string
  role: string
  chatId: string
  enabled: boolean
}

export interface TelegramConfig {
  botToken: string
  enabled: boolean
  recipients: TelegramRecipient[]
}

async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  try {
    const filePath = path.join(DATA_DIR, filename)
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data) as T
  } catch (error) {
    console.error(`Error reading ${filename}, using fallback:`, error)
    return fallback
  }
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  try {
    const filePath = path.join(DATA_DIR, filename)
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
  } catch (error) {
    console.error(`Error writing to ${filename}:`, error)
    throw error
  }
}

export async function getProjects(): Promise<ProjectItem[]> {
  return readJsonFile<ProjectItem[]>('projects.json', [])
}

export async function saveProjects(projects: ProjectItem[]): Promise<void> {
  return writeJsonFile('projects.json', projects)
}

export async function getInquiries(): Promise<InquiryItem[]> {
  return readJsonFile<InquiryItem[]>('inquiries.json', [])
}

export async function saveInquiries(inquiries: InquiryItem[]): Promise<void> {
  return writeJsonFile('inquiries.json', inquiries)
}

export async function getSettings(): Promise<SettingsData> {
  return readJsonFile<SettingsData>('settings.json', {
    name: 'MOVISTRO',
    tagline: 'Cinematography · Photography · Management · Marketing',
    foundedYear: '2024',
    email: 'hello@movistro.com',
    phone: '+880 1793-602999',
    location: 'Faridpur, Bangladesh — Worldwide',
    aboutText: 'A global production studio providing premier Cinematography, Photography, Talent Management, and Strategic Film Marketing.',
    enableVignette: true,
    enableFilmGrain: true,
  })
}

export async function saveSettings(settings: SettingsData): Promise<void> {
  return writeJsonFile('settings.json', settings)
}

export async function getUsers(): Promise<UserItem[]> {
  const users = await readJsonFile<UserItem[]>('users.json', [
    {
      id: 'user-admin',
      username: 'admin',
      password: 'movistro',
      name: 'Movistro Executive',
      role: 'super_admin',
      email: 'admin@movistro.com',
      createdAt: new Date().toISOString(),
      active: true,
    },
  ])
  return users
}

export async function saveUsers(users: UserItem[]): Promise<void> {
  return writeJsonFile('users.json', users)
}

export async function getTelegramConfig(): Promise<TelegramConfig> {
  return readJsonFile<TelegramConfig>('telegram.json', {
    botToken: '',
    enabled: false,
    recipients: [
      {
        id: 'rec-1',
        name: 'Executive Producer',
        role: 'Super Admin',
        chatId: '',
        enabled: true,
      },
    ],
  })
}

export async function saveTelegramConfig(config: TelegramConfig): Promise<void> {
  return writeJsonFile('telegram.json', config)
}

export async function sendTelegramNotification(inquiry: InquiryItem): Promise<void> {
  try {
    const config = await getTelegramConfig()
    if (!config.enabled || !config.botToken) {
      return
    }

    const activeRecipients = config.recipients.filter((r) => r.enabled && r.chatId)
    if (activeRecipients.length === 0) {
      return
    }

    const text = `🎬 *NEW CINEMATIC INQUIRY RECEIVED*\n\n` +
      `*Client:* ${inquiry.name}\n` +
      `*Email:* \`${inquiry.email}\`\n` +
      `*Phone:* \`${inquiry.phone || 'Not Provided'}\`\n` +
      `*Project Type:* #${inquiry.type.toUpperCase()}\n` +
      `*Proposed Budget:* ${inquiry.budget || 'Not Specified'}\n\n` +
      `*Project Brief & Treatment:*\n_"${inquiry.message}"_\n\n` +
      `⚡ _Log into Movistro Studio OS to review and respond._`

    await Promise.all(
      activeRecipients.map(async (recipient) => {
        try {
          const res = await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: recipient.chatId,
              text,
              parse_mode: 'Markdown',
            }),
          })
          const data = await res.json()
          if (!data.ok) {
            console.error(`Telegram bot send failed for chat ${recipient.chatId}:`, data)
          }
        } catch (err) {
          console.error(`Error sending Telegram alert to ${recipient.name}:`, err)
        }
      })
    )
  } catch (error) {
    console.error('Error in sendTelegramNotification:', error)
  }
}
