import Select from 'react-select';
import { useModelContext } from './ModelProvider';

function ModelSelection() {
  const { model, models, isLoading, setModel } = useModelContext();
  return (
    <div className='mt-2'>
      <Select
        isLoading={isLoading}
        menuPosition='fixed'
        defaultValue={model}
        options={models}
        value={model}
        classNames={{
          control: () => 'bg-[#434654] border-[#434654]',
        }}
        onChange={(e) => setModel(e)}
      />
    </div>
  );
}

export default ModelSelection;
