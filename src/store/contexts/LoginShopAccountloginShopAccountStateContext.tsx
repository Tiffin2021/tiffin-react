import React, { createContext, useState } from 'react';

type LoginShopAccountStateContextProps = {
  loginShopAccountState: boolean;
  setLoginShopAccountState: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * ログインContextの作成
 */
export const LoginShopAccountStateContext = createContext<LoginShopAccountStateContextProps>({
  loginShopAccountState: false,
  setLoginShopAccountState: () => console.warn('no function'),
});

/** ログインContextのProvider */
export const LoginShopAccountStateContextProvider: React.FC = ({ children }) => {
  const [loginShopAccountState, setLoginShopAccountState] = useState<boolean>(false);
  return (
    <LoginShopAccountStateContext.Provider
      value={{
        loginShopAccountState,
        setLoginShopAccountState,
      }}
    >
      {children}
    </LoginShopAccountStateContext.Provider>
  );
};
