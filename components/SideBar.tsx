import { useSession, signOut } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { slide as Menu } from 'react-burger-menu';
import { collection, orderBy, query } from 'firebase/firestore';
import {
  PlusIcon,
  XMarkIcon,
  Bars3Icon,
  TrashIcon,
  ArrowRightOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

import { db } from '../firebase';
import ChatRow from './ChatRow';
import ModelSelection from './ModelSelection';
import { useAppContext } from './AppProvider';
import { useMenuContext } from './MenuProvider';
import { useViewport } from './ViewportProvider';
import useDarkMode from '../hooks/useDarkMode';
import NewChat from './NewChat';

export function SideMenu() {
  const { data: session } = useSession();
  const { isMenuOpen, stateChangeHandler, closeMenu } = useMenuContext();
  const { isMobile } = useViewport();
  const { node, themeChanger } = useDarkMode();

  const [chats] = useCollection(
    session &&
      query(
        collection(db, 'users', session.user?.email!, 'chats'),
        orderBy('createdAt', 'asc')
      )
  );

  // Close SideMenu if viewport is not mobile
  useEffect(() => {
    if (!isMobile) {
      closeMenu();
    }
  }, [isMobile]);

  return (
    <Menu
      customBurgerIcon={false}
      isOpen={isMenuOpen}
      onStateChange={(state) => stateChangeHandler(state)}
      customCrossIcon={<XMarkIcon className='h-4 w-4 text-white' />}
    >
      <div className='top-section'>
        <div>
          <NewChat />
          <ModelSelection />
        </div>
        <div className='flex flex-col space-y-2 my-2 overflow-y-auto'>
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} closeMenu={closeMenu} />
          ))}
        </div>
      </div>
      <div className='second-section border-t border-white/20 overflow-auto'>
        <div className='sidebarRow mt-2' onClick={closeMenu}>
          <TrashIcon className='h-4 w-4' />
          <p>Clear conversations</p>
        </div>
        <div
          className='sidebarRow'
          onClick={() => {
            themeChanger();
            closeMenu();
          }}
        >
          {node}
        </div>
        <a
          href='https://help.openai.com/en/collections/3742473-chatgpt'
          target='_blank'
          className='sidebarRow'
        >
          <ArrowTopRightOnSquareIcon className='h-4 w-4' />
          <p>Updates & FAQ</p>
        </a>
        <div
          className='sidebarRow'
          onClick={() => {
            signOut();
            closeMenu();
          }}
        >
          <ArrowRightOnRectangleIcon className='h-4 w-4' />
          <p>Log out</p>
        </div>
      </div>
    </Menu>
  );
}

function MobileComponent() {
  const pathname = usePathname();
  const { toggleMenu } = useMenuContext();
  const { chatIds } = useAppContext();

  let msgTitle = 'New Chat';

  const [, , currentChatId] = (pathname ?? '').split('/');

  if (currentChatId) {
    msgTitle = chatIds[currentChatId];
  }

  return (
    <div className='top-nav text-gray-200 border-b dark:border-white/20'>
      <button onClick={toggleMenu}>
        <Bars3Icon className='w-7 h-7' />
      </button>
      <p className='text-center truncate px-6'>{msgTitle}</p>
      <PlusIcon className='w-6 h-6' />
    </div>
  );
}

function DesktopComponent() {
  const { data: session } = useSession();

  const [chats] = useCollection(
    session &&
      query(
        collection(db, 'users', session.user?.email!, 'chats'),
        orderBy('createdAt', 'asc')
      )
  );

  const { node, themeChanger } = useDarkMode();

  return (
    <div className='bm-item-list'>
      <div className='top-section p-2'>
        <div>
          <NewChat />
          <ModelSelection />
        </div>
        <div className='flex flex-col space-y-2 my-2 overflow-y-auto'>
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>
      </div>

      <div className='second-section border-t border-white/20 p-2 overflow-auto'>
        <div className='sidebarRow'>
          <TrashIcon className='h-4 w-4' />
          <p>Clear conversations</p>
        </div>
        <div className='sidebarRow' onClick={themeChanger}>
          {node}
        </div>
        <a
          href='https://help.openai.com/en/collections/3742473-chatgpt'
          target='_blank'
          className='sidebarRow'
        >
          <ArrowTopRightOnSquareIcon className='h-4 w-4' />
          <p>Updates & FAQ</p>
        </a>
        <div className='sidebarRow' onClick={() => signOut()}>
          <ArrowRightOnRectangleIcon className='h-4 w-4' />
          <p>Log out</p>
        </div>
      </div>
    </div>
  );
}

function SideBar() {
  const { isMobile } = useViewport();

  return isMobile ? <MobileComponent /> : <DesktopComponent />;
}

export default SideBar;
