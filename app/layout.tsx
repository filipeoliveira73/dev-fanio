import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/lib/registry'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BannerHome from '@/components/BannerHome'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { template: '%s | Meu Blog', default: 'Meu Blog' },
  description: 'Blog sobre tecnologia e desenvolvimento de software.',
  openGraph: { type: 'website' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Header />
          <BannerHome />
          <main>{children}</main>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
