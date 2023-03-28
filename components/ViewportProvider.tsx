import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';

const ViewportContext = createContext({
  width: 0,
  height: 0,
  isMobile: false,
});

const ViewportProvider = ({ children }: { children: ReactNode }) => {
  const initialWidth = typeof window === 'undefined' ? 0 : window.innerWidth;
  const initialHeight = typeof window === 'undefined' ? 0 : window.innerHeight;

  const breakpoint = 768;

  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);

  const isMobile = width <= breakpoint;

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <ViewportContext.Provider value={{ width, height, isMobile }}>
      {children}
    </ViewportContext.Provider>
  );
};

export const useViewport = () => useContext(ViewportContext);

export default ViewportProvider;
