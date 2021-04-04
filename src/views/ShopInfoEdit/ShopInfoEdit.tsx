import React, { useEffect, useContext } from 'react';
import './ShopInfoEdit.css';
import Axios from 'axios';
import { ShopInfo } from 'src/model/ShopInfo';
import { Link } from 'react-router-dom';
import { ShopInfoContext } from 'src/store/contexts/ShopInfoContext';

export const ShopInfoEdit: React.FC = () => {
  // const id = useParams<{ id: string }>().id;
  const id = 2;
  const { shopInfo, setShopInfo } = useContext(ShopInfoContext);

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

  const changedPrefecture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.prefecture = e.target.value;
    setShopInfo(newShopInfo);
  };

  const changedArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.area = e.target.value;
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

  const deleteClick = async () => {
    const response = await Axios.delete(`shop_info/${id}`);
    if (response.status !== 200) {
      alert('更新に失敗しました');
      return;
    }
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
              <input type="text" value={shopInfo.address} onChange={changedAddress} />
            </td>
          </tr>
          <tr>
            <td>都道府県</td>
            <td>
              <input type="text" value={shopInfo.prefecture} onChange={changedPrefecture} />
            </td>
          </tr>
          <tr>
            <td>エリア</td>
            <td>
              <input type="text" value={shopInfo.area} onChange={changedArea} />
            </td>
          </tr>
          <tr>
            <td>最寄駅</td>
            <td>
              <input type="text" value={shopInfo.station} onChange={changedStation} />
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
              <input type="text" value={shopInfo.opentime} onChange={changedOpentime} />
              <input type="text" value={shopInfo.closetime} onChange={changedClosetime} />
            </td>
          </tr>
        </table>
      </form>

      <br />
      <button onClick={updateClick}>更新</button>
      <button onClick={deleteClick}>この店舗を削除</button>
      <br />
      <br />
      <Link to="/">戻る</Link>
    </>
  );
};
