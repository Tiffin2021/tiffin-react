import React, { useEffect, useContext } from 'react';
import './ShopAccountEdit.css';
import Axios from 'axios';
import { ShopInfo } from 'src/model/ShopInfo';
import { TiffinContext } from 'src/context/TiffinContext';
import { Link } from 'react-router-dom';

export const ShopAccountEdit: React.FC = () => {
  const { shopInfo, setShopInfo } = useContext(TiffinContext);

  useEffect(() => {
    (async () => {
      const response = await Axios.get<ShopInfo[]>('shop_info');
      setShopInfo(response.data[0]);
    })();
  }, [setShopInfo]);

  return (
    <>
      <h1>店舗情報の編集</h1>
      <form action="post">
        <input type="text" value={shopInfo.address} />
      </form>

      <p>店舗ID : {shopInfo.id}</p>
      <p>店舗アカウントID: {shopInfo.shop_accounts_id}</p>
      <p>店舗名 : {shopInfo.name}</p>
      <p>住所 : {shopInfo.address}</p>
      <p>最寄駅 : {shopInfo.station}</p>
      <p>TEL : {shopInfo.tel}</p>
      <p>
        営業時間 : {shopInfo.opentime}〜{shopInfo.closetime}
      </p>
      <Link to="/">更新</Link>
    </>
  );
};
