'use client';

import Chat from '../../../components/Chat';
import ChatInput from '../../../components/ChatInput';
import SideBar from '../../../components/SideBar';
import { useViewport } from '../../../components/ViewportProvider';

type ChatPageprops = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: ChatPageprops) {
  const { isMobile } = useViewport();

  if (isMobile) {
    return (
      <div className='chat-container'>
        <SideBar />
        <div className='h-screen flex flex-col flex-1 overflow-auto'>
          <Chat chatId={id} />
        </div>
        <ChatInput chatId={id} />
      </div>
    );
  }

  return (
    <div className='chat-container'>
      <SideBar />
      <div className='chat-content'>
        <div className='flex flex-col overflow-auto'>
          <Chat chatId={id} />
        </div>
        <ChatInput chatId={id} />
      </div>
    </div>
  );
}

export default ChatPage;
