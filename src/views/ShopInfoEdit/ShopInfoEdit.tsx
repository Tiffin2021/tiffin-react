import React, { useEffect, useState, ChangeEvent } from 'react';
import './ShopInfoEdit.css';
import Axios from 'axios';
import { ShopInfo } from 'src/model/ShopInfo';
import backgroundImage from 'src/pictures/businessBackground.jpg';
import { Link } from 'react-router-dom';
import { initialShopInfo } from 'src/store/contexts/ShopInfoContext';
import { TimeMaster } from 'src/model/Master/TimeMaster';
import { StationMaster } from 'src/model/Master/StationMaster';

export const ShopInfoEdit: React.FC = () => {
  const id = 2;
  const [shopInfo, setShopInfo] = useState<ShopInfo>(initialShopInfo);

  const initStationMasters: StationMaster[] = [];
  const initTimeMasters: TimeMaster[] = [];

  const [stationMasters, setStationMasters] = useState(initStationMasters);
  const [openTimeMasters, setOpenTimeMasters] = useState(initTimeMasters);
  const [closeTimeMasters, setCloseTimeMasters] = useState(initTimeMasters);
  const [areas, setAreas] = useState<string[]>([]);
  const [stations, setStations] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const response = await Axios.get<ShopInfo>(`shop_info/${id}`);
      setShopInfo(response.data);

      const stationMasters = await Axios.get<StationMaster[]>('station_master');
      setStationMasters(stationMasters.data);

      //選ばれた都道府県を条件に絞られたエリアをstateにセットする
      const areas = searchAreaByPrefecture(response.data.prefecture, stationMasters.data);
      setAreas(areas);

      //上で絞り込んだエリアの配列1番目を条件に最寄駅をstateにセットする
      const stations = searchStationByArea(areas[0], stationMasters.data);
      setStations(stations);

      const times = await Axios.get<TimeMaster[]>('time_master');
      setOpenTimeMasters(times.data);
      setCloseTimeMasters(times.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prefectures = stationMasters
    .filter((element, index, self) => self.findIndex((e) => e.prefecture === element.prefecture) === index)
    .map((stationMaster) => {
      return stationMaster.prefecture;
    });

  const changeShopPrefecture = (e: ChangeEvent<HTMLSelectElement>) => {
    //選ばれた都道府県を取得
    const selectedPrefecture = e.target.value;

    //選ばれた都道府県を条件に絞られたエリアをstateにセットする
    const areas = searchAreaByPrefecture(selectedPrefecture, stationMasters);
    setAreas(areas);

    //上で絞り込んだエリアの配列1番目を条件に最寄駅をstateにセットする
    const stations = searchStationByArea(areas[0], stationMasters);
    setStations(stations);

    //店舗情報の内容を更新
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.prefecture = selectedPrefecture;
    setShopInfo(newShopInfo);
  };

  const searchAreaByPrefecture = (prefecture: string, stationMasters: StationMaster[]): string[] => {
    //選ばれた都道府県を条件にエリアを絞る
    const findAreas = stationMasters
      .filter((stationMaster) => stationMaster.prefecture === prefecture)
      .filter((element, index, self) => self.findIndex((e) => e.area === element.area) === index)
      .map((stationMaster) => {
        return stationMaster.area;
      });
    //絞った情報をエリアのステートに代入し、更新する
    return findAreas;
  };

  const changeShopArea = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedArea = e.target.value;
    //選ばれたエリアを条件に駅名を絞る
    const findStations = searchStationByArea(selectedArea, stationMasters);
    //絞った情報を駅名のステートに代入し、更新する
    setStations(findStations);
    //店舗情報の内容を更新
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.area = selectedArea;
    setShopInfo(newShopInfo);
  };

  const searchStationByArea = (area: string, stationMasters: StationMaster[]): string[] => {
    //選ばれたエリアを条件に駅名を絞る
    const findStations = stationMasters
      .filter((stationMaster) => stationMaster.area === area)
      .map((stationMaster) => {
        return stationMaster.station;
      });
    return findStations;
  };

  const changeShopStation = (e: ChangeEvent<HTMLSelectElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.station = e.target.value;
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

  const changedTel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShopInfo = Object.assign({}, shopInfo);
    newShopInfo.tel = e.target.value;
    setShopInfo(newShopInfo);
  };

  const updateClick = async () => {
    const response = await Axios.put(`shop_info/${id}`, shopInfo);
    if (response.status !== 200) {
      alert('更新に失敗しました');
      return;
    }
  };

  return (
    <>
      <img src={backgroundImage} className="backgroundImage" />
      <div className="onImage">
        <div className="logo">🍴tiffin🍴</div>
        <div className="backgroundForm">
          <h2 className="pageTitle">店舗情報の編集</h2>
          <div className="formItem">
            <div>店舗名</div>
            <input type="text" className="formInput" value={shopInfo.name} onChange={changedName} />
            <div>住所</div>
            <input type="text" className="formInput" value={shopInfo.address} onChange={changedAddress} />
            <div>都道府県</div>
            <select name="都道府県" value={shopInfo.prefecture} className="formInput" onChange={changeShopPrefecture}>
              {prefectures.map((prefecture) => {
                return (
                  <option key={prefecture} value={prefecture}>
                    {prefecture}
                  </option>
                );
              })}
            </select>
            <div>エリア</div>
            <select name="エリア" value={shopInfo.area} className="formInput" onChange={changeShopArea}>
              {areas.map((area) => {
                return (
                  <option key={area} value={area}>
                    {area}
                  </option>
                );
              })}
            </select>
            <div>最寄駅</div>
            <select name="最寄り駅" value={shopInfo.station} onChange={changeShopStation} className="formInput">
              {stations.map((station) => {
                return (
                  <option key={station} value={station}>
                    {station}
                  </option>
                );
              })}
            </select>
            <div>TEL</div>
            <input type="text" value={shopInfo.tel} onChange={changedTel} className="formInput" />
            <div>開店時間</div>
            <select name="開店時間" value={shopInfo.opentime} onChange={changeShopOpen} className="formInput">
              {openTimeMasters.map((time) => {
                return (
                  <option key={time.id} value={time.time}>
                    {time.time}
                  </option>
                );
              })}
            </select>
            <div>閉店時間</div>
            <select name="閉店時間" value={shopInfo.closetime} onChange={changeShopClose} className="formInput">
              {closeTimeMasters.map((time) => {
                return (
                  <option key={time.id} value={time.time}>
                    {time.time}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="buttonCenter">
            <button className="buttonCenter" onClick={updateClick}>
              更新
            </button>
          </div>
          <Link to="/">Home</Link>
        </div>
      </div>
    </>
  );
};
