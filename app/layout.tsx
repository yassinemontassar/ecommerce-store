import { Urbanist } from 'next/font/google'


import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import './globals.css'
import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'
import NewsletterForm from '@/components/NewsletterForm'
import { Metadata } from 'next'

const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default:'RoundaStore - Votre boutique locale en Tunisie',
    template:"%s - RoundaStore - Votre boutique locale en Tunisie'"
  },
  description: 'RoundaStore - Votre magasin local tunisien, lendroit pour tous vos achats.',
  twitter: {
    card: "summary_large_image"
  }
};

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