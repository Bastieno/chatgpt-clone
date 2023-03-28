import { createContext, useState, ReactNode, useContext } from 'react';

type StateChangeArg = {
  isOpen: boolean;
};

const MenuContext = createContext({
  isMenuOpen: false,
  toggleMenu: () => {},
  stateChangeHandler: (state: StateChangeArg) => {},
  closeMenu: () => {},
});

export const useMenuContext = () => useContext(MenuContext);

function MenuProvider({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);
  const closeMenu = () => setIsMenuOpen(false);
  const stateChangeHandler = ({ isOpen }: StateChangeArg) =>
    setIsMenuOpen(isOpen);

  const value = {
    isMenuOpen,
    toggleMenu,
    stateChangeHandler,
    closeMenu,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export default MenuProvider;
