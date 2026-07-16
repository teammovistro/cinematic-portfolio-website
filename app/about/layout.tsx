import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About MOVISTRO | Premier Cinematography, Photography & Management Studio',
  description:
    'MOVISTRO is a world-class cinematography, editorial photography, talent management, and global brand marketing studio based in Faridpur, Bangladesh. Discover our story and core disciplines.',
  keywords: [
    'MOVISTRO',
    'Movistro Studio',
    'Cinematography Faridpur',
    'Bangladesh Film Production Studio',
    'Commercial Photography Bangladesh',
    'Talent Management Agency',
    'Global Brand Marketing Bangladesh',
    'Micro Logic IT',
    'Cinematic Web Experience'
  ],
  authors: [{ name: 'MOVISTRO Studio' }, { name: 'Micro Logic IT' }],
  openGraph: {
    title: 'About MOVISTRO | Premier Cinematography, Photography & Management Studio',
    description:
      'Explore MOVISTRO — our story, core disciplines in filmmaking, editorial photography, management, and global campaigns from Faridpur, Bangladesh to the world.',
    url: 'https://cinematic-portfolio-website-git-main-movistro.vercel.app/about',
    siteName: 'MOVISTRO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About MOVISTRO | Premier Cinematography & Photography Studio',
    description:
      'Explore MOVISTRO — premier cinematography, photography, and talent management studio headquartered in Faridpur, Bangladesh.',
  },
  alternates: {
    canonical: '/about',
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

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
