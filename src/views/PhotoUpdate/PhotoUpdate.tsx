import React, { useState } from 'react';
import style from './PhotoUpdate.module.css';
import { useHistory } from 'react-router-dom';
import backgroundImage from 'src/pictures/businessBackground.jpg';
import axios from 'axios';
import { Header } from 'src/components/Header/Header';

export const PhotoUpdate: React.FC = () => {
  const [photoDate, setPhotoDate] = useState('');
  const history = useHistory();

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoDate(e.target.value);
  };

  const photoUpdate = async () => {
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
            {/* <button className="buttonCenter buttonTest" onClick={photoUpdate}> */}
            <button className={style.buttonTest} onClick={photoUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
