import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';

export const loginAsAdmin = async () => {
    try {
        await signInWithEmailAndPassword(
            auth,
            process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
            process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD,
        );
    } catch (err) {
        console.error('❌ Erreur login Firebase :', err);
    }
};
