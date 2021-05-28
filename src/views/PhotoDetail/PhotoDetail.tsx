import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Axios from 'axios';
import { ShopHeader } from 'src/components/ShopHeader/ShopHeader';
import { initPhoto, Photo } from 'src/model/Photo';
import backgroundImage from 'src/pictures/businessBackground.jpg';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';
import style from './PhotoDetail.module.css';
import { useHistory } from 'react-router-dom';

export const PhotoDetail: React.FC = () => {
  const photoId = useParams<{ id: string }>().id;
  const [photo, setPhoto] = useState(initPhoto);

  useEffect(() => {
    (async () => {
      const response = await Axios.get<Photo>(`photos/id/${photoId}`);
      setPhoto(response.data);
    })();
  }, [photoId, setPhoto]);

  const history = useHistory();

  const deleteClick = async () => {
    const response = await Axios.delete(`photos/${photoId}`);
    if (response.status !== 204) {
      alert('削除に失敗しました');
      return;
    }
    history.push('/photoListByShop');
  };

  return (
    <div>
      <ShopHeader />
      <img src={backgroundImage} className={style.backgroundImage} />
      <div className={style.onImage}>
        <div className={style.backgroundForm}>
          <h2 className={style.pageTitle}>メニュー詳細</h2>
          <div className={style.formItem}>
            <div>メニュー名</div>
            <p className={style.formText}>{photo.menu}</p>
          </div>
          <div className={style.formItem}>
            <div>ジャンル</div>
            <p className={style.formText}>{photo.genre}</p>
          </div>
          <div className={style.formItem}>
            <div>金額</div>
            <p className={style.formText}>{photo.price}円</p>
          </div>
          <div className={style.formItem}>
            <div>画像</div>
            <img className={(style.preview, style.formText)} src={photo.path} />
          </div>
          <div className={style.btnCenter}>
            <button className={style.btn} onClick={deleteClick}>
              削除する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
