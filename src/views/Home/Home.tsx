import React, { useContext } from 'react';
import style from './Home.module.css';
import { Link } from 'react-router-dom';
import headerImage from 'src/pictures/businessBackground2.jpg';
import { Header } from 'src/components/Header/Header';
import { LoginShopAccountStateContext } from 'src/store/contexts/LoginShopAccountStateContext';

export const Home: React.FC = () => {
  const { loginShopAccountState } = useContext(LoginShopAccountStateContext);

  const homeViews = () => {
    if (loginShopAccountState == true) {
      return (
        <>
          <div className={style.buttonCenter}>
            <Link to="/shop_accounts_edit">
              <button className={style.homeButton}>アカウントの編集</button>
            </Link>
          </div>
          <div className={style.buttonCenter}>
            <Link to="/shop_info_edit">
              <button className={style.homeButton}>店舗の編集</button>
            </Link>
          </div>
          <div className={style.buttonCenter}>
            <Link to="/photoListByShop">
              <button className={style.homeButton}>メニュー一覧</button>
            </Link>
          </div>
          <div className={style.buttonCenter}>
            <Link to="/PhotoUpdate">
              <button className={style.homeButton}>画像アップロード</button>
            </Link>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={style.buttonCenter}>
            <Link to="/shopAccountRegister">
              <button className={style.homeButton}>新規登録</button>
            </Link>
          </div>
          <div className={style.buttonCenter}>
            <Link to="/login">
              <button className={style.homeButton}>ログイン</button>
            </Link>
          </div>
        </>
      );
    }
  };
  return (
    <>
      <Header />
      <img src={headerImage} className={style.backgroundImage} />
      <div className={style.onImage}>
        <div className={style.backgroundForm}>
          <h1 className={style.pageTitle}>Home</h1>
          {homeViews()}
        </div>
      </div>
    </>
  );
};
