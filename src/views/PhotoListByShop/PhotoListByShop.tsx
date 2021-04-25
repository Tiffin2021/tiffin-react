import React, { useEffect, useState } from 'react';
import style from './PhotoListByShop.module.css';
import Axios from 'axios';
import { Photo, initPhoto } from 'src/model/Photo';
import backgroundImage from 'src/pictures/businessBackground.jpg';
import { Header } from 'src/components/Header/Header';

export const PhotoListByShop: React.FC = () => {
  //店舗情報IDを仮置き/店舗アカウントでも検索可能だが一旦仕様を要相談
  const shopInfoID = 1;
  const initPhotoList: Photo[] = [initPhoto];
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
        <Header />
        <img src={backgroundImage} className={style.backgroundImage} />
        <div className={style.onImage}>
          <div className={style.backgroundForm}>
            <h2 className={style.pageTitle}>メニュー一覧</h2>
            <ul className={style.photoList}>
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
