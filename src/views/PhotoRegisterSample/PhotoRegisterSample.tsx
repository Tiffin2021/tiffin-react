import React, { useEffect, useState } from 'react';
import style from './PhotoRegisterSample.module.css';
import Axios, { AxiosResponse } from 'axios';
import { Photo, initPhoto } from 'src/model/Photo';
import backgroundImage from 'src/pictures/businessBackground.jpg';
import { Header } from 'src/components/Header/Header';

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

export const PhotoRegisterSample: React.FC = () => {
  // 後からログイン情報のshopAccountIDを取得
  const [photo, setPhoto] = useState(initPhoto);
  // Base64形式の文字列を格納するState
  const [base64, setBase64] = useState<string>('');

  // TODO: 店舗詳細ID決め打ちなので、後で修正する
  const shopInfoId = 1;

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

  // ファイルが選択されたときの処理
  const changeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // inputから選択された、複数の画像ファイルを取得する
    const files = e.target.files;

    // 画像が選択されていないor選択された画像が1件以外の場合はエラー
    if (files == null || files.length !== 1) {
      return alert('画像が選択されていません');
    }

    // 選択された画像の1件目を取得
    // NOTE: 複数件の取得は今回仕様として考えないことにする
    const file: File = files[0];

    // JPEG, PNG以外の拡張子の場合はエラー
    if (!isJpegOrPng(file)) {
      return alert('JPEG, PNG以外の画像形式は使用できません');
    }

    // ファイル読み込みクラスをインスタンス化する
    const fileReader = new FileReader();

    // ファイル(blob)をbase64で読み込む
    // NOTE: BlobとBase64についての参考URL → https://devsway.net/2019/08/11/blob%E3%81%A8base64%E3%81%AE%E9%81%95%E3%81%84/
    fileReader.readAsDataURL(file);

    // Base64で画像の読み込みに成功したとき
    fileReader.onload = () => {
      // 読み込み結果が文字列ならBase64形式のはずなので、Stateにセットする
      if (typeof fileReader.result === 'string') {
        setBase64(fileReader.result);
      }
    };
  };

  const registerClick = async () => {
    // TODO: shopInfoIdを1で決め打ちしているが、後にIDはクエリから取得するようにする
    const newPhoto = Object.assign({}, photo);
    newPhoto.shop_info_id = shopInfoId;

    // Base64文字列をセットする
    newPhoto.base64Image = base64;

    // バックエンドにリクエスト
    await Axios.post<Photo, AxiosResponse<number>>('photos', newPhoto);
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
              <input type="file" accept="image/*,.png,.jpg,.jpeg" onChange={changeFileInput} />
            </div>
            {
              // base64が空文字でない(画像が選択されている)なら、画像とアップロードボタンを表示
              base64 !== '' && (
                <>
                  <img src={base64} className={style.previewImage} />
                  <div>
                    <button className={style.uploadButton} onClick={registerClick}>
                      送信する
                    </button>
                  </div>
                </>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};
