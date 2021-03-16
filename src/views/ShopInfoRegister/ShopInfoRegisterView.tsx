import styles from './ShopInfoRegisterView.css';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { TiffinContext } from 'src/context/TiffinContext';
import Axios from 'axios';
import { StationMaster } from 'src/model/StationMaster';

export const ShopInfoRegisterView: React.FC = () => {
  const { shopInfo, setShopInfo } = useContext(TiffinContext);
  //初期化
  const initStationMaster: StationMaster = {
    prefectures: [],
    areas: [],
    stations: [],
  };
  //都道府県、エリア、駅名のマスターを格納しておくステートを定義
  const [stationMaster, setStationMaster] = useState(initStationMaster);
  //まずは都道府県のみとってくる
  useEffect(() => {
    (async () => {
      const response = await Axios.get<StationMaster>('stations');
      setStationMaster(response.data);
    })();
  }, [setStationMaster]);
  const changeShopName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.name = e.target.value;
    setShopInfo(newShopInfo);
  };

  const changeShopOpen = (e: ChangeEvent<HTMLSelectElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.opentime = e.target.value;
    setShopInfo(newShopInfo);
  };

  const changeShopClose = (e: ChangeEvent<HTMLSelectElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.closetime = e.target.value;
    setShopInfo(newShopInfo);
  };

  const changeShopPrefecture = (e: ChangeEvent<HTMLSelectElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.prefecture = e.target.value;
    setShopInfo(newShopInfo);
    //ここで再度データベースに接続し、エリアを取得
  };

  const changeShopArea = (e: ChangeEvent<HTMLSelectElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.area = e.target.value;
    setShopInfo(newShopInfo);
    //ここで再度データベースに接続し、駅名を取得
  };

  const changeShopStation = (e: ChangeEvent<HTMLSelectElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.station = e.target.value;
    setShopInfo(newShopInfo);
  };

  return (
    <>
      <h3>新規店舗登録②</h3>

      <div className={styles.todoForm}>
        <div>店舗名</div>
        <input
          className={styles.todoTitleInput}
          placeholder="店舗名"
          onChange={changeShopName}
        />
      </div>

      <div>
        <div>開店時間</div>
        <select name="開店時間" onChange={changeShopOpen}>
          {/* map関数でopenTime一覧を表示 */}
          <option value="選択肢1">選択肢1</option>
          <option value="選択肢2">選択肢2</option>
          <option value="選択肢3">選択肢3</option>
        </select>
      </div>

      <div>
        <div>閉店時間</div>
        <select name="閉店時間" onChange={changeShopClose}>
          {/* map関数でcloseTime一覧を表示 */}
          <option value="選択肢1">選択肢1</option>
          <option value="選択肢2">選択肢2</option>
          <option value="選択肢3">選択肢3</option>
        </select>
      </div>

      <div>
        <div>都道府県</div>
        <select name="都道府県" onChange={changeShopPrefecture}>
          <option value="選択肢1">選択肢1</option>
          <option value="選択肢2">選択肢2</option>
          <option value="選択肢3">選択肢3</option>
        </select>
      </div>

      <div>
        <div>エリア</div>
        <select name="エリア" onChange={changeShopArea}>
          <option value="選択肢1">選択肢1</option>
          <option value="選択肢2">選択肢2</option>
          <option value="選択肢3">選択肢3</option>
        </select>
      </div>

      <div>
        <div>最寄り駅</div>
        <select name="最寄り駅" onChange={changeShopStation}>
          <option value="選択肢1">選択肢1</option>
          <option value="選択肢2">選択肢2</option>
          <option value="選択肢3">選択肢3</option>
        </select>
      </div>

      <div>
        <div>住所</div>
        <input className={styles.todoTitleInput} placeholder="住所" />
      </div>

      <div>
        <div>電話番号</div>
        <input className={styles.todoTitleInput} placeholder="tel" />
      </div>

      <div>
        <button className={styles.todoAddButton}>登録</button>
      </div>
    </>
  );
};
