import React, { useEffect, useState } from 'react';
import style from './PhotoRegister.module.css';
import Axios, { AxiosResponse } from 'axios';
import { Photo, initPhoto } from 'src/model/Photo';
import { ShopInfo, initShopInfo } from 'src/model/ShopInfo';
import backgroundImage from 'src/pictures/businessBackground.jpg';
import { Header } from 'src/components/Header/Header';

export const PhotoRegister: React.FC = () => {
  //後からログイン情報のshopAccountIDを取得
  const shopAccountId = 1;
  const [photo, setPhoto] = useState(initPhoto);
  const [image, setImage] = useState<File>();

  useEffect(() => {
    (async () => {
      // const response = await Axios.get<ShopInfo>(`shop_info/${shopAccountId}`);
      // setShopInfo(response.data);
    })();
  }, []);

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoto = Object.assign({}, photo);
    newPhoto.menu = e.target.value;
    setPhoto(newPhoto);
  };

  const changeGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (!e.target.files) return;
    const img: File = e.target.files[0];
    setImage(img);
  };

  const registerClick = async () => {
    const header = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
    };
    const data = new FormData();
    data.append('file', image!);
    const imgUri = 'photos';
    Axios.post(imgUri, data, header)
      .then((res) => {
        console.info('画像のアップロードが完了しました');
      })
      .catch((err) => {
        console.info('画像のアップロードに失敗しました');
      });
    //HTTPリクエスト
    // await Axios.post<Photo, AxiosResponse<string>>('photos', photo);
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
              <input type="text" className={style.formInput} onChange={changeGenre} />
            </div>
            <div className={style.formItem}>
              <div>金額</div>
              <input type="number" className={style.formInput} onChange={changePrice} />
            </div>
            <div className={style.formItem}>
              <div>画像</div>
              <input
                type="file"
                accept="image/*,.png,.jpg,.jpeg,.gif"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => getImage(e)}
              />
            </div>
            <div className={style.buttonCenter}>
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
