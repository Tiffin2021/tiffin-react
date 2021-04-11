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

  //初期化
  const initStationMasters: StationMaster[] = [];
  const initTimeMasters: TimeMaster[] = [];

  //都道府県とエリアと駅名のマスターを格納しておくステートを定義
  const [stationMasters, setStationMasters] = useState(initStationMasters);
  const [openTimeMasters, setOpenTimeMasters] = useState(initTimeMasters);
  const [closeTimeMasters, setCloseTimeMasters] = useState(initTimeMasters);

  //マスターテーブル取得
  useEffect(() => {
    (async () => {
      const stations = await Axios.get<StationMaster[]>('station_master');
      setStationMasters(stations.data);
      const times = await Axios.get<TimeMaster[]>('time_master');
      setOpenTimeMasters(times.data);
    })();
  }, [setStationMasters, setOpenTimeMasters]);

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
    const newCloseTimeMasters = openTimeMasters.filter((timeMaster) => timeMaster.time > parseInt(e.target.value));
    setCloseTimeMasters(newCloseTimeMasters);
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
    //店舗情報の内容を更新
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.prefecture = selectedPrefecture;
    setShopInfo(newShopInfo);
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
    //店舗情報の内容を更新
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.area = selectedArea;
    setShopInfo(newShopInfo);
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
    const shop: Shop = {
      shopAccount: shopAccount,
      shopInfo: shopInfo,
    };
    await Axios.post<Shop, AxiosResponse<string>>('shop', shop);
  };

  return (
    <>
      <div>
        <img src={backgroundImage} className="backgroundImage" />
        <div className="onImage">
          <div className="logo">🍴tiffin🍴</div>
          <div className="backgroundForm">
            <h2 className="pageTitle">新規店舗登録②</h2>
            <div className="formItem">
              <div>店舗名</div>
              <input placeholder="店舗名" className="formInput" onChange={changeShopName} />
            </div>

            <div className="formItem">
              <div>開店時間</div>
              <select name="開店時間" className="formInput" onChange={changeShopOpen}>
                <option key="選択してください" value="選択してください">
                  選択してください
                </option>
                {openTimeMasters.map((time) => {
                  return (
                    <option key={time.id} value={time.time}>
                      {time.time}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="formItem">
              <div>閉店時間</div>
              <select name="閉店時間" className="formInput" onChange={changeShopClose}>
                <option key="選択してください" value="選択してください">
                  選択してください
                </option>
                {closeTimeMasters.map((time) => {
                  return (
                    <option key={time.id} value={time.time.toString()}>
                      {time.time.toString()}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="formItem">
              <div>都道府県</div>
              <select name="都道府県" className="formInput" onChange={changeShopPrefecture}>
                <option key="選択してください" value="選択してください">
                  選択してください
                </option>
                {prefectures.map((prefecture) => {
                  return (
                    <option key={prefecture} value={prefecture}>
                      {prefecture}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="formItem">
              <div>エリア</div>
              <select name="エリア" className="formInput" onChange={changeShopArea}>
                <option key="選択してください" value="選択してください">
                  選択してください
                </option>
                {areas.map((area) => {
                  return (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="formItem">
              <div>最寄り駅</div>
              <select name="最寄り駅" onChange={changeShopStation} className="formInput">
                <option key="選択してください" value="選択してください">
                  選択してください
                </option>
                {stations.map((station) => {
                  return (
                    <option key={station} value={station}>
                      {station}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="formItem">
              <div>住所</div>
              <input type="address" placeholder="住所" className="formInput" onChange={changeShopAddress} />
            </div>

            <div className="formItem">
              <div>電話番号</div>
              <input type="tel" placeholder="電話番号" className="formInput" onChange={changeShopTel} />
            </div>

            <div className="buttonCenter">
              <button onClick={clickRegister}>登録</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
