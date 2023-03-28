'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import ChatGPTIcon from './ChatGPTIcon';

function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session && status === 'authenticated') {
    router.push('/chat');
    return (
      <div className='login'>
        <ChatGPTIcon className='w-10 h-10' />
        <p>Logging in...</p>
      </div>
    );
  }

  return (
    <div className='login'>
      <ChatGPTIcon className='w-10 h-10' />
      <div className='flex flex-col gap-2'>
        <p>Welcome to ChatGPT</p>
        <p>Log in with your account to continue</p>
      </div>
      <div className='flex gap-3'>
        <button
          onClick={() => signIn('google')}
          className='bg-[#11A37F] py-2.5 px-3 rounded-[4px] text-sm'
        >
          {status === 'loading' && <p>Loading...</p>}
          {!session && status === 'unauthenticated' && <>Log in</>}
        </button>
        {!session && status === 'unauthenticated' && (
          <button
            onClick={() => signIn()}
            className='bg-[#11A37F] p-2.5 px-3 rounded-[4px] text-sm'
          >
            Sign up
          </button>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
