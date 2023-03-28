'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SideMenu } from '../../components/SideBar';
import ClientProvider from '../../components/ClientProvider';
import ModelProvider from '../../components/ModelProvider';
import MenuProvider from '../../components/MenuProvider';
import ViewportProvider from '../../components/ViewportProvider';
import { ThemeProvider } from 'next-themes';
import AppProvider from '../../components/AppProvider';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!session && status === 'unauthenticated') {
    router.push('/login');
  }

  return (
    <AppProvider>
      <ThemeProvider enableSystem={true} attribute='class'>
        <ViewportProvider>
          <MenuProvider>
            <ModelProvider>
              <SideMenu />
              <ClientProvider />
              {status === 'authenticated' && (
                <div className='dark:bg-[#343541] h-[100%]'>{children}</div>
              )}
            </ModelProvider>
          </MenuProvider>
        </ViewportProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
