import React, { useState } from 'react';
import style from './PhotoUpload.module.css';
import backgroundImage from 'src/pictures/businessBackground.jpg';
import { ShopHeader } from 'src/components/ShopHeader/ShopHeader';

export const PhotoUpload: React.FC = () => {
  const [photoDate, setPhotoDate] = useState('');
  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoDate(e.target.value);
  };

  const photoUpload = async () => {
    console.info(photoDate);
    //history.push(`/`);
  };

  return (
    <>
      <ShopHeader />
      <img src={backgroundImage} className={style.backgroundImage} />
      <div className={style.onImage}>
        <div className={style.backgroundForm}>
          <h2 className={style.pageTitle}>画像アップロード</h2>
          <div className={style.formItem}>
            <input type="file" className={style.formInput} value={photoDate} onChange={changeEmail} />
          </div>
          <div>
            <button className={style.btn} onClick={photoUpload}>
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
