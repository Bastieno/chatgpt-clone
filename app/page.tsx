'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!session && status === 'loading') {
    return <div className='home'>Please wait...</div>;
  }

  if (session && status === 'authenticated') {
    router.push('/chat');
    return <div className='home'>Redirecting to chat page...</div>;
  }

  if (!session && status === 'unauthenticated') {
    router.push('/login');
    return (
      <div className='home'>
        <div className='w-[80%] mx-auto'>Redirecting to login page...</div>
      </div>
    );
  }
}
