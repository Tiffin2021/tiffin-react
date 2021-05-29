import React, { useContext, useEffect, useState } from 'react';
import style from './PhotoListByShop.module.css';
import Axios from 'axios';
import { Photo, initPhoto } from 'src/model/Photo';
import backgroundImage from 'src/pictures/businessBackground.jpg';
import { ShopHeader } from 'src/components/ShopHeader/ShopHeader';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';
import { useHistory } from 'react-router-dom';

export const PhotoListByShop: React.FC = () => {
  const { shopAccount } = useContext(ShopAccountContext);
  //店舗情報IDを仮置き/店舗アカウントでも検索可能だが一旦仕様を要相談
  const initPhotoList: Photo[] = [initPhoto];
  const [photoList, setPhotoList] = useState(initPhotoList);

  useEffect(() => {
    (async () => {
      const response = await Axios.get<Photo[]>(`photos/shopAccountID/${shopAccount.id}`);
      setPhotoList(response.data);
    })();
  }, [shopAccount.id, setPhotoList]);

  const history = useHistory();

  return (
    <>
      <div>
        <ShopHeader />
        <img src={backgroundImage} className={style.backgroundImage} />
        <div className={style.onImage}>
          <div className={style.backgroundForm}>
            <h1 className={style.pageTitle}>メニュー一覧</h1>
            <ul className={style.photoList}>
              {photoList.map((photo) => {
                return (
                  <li
                    key={photo.id}
                    onClick={() => {
                      return history.push(`/photo/detail/${photo.id}`);
                    }}
                  >
                    <div className={style.photoItem}>
                      <img src={photo.path} />
                      <div>{photo.menu}</div>
                    </div>
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
