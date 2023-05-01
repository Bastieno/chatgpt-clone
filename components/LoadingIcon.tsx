import { Oval } from 'react-loader-spinner'

function LoadingIcon({ visible }: { visible: boolean }) {
  return (
    <Oval
      height={28}
      width={28}
      visible={visible}
      ariaLabel='oval-loading'
      color='white'
      secondaryColor='grey'
      strokeWidth={2}
      strokeWidthSecondary={2}
      wrapperStyle={{
        justifyContent: 'center',
        marginTop: '24px',
      }}
    />
  );
}

export default LoadingIcon