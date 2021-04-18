import React, { createContext, useState } from 'react';
import { ShopAccount, initialShopAccount } from 'src/model/ShopAccount';

type ShopAccountContextProps = {
  shopAccount: ShopAccount;
  setShopAccount: React.Dispatch<React.SetStateAction<ShopAccount>>;
};

/** 店舗アカウントのContext */
export const ShopAccountContext = createContext<ShopAccountContextProps>({
  shopAccount: initialShopAccount,
  setShopAccount: () => console.warn('no function'),
});

/** 店舗アカウントContextのProvider */
export const ShopAccountContextProvider: React.FC = ({ children }) => {
  const [shopAccount, setShopAccount] = useState<ShopAccount>(initialShopAccount);
  return (
    <ShopAccountContext.Provider
      value={{
        shopAccount,
        setShopAccount,
      }}
    >
      {children}
    </ShopAccountContext.Provider>
  );
};
