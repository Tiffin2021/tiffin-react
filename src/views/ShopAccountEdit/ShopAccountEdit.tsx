import React, { useEffect, useContext } from 'react';
import './ShopAccountEdit.css';
import Axios from 'axios';
import { ShopInfo } from 'src/model/ShopInfo';
import { TiffinContext } from 'src/context/TiffinContext';
import { Link } from 'react-router-dom';

export const ShopAccountEdit: React.FC = () => {
  // const id = useParams<{ id: string }>().id;
  const id = 1;
  const { shopInfo, setShopInfo } = useContext(TiffinContext);

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
    const response = await Axios.put(`shop_info/${id}`, shopInfo);
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
        <table>
          <tr>
            <td>店舗名</td>
            <td>
              <input type="text" value={shopInfo.name} onChange={changedName} />
            </td>
          </tr>
          <tr>
            <td>住所</td>
            <td>
              <input
                type="text"
                value={shopInfo.address}
                onChange={changedAddress}
              />
            </td>
          </tr>
          <tr>
            <td>最寄駅</td>
            <td>
              <input
                type="text"
                value={shopInfo.station}
                onChange={changedStation}
              />
            </td>
          </tr>
          <tr>
            <td>TEL</td>
            <td>
              <input type="text" value={shopInfo.tel} onChange={changedTel} />
            </td>
          </tr>
          <tr>
            <td>営業時間</td>
            <td>
              <input
                type="text"
                value={shopInfo.opentime}
                onChange={changedOpentime}
              />
              <input
                type="text"
                value={shopInfo.closetime}
                onChange={changedClosetime}
              />
            </td>
          </tr>
        </table>
      </form>

      <br />
      <button onClick={updateClick}>更新</button>
      <br />
      <br />
      <Link to="/">戻る</Link>
    </>
  );
};
