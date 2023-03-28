import { DocumentData } from 'firebase/firestore';

type MessageProps = {
  message: DocumentData;
};

function Message({ message }: MessageProps) {
  const isChatGPT = message.user.name === 'ChatGPT';

  return (
    <div
      className={`py-5 dark:text-white border-b border-black/10 dark:border-gray-900/10 ${
        isChatGPT && 'bg-gray-50 dark:bg-[#434654]'
      }`}
    >
      <div className='flex space-x-5 px-10 max-w-2xl mx-auto'>
        <img
          src={message.user.avatar}
          alt={message.user.name}
          className='h-8 w-8'
        />
        <p className='pt-1 text-sm leading-6 text-gray-700 dark:text-white'>
          {message.text}
        </p>
      </div>
    </div>
  );
}

export default Message;
