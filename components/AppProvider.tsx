import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type ChatIds = {
    [id: string]: string
  }

type AppContextType = {
  chatIds: ChatIds;
  setChatIds: Dispatch<SetStateAction<ChatIds>>;
  updateChatIds: (payload: ChatIds) => void;
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
  exampleTexts: string[];
};

const AppContext = createContext<AppContextType>({
  chatIds: {},
  setChatIds: () => {},
  updateChatIds: () => {},
  inputText: '',
  setInputText: () => {},
  exampleTexts: []
});

export const useAppContext = () => useContext(AppContext);

function AppProvider({ children }: { children: ReactNode }) {
  const [chatIds, setChatIds] = useState({});
  const updateChatIds = (payload: ChatIds) => setChatIds(prevState => ({ ...prevState, ...payload }));

  const [inputText, setInputText] = useState('');

  const exampleTexts = [
    'Explain quantum computing in simple terms',
    'Got any creative ideas for a 10 year old’s birthday?',
    'How do I make an HTTP request in Javascript?',
  ];

  return (
    <AppContext.Provider
      value={{
        chatIds,
        setChatIds,
        updateChatIds,
        inputText,
        setInputText,
        exampleTexts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
