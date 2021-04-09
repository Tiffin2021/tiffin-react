import React, { createContext, useState } from 'react';
import { ShopInfo } from 'src/model/ShopInfo';

/** 店舗情報ContextのProps */
type ShopInfoContextProps = {
  shopInfo: ShopInfo;
  setShopInfo: React.Dispatch<React.SetStateAction<ShopInfo>>;
};

/** 店舗情報の初期値 */
const initialShopInfo: ShopInfo = {
  id: 0,
  shop_accounts_id: 0,
  name: '',
  address: '',
  prefecture: '',
  area: '',
  station: '',
  tel: '',
  opentime: 0,
  closetime: 0,
};

/** 店舗情報のContext */
export const ShopInfoContext = createContext<ShopInfoContextProps>({
  shopInfo: initialShopInfo,
  setShopInfo: () => console.warn('no function'),
});

/** 店舗情報ContextのProvider */
export const ShopInfoContextProvider: React.FC = ({ children }) => {
  const [shopInfo, setShopInfo] = useState<ShopInfo>(initialShopInfo);
  return (
    <ShopInfoContext.Provider
      value={{
        shopInfo,
        setShopInfo,
      }}
    >
      {children}
    </ShopInfoContext.Provider>
  );
};
