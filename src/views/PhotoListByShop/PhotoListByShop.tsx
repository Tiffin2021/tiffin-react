import React, { useContext, useEffect, useState } from 'react';
import style from './PhotoListByShop.module.css';
import Axios from 'axios';
import { Photo, initPhoto } from 'src/model/Photo';
import backgroundImage from 'src/pictures/businessBackground.jpg';
import { Header } from 'src/components/Header/Header';
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
        <Header />
        <img src={backgroundImage} className={style.backgroundImage} />
        <div className={style.onImage}>
          <div className={style.backgroundForm}>
            <h2 className={style.pageTitle}>メニュー一覧</h2>
            <ul className={style.photoList}>
              {photoList.map((photo) => {
                return (
                  //   <TodoItem
                  //   key={todo.id}
                  //   todo={todo}
                  //   onClick={() => {
                  //     return history.push(`/edit/${todo.id}`);
                  //   }}
                  // />
                  <li
                    key={photo.id}
                    onClick={() => {
                      return history.push(`/photo/detail/${photo.id}`);
                    }}
                  >
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
