import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import { db } from '../firebase';
import { useAppContext } from './AppProvider';
import { useModelContext } from './ModelProvider';

type ChatInputProps = {
  chatId?: string;
};

function ChatInput({ chatId }: ChatInputProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { inputText, setInputText } = useAppContext();

  const { model } = useModelContext();

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText) return;
    const input = inputText.trim();

    // If there is no chatId, it means the message was sent from /chat route.
    // So we need to create a chatId.
    let newChatId = '';

    if (!chatId) {
      const chatDoc = await addDoc(
        collection(db, 'users', session?.user?.email!, 'chats'),
        {
          userId: session?.user?.email,
          createdAt: serverTimestamp(),
        }
      );

      newChatId = chatDoc.id;
    }

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        'users',
        session?.user?.email!,
        'chats',
        chatId ?? newChatId,
        'messages'
      ),
      message
    );

    // Toast Notification to say loading
    const notification = toast.loading('ChatGPT is thinking...');

    await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        queryText: input,
        model: model?.value,
        session,
        chatId: chatId ?? newChatId,
      }),
    })
      .then(() => {
        // Toast notification to say successful
        toast.success('ChatGPT has responded!', {
          id: notification,
        });
        if (!chatId) {
          router.push(`/chat/${newChatId}`);
        }
      })
      .finally(() => {
        setInputText('');
      });
  };

  return (
    <div className='text-sm p-5 dark:bg-gray-700/50 text-gray-700 dark:text-gray-400 border-t border-black/10 dark:border-gray-900/10'>
      <form onSubmit={sendMessage} className='flex'>
        <input
          disabled={!session}
          className='bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-30'
          type='text'
          placeholder='Type your message here...'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          type='submit'
          disabled={!inputText || !session}
          className='bg-[#11A37F] text-white font-bold px-2 py-2 md:px-4 hover:opacity-50 rounded disabled:cursor-not-allowed disabled:bg-gray-300 ml-2'
        >
          <PaperAirplaneIcon className='h-4 w-4 -rotate-45' />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
