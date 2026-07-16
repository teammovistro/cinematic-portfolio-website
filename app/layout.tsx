import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo_Black, Inter, Space_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-archivo-black',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://movistro.com'),
  title: {
    default: 'MOVISTRO — Premier Cinematography & Photography Studio',
    template: '%s | MOVISTRO Studio Suite',
  },
  description:
    'A global production studio providing world-class Cinematography, Photography, Talent Management, and Film Marketing services worldwide from Faridpur, Bangladesh.',
  keywords: [
    'Movistro',
    'Movistro Studio',
    'Cinematography Bangladesh',
    'Faridpur Film Production',
    'Commercial Photography',
    'Film Marketing Services',
    'Talent Management Studio',
    'Global Cinema Production',
    '4K Cinema Reel',
    'Color Grading Suite',
  ],
  authors: [{ name: 'Movistro Studio Suite', url: 'https://movistro.com' }],
  creator: 'Movistro Studio Suite',
  publisher: 'Movistro Studio Suite',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://movistro.com',
    siteName: 'MOVISTRO Studio Suite',
    title: 'MOVISTRO — Premier Cinematography & Photography Studio',
    description:
      'Global production studio based in Faridpur, Bangladesh delivering world-class cinematography, commercial photography, talent management, and creative film marketing worldwide.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MOVISTRO Monogram Brand Logo and Studio Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MOVISTRO — Premier Cinematography & Photography Studio',
    description:
      'Global production studio providing world-class Cinematography, Photography, Talent Management, and Film Marketing services worldwide.',
    images: ['/images/og-image.jpg'],
    creator: '@movistro',
  },
  icons: {
    icon: [
      { url: '/images/logo.jpg', sizes: 'any' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/images/logo.jpg',
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#090909',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark bg-background ${inter.variable} ${archivoBlack.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
