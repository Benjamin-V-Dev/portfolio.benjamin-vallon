'use client';
import { createUser } from '@/actions/create-user';
import { checkEmail } from '@/utils/check-emailsyntax';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';
import { Login } from '@/components/Dashboard/Login';

export default function SignUp() {
    // Variables
    const router = useRouter();

    // Function
    const prepareCreateUser = async (formData) => {
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const passwordConfirm = formData.get('passwordConfirm');

        console.log("Je suis dans le prepareUser");
        
        console.log(username,email,password,passwordConfirm);
        

        // If a field is empty
        if (!username || !email || !password || !passwordConfirm) {
            // Notification
            return toast.error('Aucun champ ne doit être vide');
        }

        // Ckeck if the email is valid
        if (!checkEmail(email)) {
            return toast.error('Veuillez entrer un email valide');
        }

        // Ckeck if the password is valid
       if (password !== passwordConfirm) {
           return toast.error('Les mots de passe ne sont pas identiques');
       }

        try {
            await createUser(username, email, password,passwordConfirm);
        } catch (error) {
            return toast.error(error.message);
        }

        // Success
        toast.success('Votre compte à bien été crée !');

        // Redirect
        router.push('/login/signin');
    };
    return (
        <div>
            <Login prepareCreateUser={prepareCreateUser}></Login>
        </div>
    );
}
