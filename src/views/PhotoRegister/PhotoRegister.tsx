import React, { useEffect, useState } from 'react';
import style from './PhotoRegister.module.css';
import Axios, { AxiosResponse } from 'axios';
import { Photo, initPhoto } from 'src/model/Photo';
import backgroundImage from 'src/pictures/businessBackground.jpg';
import { Header } from 'src/components/Header/Header';
import { initGenreMaster, GenreMaster } from 'src/model/Master/GenreMaster';
import { useHistory } from 'react-router-dom';

export const PhotoRegister: React.FC = () => {
  //後からログイン情報のshopAccountIDを取得
  const shopAccountId = 1;
  const [photo, setPhoto] = useState(initPhoto);
  const [genreMasters, setGenreMasters] = useState([initGenreMaster]);

  useEffect(() => {
    (async () => {
      const genres = await Axios.get<GenreMaster[]>('genres');
      setGenreMasters(genres.data);
    })();
  }, [setGenreMasters]);

  const history = useHistory();

  // ファイルがJPEG、PNG形式であるかを検証する
  // NOTE: isImageとかで共通化にしなかったのには理由があります。
  // NOTE: 共通化してしまうと、その他の画像の拡張子(gif, svgとか)に対応することになったときに
  // NOTE：この画面だけのために、この関数を利用している全てに影響が出てしまうためです。
  const isJpegOrPng = (file: File): boolean => {
    // ファイル名をすべて小文字にする
    const fileName = file.name.toLowerCase();

    // 拡張子の検証をする

    // JPEGファイルの検証
    if (fileName.match(/\.(jpg)$/i)) {
      return true;
    }
    // JPEGファイルの検証
    if (fileName.match(/\.(jpeg)$/i)) {
      return true;
    }
    // PNGファイルの検証
    if (fileName.match(/\.(png)$/i)) {
      return true;
    }

    // JPEG、PNG以外の拡張子はfalseを返却
    return false;
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoto = Object.assign({}, photo);
    newPhoto.menu = e.target.value;
    setPhoto(newPhoto);
  };

  const changeGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPhoto = Object.assign({}, photo);
    newPhoto.genre = e.target.value;
    setPhoto(newPhoto);
  };

  const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoto = Object.assign({}, photo);
    newPhoto.price = parseInt(e.target.value);
    setPhoto(newPhoto);
  };

  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      // JPEG, PNG以外の拡張子の場合はエラー
      if (!isJpegOrPng(file)) {
        return alert('JPEG, PNG以外の画像形式は使用できません');
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        if (typeof reader.result === 'string') {
          const newPhoto = Object.assign({}, photo);
          newPhoto.img = reader.result;
          setPhoto(newPhoto);
        }
      };
    }
  };

  const registerClick = async () => {
    await Axios.post<Photo, AxiosResponse<string>>(`photos/${shopAccountId}`, photo);
    history.push('/');
  };

  return (
    <>
      <div>
        <Header />
        <img src={backgroundImage} className={style.backgroundImage} />
        <div className={style.onImage}>
          <div className={style.backgroundForm}>
            <h2 className={style.pageTitle}>メニューを追加</h2>
            <div className={style.formItem}>
              <div>メニュー名</div>
              <input type="text" className={style.formInput} onChange={changeName} />
            </div>
            <div className={style.formItem}>
              <div>ジャンル</div>
              <select name="ジャンル" className={style.formInput} onChange={changeGenre}>
                <option key="選択してください" value="選択してください">
                  選択してください
                </option>
                {genreMasters.map((genreMaster) => {
                  return (
                    <option key={genreMaster.id} value={genreMaster.genre}>
                      {genreMaster.genre}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={style.formItem}>
              <div>金額</div>
              <input type="number" className={style.formInput} onChange={changePrice} min="0" />
            </div>
            <div className={style.formItem}>
              <div>画像</div>
              <input
                className={style.formInput}
                type="file"
                accept="image/*,.png,.jpg,.jpeg,.gif"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => getImage(e)}
              />
            </div>
            <div className={style.formItem}>
              <img className={style.preview} src={photo.img} />
            </div>
            <div className={style.btnCenter}>
              <button className={style.btn} onClick={registerClick}>
                送信する
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
