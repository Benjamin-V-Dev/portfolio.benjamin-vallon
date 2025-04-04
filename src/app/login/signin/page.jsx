'use client';

import { checkEmail } from '@/utils/check-emailsyntax';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signIn, useSession } from 'next-auth/react';
import Login from '@/components/Dashboard/Login';
import { useEffect } from 'react';
import { deleteCookie } from 'cookies-next';

export default function Signin() {
    // Variable
    const router = useRouter();
    const { data: session } = useSession();

    // Function
    const prepareLogin = async (formData) => {
        const email = formData.get('email');
        const password = formData.get('password');

        // If a field is empty
        if (!email || !password) {
            return toast.error('Veuillez remplir tous les champs');
        }

        // Check if the email is valid
        if (!checkEmail(email)) {
            return toast.error('Veuillez entrer un email valide');
        }

        // Signin the user
        try {
            const response = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (response.error) {
                return toast.error(response.error);
            }

            // Success
            toast.success('Vous êtes connecté');

            // Attendre un court instant pour que la session soit établie
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 100);

            deleteCookie('guest');
        } catch (error) {
            return toast.error(error.message);
        }
    };

    // Redirection automatique si déjà connecté
    useEffect(() => {
        if (session) {
            router.replace('/dashboard');
        }
    }, [session, router]);

    return (
        <div>
            <Login prepareLogin={prepareLogin}></Login>
        </div>
    );
}
