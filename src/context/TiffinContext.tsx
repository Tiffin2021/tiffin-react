import React, { createContext, useState } from 'react';
import { ShopAccount } from 'src/model/ShopAccount';
import { ShopInfo } from 'src/model/ShopInfo';

type TiffinContextProps = {
  shopAccount: ShopAccount;
  setShopAccount: React.Dispatch<React.SetStateAction<ShopAccount>>;

  shopInfo: ShopInfo;
  setShopInfo: React.Dispatch<React.SetStateAction<ShopInfo>>;
};

export const TiffinContext = createContext<TiffinContextProps>({
  shopAccount: {
    id: 0,
    email: '',
    pass: '',
  },
  setShopAccount: () => {
    return console.warn('no function');
  },

  shopInfo: {
    id: 0,
    shop_accounts_id: 0,
    name: '',
    station: '',
    opentime: '',
    closetime: '',
    address: '',
    tel: '',
  },
  setShopInfo: () => {
    return console.warn('no function');
  },
});

export const TiffinProvider: React.FC = ({ children }) => {
  const [shopAccount, setShopAccount] = useState<ShopAccount>({
    id: 0,
    email: '',
    pass: '',
  });
  const [shopInfo, setShopInfo] = useState<ShopInfo>({
    id: 0,
    shop_accounts_id: 0,
    name: '',
    station: '',
    opentime: '',
    closetime: '',
    address: '',
    tel: '',
  });
  return (
    <TiffinContext.Provider
      value={{
        shopAccount,
        setShopAccount,
        shopInfo,
        setShopInfo,
      }}
    >
      {children}
    </TiffinContext.Provider>
  );
};
