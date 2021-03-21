/* eslint-disable no-console */
import styles from './ShopInfoRegisterView.css';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { TiffinContext } from 'src/context/TiffinContext';
import Axios, { AxiosResponse } from 'axios';
import { StationMaster } from 'src/model/StationMaster';
import { TimeMaster } from 'src/model/TimeMaster';
import { ShopAccount } from 'src/model/ShopAccount';
import { ShopInfo } from 'src/model/ShopInfo';

export const ShopInfoRegisterView: React.FC = () => {
  const { shopAccount } = useContext(TiffinContext);
  const { shopInfo, setShopInfo } = useContext(TiffinContext);
  //初期化
  const initStationMaster: StationMaster = {
    prefectures: ['選択肢1', '選択肢2', '選択肢3'],
    areas: ['選択肢A', '選択肢B', '選択肢C'],
    stations: ['選択肢α', '選択肢β', '選択肢γ'],
  };
  const initTimeMaster: TimeMaster = {
    open: ['11時00分', '11時30分', '12時00分'],
    close: ['13時00分', '13時30分', '14時00分'],
  };

  //都道府県、エリア、駅名のマスターを格納しておくステートを定義
  const [stationMaster, setStationMaster] = useState(initStationMaster);
  const [timeMaster, setTimeMaster] = useState(initTimeMaster);

  useEffect(() => {
    (async () => {
      const response = await Axios.get<StationMaster>('stations');
      setStationMaster(response.data);
    })();
  }, [setStationMaster]);

  useEffect(() => {
    (async () => {
      const response = await Axios.get<TimeMaster>('times');
      setTimeMaster(response.data);
    })();
  }, [setTimeMaster]);

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

  // const changeShopPrefecture = (e: ChangeEvent<HTMLSelectElement>) => {
  //   //ここで再度データベースに接続し、エリアを取得
  // };

  // const changeShopArea = (e: ChangeEvent<HTMLSelectElement>) => {
  //   //ここで再度データベースに接続し、駅名を取得
  // };

  const changeShopStation = (e: ChangeEvent<HTMLSelectElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.station = e.target.value;
    setShopInfo(newShopInfo);
  };

  const changeShopAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.address = e.target.value;
    setShopInfo(newShopInfo);
  };

  const changeShopTel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.tel = e.target.value;
    setShopInfo(newShopInfo);
  };

  const clickRegister = async () => {
    // バックエンドと連携し、登録する
    // アカウントも一緒に登録するのを忘れない
    const test = {
      shopAccount: shopAccount,
      shopInfo: shopInfo,
    };
    console.log(test);
    await Axios.post<any, AxiosResponse<string>>('shop', test);
  };

  return (
    <>
      <h3>新規店舗登録②</h3>

      <dl>
        <dt>店舗名</dt>
        <dd>
          <input
            className={styles.todoTitleInput}
            placeholder="店舗名"
            onChange={changeShopName}
          />
        </dd>
      </dl>

      <dl>
        <dt>開店時間</dt>
        <dd>
          <select name="開店時間" onChange={changeShopOpen}>
            {timeMaster.open.map((time) => {
              return (
                <option key="1" value={time}>
                  {time}
                </option>
              );
            })}
          </select>
        </dd>
      </dl>

      <dl>
        <dt>閉店時間</dt>
        <dd>
          <select name="閉店時間" onChange={changeShopClose}>
            {timeMaster.close.map((time) => {
              return (
                <option key="1" value={time}>
                  {time}
                </option>
              );
            })}
          </select>
        </dd>
      </dl>

      <dl>
        <dt>都道府県</dt>
        <dd>
          <select
            name="都道府県"
            // onChange={changeShopPrefecture}
          >
            {stationMaster.prefectures.map((prefecture) => {
              return (
                <option key="1" value={prefecture}>
                  {prefecture}
                </option>
              );
            })}
          </select>
        </dd>
      </dl>

      <dl>
        <dt>エリア</dt>
        <dd>
          <select
            name="エリア"
            // onChange={changeShopArea}
          >
            {stationMaster.areas.map((area) => {
              return (
                <option key="1" value={area}>
                  {area}
                </option>
              );
            })}
          </select>
        </dd>
      </dl>

      <dl>
        <dt>最寄り駅</dt>
        <dd>
          <select name="最寄り駅" onChange={changeShopStation}>
            {stationMaster.stations.map((station) => {
              return (
                <option key="1" value={station}>
                  {station}
                </option>
              );
            })}
          </select>
        </dd>
      </dl>

      <dl>
        <dt>住所</dt>
        <dd>
          <input
            type="address"
            className={styles.todoTitleInput}
            placeholder="住所"
            onChange={changeShopAddress}
          />
        </dd>
      </dl>

      <dl>
        <dt>電話番号</dt>
        <dd>
          <input
            type="tel"
            className={styles.todoTitleInput}
            placeholder="電話番号"
            onChange={changeShopTel}
          />
        </dd>
      </dl>

      <div>
        <button className={styles.todoAddButton} onClick={clickRegister}>
          登録
        </button>
      </div>
    </>
  );
};
