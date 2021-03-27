/* eslint-disable no-console */
import styles from './ShopInfoRegisterView.css';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';
import { ShopInfoContext } from 'src/store/contexts/ShopInfoContext';
import Axios, { AxiosResponse } from 'axios';
import { StationMaster } from 'src/model/Master/StationMaster';
import { TimeMaster } from 'src/model/Master/TimeMaster';
import { ShopAccount } from 'src/model/ShopAccount';
import { ShopInfo } from 'src/model/ShopInfo';

type Shop = {
  shopAccount: ShopAccount;
  shopInfo: ShopInfo;
};

export const ShopInfoRegisterView: React.FC = () => {
  const { shopAccount } = useContext(ShopAccountContext);
  const { shopInfo, setShopInfo } = useContext(ShopInfoContext);

  //要修正
  //べた書きデータをマスターからとってきたものに修正
  const initStationMasters: StationMaster[] = [
    {
      id: 0,
      prefecture: '東京都',
      area: '新宿・代々木・大久保',
      station: '新宿',
    },
    {
      id: 1,
      prefecture: '東京都',
      area: '新宿・代々木・大久保',
      station: '代々木',
    },
    {
      id: 2,
      prefecture: '東京都',
      area: '上野・浅草・日暮里',
      station: '上野',
    },
    {
      id: 3,
      prefecture: '東京都',
      area: '上野・浅草・日暮里',
      station: '浅草',
    },
    {
      id: 4,
      prefecture: '東京都',
      area: '秋葉原・神田・水道橋',
      station: '秋葉原',
    },
    {
      id: 5,
      prefecture: '東京都',
      area: '秋葉原・神田・水道橋',
      station: '神田',
    },
    {
      id: 6,
      prefecture: '北海道',
      area: '札幌市',
      station: '札幌',
    },
  ];
  //要修正
  //べた書きデータをマスターからとってきたものに修正
  const initTimeMasters: TimeMaster[] = [
    {
      id: 0,
      time: new Date(),
    },
    {
      id: 1,
      time: new Date(),
    },
    {
      id: 2,
      time: new Date(),
    },
  ];

  //都道府県とエリアと駅名のマスターを格納しておくステートを定義
  const [stationMasters, setStationMasters] = useState(initStationMasters);
  const [timeMasters, setTimeMasters] = useState(initTimeMasters);

  //後ほどマスターから取得する
  // useEffect(() => {
  //   (async () => {
  //     const stations = await Axios.get<StationMaster[]>('stations');
  //     setStationMaster(stations.data);
  //     const times = await Axios.get<TimeMaster[]>('times');
  //     setTimeMaster(times.data);
  //   })();
  // }, [setStationMaster, setTimeMaster]);

  //都道府県名の重複を含まないMasterを作成し、それに対しmap関数を用いて、都道府県名の一覧を作る
  const prefectures = stationMasters
    .filter((element, index, self) => self.findIndex((e) => e.prefecture === element.prefecture) === index)
    .map((stationMaster) => {
      return stationMaster.prefecture;
    });

  console.log(prefectures);

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

  const [areas, setAreas] = useState(['']);
  const changeShopPrefecture = (e: ChangeEvent<HTMLSelectElement>) => {
    //選ばれた都道府県を取得
    const selectedPrefecture = e.target.value;
    //選ばれた都道府県を条件にエリアを絞る
    //※undefined型を排除できない！
    const findAreas = stationMasters.map((stationMaster) => {
      if (stationMaster.prefecture == selectedPrefecture) {
        return stationMaster.area;
      }
    });
    console.log(findAreas);
    //絞った情報をエリアのステートに代入し、更新する
    // setAreas(findAreas);
  };

  const [stations, setStations] = useState(['']);
  const changeShopArea = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedArea = e.target.value;
    //選ばれたエリアを条件に駅名を絞る
    const findStations = stationMasters.map((stationMaster) => {
      if (stationMaster.prefecture == selectedArea) {
        return stationMaster.area;
      }
    });
    //絞った情報を駅名のステートに代入し、更新する
  };

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
    const shop: Shop = {
      shopAccount: shopAccount,
      shopInfo: shopInfo,
    };
    await Axios.post<Shop, AxiosResponse<string>>('shop', shop);
  };

  return (
    <>
      <h3>新規店舗登録②</h3>

      <dl>
        <dt>店舗名</dt>
        <dd>
          <input className={styles.todoTitleInput} placeholder="店舗名" onChange={changeShopName} />
        </dd>
      </dl>

      <dl>
        <dt>開店時間</dt>
        <dd>
          <select name="開店時間" onChange={changeShopOpen}>
            {timeMasters.map((time) => {
              return (
                <option key={time.id} value={time.time.toString()}>
                  {time.time.toString()}
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
            {timeMasters.map((time) => {
              return (
                <option key={time.id} value={time.time.toString()}>
                  {time.time.toString()}
                </option>
              );
            })}
          </select>
        </dd>
      </dl>

      <dl>
        <dt>都道府県</dt>
        <dd>
          <select name="都道府県" onChange={changeShopPrefecture}>
            {prefectures.map((prefecture) => {
              return (
                <option key={prefecture} value={prefecture}>
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
          <select name="エリア" onChange={changeShopArea}>
            {areas.map((area) => {
              return (
                <option key={area} value={area}>
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
            {stations.map((station) => {
              return (
                <option key={station} value={station}>
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
          <input type="address" className={styles.todoTitleInput} placeholder="住所" onChange={changeShopAddress} />
        </dd>
      </dl>

      <dl>
        <dt>電話番号</dt>
        <dd>
          <input type="tel" className={styles.todoTitleInput} placeholder="電話番号" onChange={changeShopTel} />
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
