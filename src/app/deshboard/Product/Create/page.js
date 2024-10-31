import { cookies } from 'next/headers';
import { verifyJWT } from '@/app/lib/token';
import { prisma } from '@/app/lib/prisma';
import { redirect } from 'next/navigation';
import ProductForm from './ProductForm';

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = await cookieStore.get('token')?.value;
console.log(token,"token")
  if (!token) {
    redirect('/auth/signin');
    return null;
  }

  try {
    const decodedToken = await verifyJWT(token);
    console.log(decodedToken,"decodedToken")
    if (!decodedToken || !decodedToken.sub) {
      throw new Error('Invalid token');
    }

   
    return <ProductForm />;
  } catch (error) {
    console.error('Error in server-side logic:', error);
    redirect('/auth/signin');
    return null;
  }
}
