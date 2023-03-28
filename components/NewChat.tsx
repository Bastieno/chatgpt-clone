import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useMenuContext } from './MenuProvider';

function NewChat() {
  const { closeMenu } = useMenuContext();
  return (
    <Link
      href='/chat'
      className='sidebarRow border border-gray-700'
      onClick={closeMenu}
    >
      <PlusIcon className='h-4 w-4' />
      <p>New Chat</p>
    </Link>
  );
}

export default NewChat;
