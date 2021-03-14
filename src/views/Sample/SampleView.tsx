import React, { useState, useEffect } from 'react';
import './SampleView.css';
import Axios from 'axios';
import { ShopAccount } from 'src/model/ShopAccount';

export const SampleView: React.FC = () => {
  const [shopAccounts, setShopAccounts] = useState<ShopAccount[]>([]);

  useEffect(() => {
    (async () => {
      const response = await Axios.get<ShopAccount[]>('shop_accounts');
      setShopAccounts(response.data);
    })();
  }, [setShopAccounts]);

  return (
    <>
      <h1>tiffin</h1>
      {shopAccounts.map((shopAccount) => {
        <p key={shopAccount.id}>
          {shopAccount.id} : {shopAccount.email} : {shopAccount.pass}
        </p>;
      })}
    </>
  );
};
