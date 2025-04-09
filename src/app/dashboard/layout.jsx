import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import NavigationButtons from '@/components/Dashboard/NagivationButtons';

export default async function DashboardLayout({ children }) {
    const session = await getServerSession(authOptions);
    const cookieStore = cookies();
    const isGuest = cookieStore.get('guest')?.value === 'true';

    if (!session && !isGuest) {
        redirect('/login');
    }

    return (
        <div className='min-h-screen'>
            <NavigationButtons />
            {children}
        </div>
    );
}
