import { redirect } from 'next/navigation';

export default function AdminPage() {
    // Redirección instantánea al centro de control
    redirect('/admin/dashboard');
}