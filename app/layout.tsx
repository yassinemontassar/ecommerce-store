import { Urbanist } from 'next/font/google'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import './globals.css'
import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'
import NewsletterForm from '@/components/NewsletterForm'

const font = Urbanist({ subsets: ['latin'] })

const metadata = {
 title: 'RoundaStore - Votre boutique locale en Tunisie',
 description: 'RoundaStore - Votre magasin local tunisien, lendroit pour tous vos achats.',
 og: {
    title: 'RoundaStore - Votre boutique locale en Tunisie',
    description: 'RoundaStore - Votre magasin local tunisien, lendroit pour tous vos achats.',
    image: 'https://res.cloudinary.com/dtquv74c5/image/upload/v1705261354/xix8orq5pco1mlmpjfid.jpg',
    type: 'website',
 },
 twitter: {
    card: 'summary_large_image',
    site: '@roundastore',
 },
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
        <Footer />
        <NewsletterForm />
      </body>
    </html>
 )
}