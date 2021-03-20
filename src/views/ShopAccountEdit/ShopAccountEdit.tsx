import React, { useEffect, useContext, useState } from 'react';
import './ShopAccountEdit.css';
import Axios, { AxiosResponse } from 'axios';
import { ShopInfo } from 'src/model/ShopInfo';
import { TiffinContext } from 'src/context/TiffinContext';
import { Link, useHistory, useParams } from 'react-router-dom';

export const ShopAccountEdit: React.FC = () => {
  // const id = useParams<{ id: string }>().id;
  const id = 1;
  const { shopInfo, setShopInfo } = useContext(TiffinContext);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      const response = await Axios.get<ShopInfo>(`shop_info/${id}`);
      setShopInfo(response.data);
    })();
  }, [id, setShopInfo]);

  const changedName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.name = e.target.value;
    setShopInfo(newShopInfo);
  };

  const changedAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.address = e.target.value;
    setShopInfo(newShopInfo);
  };

  const changedStation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.station = e.target.value;
    setShopInfo(newShopInfo);
  };

  const changedTel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.tel = e.target.value;
    setShopInfo(newShopInfo);
  };

  const changedOpentime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.opentime = e.target.value;
    setShopInfo(newShopInfo);
  };

  const changedClosetime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShopInfo = Object.assign({}, shopInfo); // HTMLTextAreaElementとは?
    newShopInfo.closetime = e.target.value;
    setShopInfo(newShopInfo);
  };

  const updateClick = async () => {
    const response = await Axios.put<ShopInfo[]>('shop_info');
    if (response.status !== 200) {
      alert('更新に失敗しました');
      // history.push('/');
      return;
    }

    // history.push('/');
  };

  return (
    <>
      <h1>店舗情報の編集</h1>
      <form>
        <input type="text" value={shopInfo.name} onChange={changedName} />
        <br />
        <input type="text" value={shopInfo.address} onChange={changedAddress} />
        <br />
        <input type="text" value={shopInfo.station} onChange={changedStation} />
        <br />
        <input type="text" value={shopInfo.tel} onChange={changedTel} />
        <br />
        <input
          type="text"
          value={shopInfo.opentime}
          onChange={changedOpentime}
        />
        <br />
        <input
          type="text"
          value={shopInfo.closetime}
          onChange={changedClosetime}
        />
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
      <button onClick={updateClick}>更新</button>
      <br />
      <Link to="/">戻る</Link>
    </>
  );
};
