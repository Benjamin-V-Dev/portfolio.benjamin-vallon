'use client';

import { checkEmail } from '@/utils/check-emailsyntax';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import Login from '@/components/Dashboard/Login';

export default function Signin() {
    // Variable
    const router = useRouter();

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
        } catch (error) {
            return toast.error(error.message);
        }

        // Success
        toast.success('Vous êtes connecté');

        // Redirect
        router.replace('/dashboard');
    };
    return (
        <div>
            <Login prepareLogin={prepareLogin}></Login>
        </div>
    );
}
