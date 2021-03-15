import React, { useEffect, useContext } from 'react';
import './SampleView.css';
import Axios from 'axios';
import { ShopAccount } from 'src/model/ShopAccount';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';
import { Link } from 'react-router-dom';

export const SampleView: React.FC = () => {
  const { shopAccount, setShopAccount } = useContext(ShopAccountContext);

  useEffect(() => {
    (async () => {
      const response = await Axios.get<ShopAccount[]>('shop_accounts');
      setShopAccount(response.data[0]);
    })();
  }, [setShopAccount]);

  return (
    <>
      <h1>tiffin</h1>
      <p>
        {shopAccount.id} : {shopAccount.email} : {shopAccount.pass}
      </p>
      <Link to="/about">About</Link>
    </>
  );
};
