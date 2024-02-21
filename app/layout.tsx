import { Urbanist } from 'next/font/google'


import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import './globals.css'
import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'
import NewsletterForm from '@/components/NewsletterForm'
import { Metadata } from 'next'
import {  GoogleTagManager } from '@next/third-parties/google'
const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('http://rounda.duckdns.org'),
  title: {
    default:'RoundaStore - Impression sur tout support',
    template:"%s - RoundaStore - Impression sur tout support"
  },
  description: 'RoundaStore - Votre magasin local tunisien, Personnalisez votre T-shirt , polo , coussin , mug',
  keywords: 'Impression sur vêtements Tunisie, Personnalisation de vêtements en Tunisie, T-shirt personnalisé Tunisie, Polo imprimé Tunisie, Vêtements personnalisés Tunisie, Boutique de vêtements imprimés en Tunisie, Textile personnalisé Tunisie, Coussin personnalisé Tunisie, Mug personnalisé Tunisie, Vêtements imprimés en ligne Tunisie, Boutique de vêtements personnalisés en Tunisie, Création textile Tunisie, Mode personnalisée Tunisie, Tee-shirt original Tunisie, Vêtements sur mesure Tunisie, Design textile Tunisie, Boutique locale de vêtements en Tunisie, Création de vêtements uniques Tunisie, Collection de vêtements imprimés Tunisie, Art vestimentaire Tunisie',
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
    <html lang="fr">
      <body className={font.className}>
        <ModalProvider />
        <ToastProvider />
        <Navbar />
        {children}
        <GoogleTagManager gtmId="G-KSPJ4QEB0J" />
        <Footer />
        <NewsletterForm />
      </body>
    </html>
  )
}