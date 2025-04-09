import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import ResponsiveTool from '@/components/Tools/Responsive';
import Halo from '@/components/Halo';
import ClientLoader from '@/components/Loader/ClientLoader';
import Footer from '@/components/Footer';
import ConsentManager from '@/components/ConsentManager';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './Providers';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'], // Normal et Bold
});

export const metadata = {
    title: {
        default: 'Benjamin Vallon : Développeur web Fullstack', //Titre utilisé également pour Twitter et OG (max 70 caractères)
    },
    description:
        "Bienvenue sur mon portfolio 🙂", //description utilisé également pour Twitter et OG (max 200 caractères)
    twitter: {
        card: 'summary_large_image',
    },
    openGraph: {
        images: [
            {
                url: '/benjamin.webp',
            },
        ],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang='fr'>
            <body className={roboto.className}>
                <AuthProvider>
                    <ToastContainer position='bottom-right' />
                    <Header />
                    <Halo />
                    {/* <ResponsiveTool /> */}
                    <ClientLoader>
                        <main>
                            <ConsentManager />
                            {children}
                        </main>
                    </ClientLoader>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
