import React, { useState } from 'react';
import { useContext } from 'react';
import style from './PhotoUpload.module.css';
import backgroundImage from 'src/pictures/businessBackground.jpg';
import { Header } from 'src/components/Header/Header';
import { Photo, initPhoto } from 'src/model/Photo';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';
import Axios from 'axios';

export const PhotoUpload: React.FC = () => {
  const [photoImage, setPhotoImage] = useState('');
  const { shopAccount } = useContext(ShopAccountContext);

  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const img: File = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = function () {
      console.info(reader.result);
      if ('string' === typeof reader.result) {
        setPhotoImage(reader.result);
      }
    };
  };

  const submitImage = async () => {
    const photoData: Photo = initPhoto;
    photoData.imgBase64 = photoImage;
    //HTTPリクエスト
    console.info(await Axios.post(`photos`, photoData));
  };

  return (
    <>
      <Header />
      <img src={backgroundImage} className={style.backgroundImage} />
      <div className={style.onImage}>
        <div className={style.backgroundForm}>
          <h2 className={style.pageTitle}>画像アップロード</h2>
          <div className={style.formItem}>
            <input
              type="file"
              className={style.formInput}
              accept="image/*,.png,.jpg,.jpeg,.gif"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => getImage(e)}
            />
          </div>
          <img src={photoImage}></img>
          <div>
            <button className={style.btn} onClick={submitImage}>
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
