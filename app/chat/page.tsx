'use client';

import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { useAppContext } from '../../components/AppProvider';
import ChatInput from '../../components/ChatInput';

import SideBar from '../../components/SideBar';
import { useViewport } from '../../components/ViewportProvider';

function PageContent() {
  const { exampleTexts, setInputText } = useAppContext();

  return (
    <div className='flex flex-col items-center px-4 py-8 text-gray-700 dark:text-white overflow-auto h-screen'>
      <h1 className='text-4xl font-semibold my-8 md:mt-[12rem]'>ChatGPT</h1>
      <div className='flex flex-col md:flex-row space-x-2 gap-8 text-center'>
        <div>
          <div className='flex flex-row md:flex-col items-center justify-center mb-5 gap-3'>
            <SunIcon className='h-7 w-7' />
            <h2 className='text-lg'>Examples</h2>
          </div>
          <div className='space-y-2'>
            {exampleTexts.map((text) => (
              <p
                key={text}
                className='infoText exampleText cursor-pointer'
                onClick={() => setInputText(text)}
              >
                <span>{`"${text}"`}</span>
                <ArrowRightIcon className='w-3 h-3 inline ml-1' />
              </p>
            ))}
          </div>
        </div>
        <div>
          <div className='flex flex-row md:flex-col items-center justify-center mb-5 gap-3'>
            <BoltIcon className='h-7 w-7' />
            <h2 className='text-lg'>Capabilities</h2>
          </div>
          <div className='space-y-2'>
            <p className='infoText'>Change the CHATGPT Model to use</p>
            <p className='infoText'>
              Messages are stored in Firebase's FireStore
            </p>
            <p className='infoText'>
              Hot toast notifications when CHATGPT is thinking
            </p>
          </div>
        </div>

        <div>
          <div className='flex flex-row md:flex-col items-center justify-center mb-5 gap-3'>
            <ExclamationTriangleIcon className='h-7 w-7' />
            <h2 className='text-lg'>Limitations</h2>
          </div>
          <div className='space-y-2'>
            <p className='infoText'>
              May occasionally generate incorrect information
            </p>
            <p className='infoText'>
              May occasionally produce harmful instructions or biased content
            </p>
            <p className='infoText'>
              Limited knowledge of world and events after 2021
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatPage() {
  const { isMobile } = useViewport();

  if (isMobile) {
    return (
      <div className='chat-container'>
        <SideBar />
        <PageContent />
        <ChatInput />
      </div>
    );
  }

  return (
    <div className='chat-container'>
      <SideBar />
      <div className='chat-content'>
        <PageContent />
        <ChatInput />
      </div>
    </div>
  );
}

export default ChatPage;
