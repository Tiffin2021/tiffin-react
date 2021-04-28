import React, { useState } from 'react';
import style from './PhotoUpload.module.css';
import backgroundImage from 'src/pictures/businessBackground.jpg';
import { Header } from 'src/components/Header/Header';

export const PhotoUpload: React.FC = () => {
  const [photoDate, setPhotoDate] = useState('');

  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const img: File = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = function () {
      console.info(reader.result);
      if ('string' === typeof reader.result) {
        setPhotoDate(reader.result);
      }
    };
    reader.onerror = function (error) {
      console.info('Error: ', error);
    };
  };

  const submitImage = () => {
    console.info(photoDate);
    // const header = {
    //   headers: {
    //     'Content-Type': 'application/json;charset=UTF-8',
    //     'Access-Control-Allow-Origin': '*',
    //   },
    // };
    // const data = new FormData();
    // data.append('file', photoDate);
    // const imgUri = '任意のURL';
    // axios
    //   .post(imgUri, data, header)
    //   .then((res) => {
    //     //任意の処理
    //   })
    //   .catch((err) => {
    //     //任意の処理
    //   });
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
          <img src={photoDate}></img>
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
