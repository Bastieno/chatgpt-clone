import {
  createContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
  useContext,
} from 'react';
import useSWR from 'swr';

type Option = {
  value: string;
  label: string;
};

type ContextValue = {
  model: Option | null;
  models: Option[];
  isLoading: boolean;
  setModel: Dispatch<SetStateAction<Option | null>>;
};

const ModelContext = createContext<ContextValue>({
  model: {
    value: 'text-davinci-003',
    label: 'text-davinci-003',
  },
  models: [],
  isLoading: false,
  setModel: () => {},
});

export const useModelContext = () => useContext(ModelContext);

const fetchModels = async () => {
  const res = await fetch('/api/getEngines')
  const { modelOptions } = await res.json();
  return modelOptions;
};

function ModelProvider({ children }: { children: ReactNode }) {
  const { data: models, isLoading } = useSWR('models', fetchModels);
  const [model, setModel] = useState<Option | null>({
    value: 'text-davinci-003',
    label: 'text-davinci-003',
  });

  return (
    <ModelContext.Provider
      value={{
        model,
        models,
        isLoading,
        setModel,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}

export default ModelProvider;
