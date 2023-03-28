import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { collection, deleteDoc, doc, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { useAppContext } from './AppProvider';

type ChatRowProps = {
  id: string;
  closeMenu?: () => void;
};

function ChatRow({ id, closeMenu }: ChatRowProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [messages] = useCollection(
    query(
      collection(db, 'users', session?.user?.email!, 'chats', id, 'messages')
    )
  );

  const [active, setActive] = useState(false);
  const { updateChatIds } = useAppContext();

  const removeChat = async () => {
    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
    router.replace('/chat');
  };

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname, id]);

  useEffect(() => {
    if (id && messages) {
      const msg = messages?.docs[0]?.data().text || 'New Chat';
      updateChatIds({
        [id]: msg,
      });
    }
  }, [id, messages?.docs.length]);

  if (!messages) return null;

  return (
    <Link
      href={`chat/${id}`}
      className={`sidebarRow justify-center ${active && 'bg-gray-700/50'}`}
      onClick={closeMenu}
    >
      <ChatBubbleLeftIcon className='h-4 w-4' />
      <p className='flex-1 inline-flex truncate'>
        {messages?.docs[0]?.data().text || 'New Chat'}
      </p>
      <TrashIcon
        onClick={removeChat}
        className='h-4 w-4 text-gray-700 hover:text-red-700'
      />
    </Link>
  );
}

export default ChatRow;
