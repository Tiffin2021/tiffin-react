/* eslint-disable no-console */
import './ShopInfoRegisterView.css';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';
import { ShopInfoContext } from 'src/store/contexts/ShopInfoContext';
import Axios, { AxiosResponse } from 'axios';
import { StationMaster } from 'src/model/Master/StationMaster';
import { TimeMaster } from 'src/model/Master/TimeMaster';
import { ShopAccount } from 'src/model/ShopAccount';
import { ShopInfo } from 'src/model/ShopInfo';
import backgroundImage from 'src/pictures/businessBackground.jpg';

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
      time: 1100,
    },
    {
      id: 1,
      time: 1130,
    },
    {
      id: 2,
      time: 1200,
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

  const changeShopName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.name = e.target.value;
    setShopInfo(newShopInfo);
  };

  const changeShopOpen = (e: ChangeEvent<HTMLSelectElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.opentime = parseInt(e.target.value);
    setShopInfo(newShopInfo);
  };

  const changeShopClose = (e: ChangeEvent<HTMLSelectElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.closetime = parseInt(e.target.value);
    setShopInfo(newShopInfo);
  };

  const [areas, setAreas] = useState(['選択してください']);
  const changeShopPrefecture = (e: ChangeEvent<HTMLSelectElement>) => {
    //選ばれた都道府県を取得
    const selectedPrefecture = e.target.value;
    //選ばれた都道府県を条件にエリアを絞る
    const findAreas = stationMasters
      .filter((stationMaster) => stationMaster.prefecture == selectedPrefecture)
      .filter((element, index, self) => self.findIndex((e) => e.area === element.area) === index)
      .map((stationMaster) => {
        return stationMaster.area;
      });
    //絞った情報をエリアのステートに代入し、更新する
    setAreas(findAreas);
  };

  const [stations, setStations] = useState(['選択してください']);
  const changeShopArea = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedArea = e.target.value;
    //選ばれたエリアを条件に駅名を絞る
    const findStations = stationMasters
      .filter((stationMaster) => stationMaster.area == selectedArea)
      .map((stationMaster) => {
        return stationMaster.station;
      });
    //絞った情報を駅名のステートに代入し、更新する
    setStations(findStations);
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
      <div style={{ position: 'relative' }}>
        <img src={backgroundImage} width="100%" />
        <div style={{ width: '70%' }}>
          <h2 style={{ position: 'absolute', top: '5%', left: '45%' }}>新規店舗登録②</h2>
          <div style={{ position: 'absolute', top: '15%', left: '35%' }}>
            <div>
              <div>店舗名</div>
              <div>
                <input className="todoTitleInput" placeholder="店舗名" onChange={changeShopName} />
              </div>
            </div>

            <div>
              <div>開店時間</div>
              <div>
                <select name="開店時間" onChange={changeShopOpen}>
                  {timeMasters.map((time) => {
                    return (
                      <option key={time.id} value={time.time}>
                        {time.time}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div>
              <div>閉店時間</div>
              <div>
                <select name="閉店時間" onChange={changeShopClose}>
                  {timeMasters.map((time) => {
                    return (
                      <option key={time.id} value={time.time.toString()}>
                        {time.time.toString()}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div>
              <div>都道府県</div>
              <div>
                <select name="都道府県" onChange={changeShopPrefecture}>
                  {prefectures.map((prefecture) => {
                    return (
                      <option key={prefecture} value={prefecture}>
                        {prefecture}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div>
              <div>エリア</div>
              <div>
                <select name="エリア" onChange={changeShopArea}>
                  {areas.map((area) => {
                    return (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div>
              <div>最寄り駅</div>
              <div>
                <select name="最寄り駅" onChange={changeShopStation}>
                  {stations.map((station) => {
                    return (
                      <option key={station} value={station}>
                        {station}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div>
              <div>住所</div>
              <div>
                <input type="address" className="todoTitleInput" placeholder="住所" onChange={changeShopAddress} />
              </div>
            </div>

            <div>
              <div>電話番号</div>
              <div>
                <input type="tel" className="todoTitleInput" placeholder="電話番号" onChange={changeShopTel} />
              </div>
            </div>

            <div>
              <button className="todoAddButton" onClick={clickRegister} style={{ position: 'absolute', marginTop: 80 }}>
                登録
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
