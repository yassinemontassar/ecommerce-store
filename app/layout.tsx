import { Urbanist } from 'next/font/google'


import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

import './globals.css'
import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'
import NewsletterForm from '@/components/NewsletterForm'

const font = Urbanist({ subsets: ['latin'] })

export const metadata = {
  title: 'RoundaStore',
  description: 'RoundaStore - Tunisian local store, The place for all your purchases.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ModalProvider />
        <ToastProvider />
        <Navbar />
        {children}
        <Footer />
        <NewsletterForm />
      </body>
    </html>
  )
}