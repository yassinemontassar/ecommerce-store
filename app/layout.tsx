import { Urbanist } from 'next/font/google'


import NewsletterForm from '@/components/NewsletterForm'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'
const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://ecommerce-store-nu-taupe.vercel.app/'),
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
        <GoogleAnalytics gaId='G-KSPJ4QEB0J' />
        <Footer />
        <Suspense>
        <NewsletterForm />
        </Suspense>
      </body>
    </html>
  )
}