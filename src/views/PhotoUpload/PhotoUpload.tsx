import React, { useState } from 'react';
import style from './PhotoUpload.module.css';
import backgroundImage from 'src/pictures/businessBackground.jpg';
import { Header } from 'src/components/Header/Header';

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
      <img src={backgroundImage} className="backgroundImage" />
      <div className="onImage">
        <Header />
        <div className="backgroundForm">
          <h2 className="pageTitle">画像アップロード</h2>
          <div className="formItem">
            <input type="file" className="formInput" value={photoDate} onChange={changeEmail} />
          </div>
          <div>
            <button className={style.buttonTest} onClick={photoUpload}>
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
