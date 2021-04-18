import React, { useEffect, useState } from 'react';
import './PhotoListByShop.css';
import Axios from 'axios';
import { Photo } from 'src/model/Photo';
import backgroundImage from 'src/pictures/businessBackground.jpg';

export const PhotoListByShop: React.FC = () => {
  //店舗情報IDを仮置き/店舗アカウントでも検索可能だが一旦仕様を要相談
  const shopInfoID = 1;
  const initPhotoList: Photo[] = [
    {
      id: 0,
      pass: '',
      genre: '',
      prefecture: '',
      area: '',
      station: '',
      price: 0,
      menu: '',
      opentime: 0,
      closetime: 0,
      shop_info_id: 0,
    },
  ];
  const [photoList, setPhotoList] = useState(initPhotoList);

  useEffect(() => {
    (async () => {
      const response = await Axios.get<Photo[]>(`photos/shopInfoID/${shopInfoID}`);
      setPhotoList(response.data);
    })();
  }, [shopInfoID, setPhotoList]);

  return (
    <>
      <div>
        <img src={backgroundImage} className="backgroundImage" />
        <div className="onImage">
          <div className="logo">🍴tiffin🍴</div>
          <div className="backgroundForm">
            <h2 className="pageTitle">メニュー一覧</h2>
            <ul className="photo-list">
              {photoList.map((photo) => {
                return (
                  <li key={photo.id}>
                    <img src={photo.pass} />
                    <div>{photo.menu}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
