import React, { useContext } from 'react';
import style from './ShopHome.module.css';
import { Link } from 'react-router-dom';
import headerImage from 'src/pictures/businessBackground2.jpg';
import { ShopHeader } from 'src/components/ShopHeader/ShopHeader';
import { LoginShopAccountStateContext } from 'src/store/contexts/LoginShopAccountStateContext';

export const Home: React.FC = () => {
  const { loginShopAccountState } = useContext(LoginShopAccountStateContext);

  const homeViews = () => {
    if (loginShopAccountState == true) {
      return (
        <>
          <div className={style.btnCenter}>
            <Link to="/shop_accounts_edit">
              <button className={style.btn}>アカウントの編集</button>
            </Link>
          </div>
          <div className={style.btnCenter}>
            <Link to="/shop_info_edit">
              <button className={style.btn}>店舗の編集</button>
            </Link>
          </div>
          <div className={style.btnCenter}>
            <Link to="/photoListByShop">
              <button className={style.btn}>メニュー一覧</button>
            </Link>
          </div>
          <div className={style.btnCenter}>
            <Link to="/PhotoUpload">
              <button className={style.btn}>画像アップロード</button>
            </Link>
          </div>
          <div className={style.btnCenter}>
            <Link to="/photoRegister">
              <button className={style.btn}>メニューを追加</button>
            </Link>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={style.btnCenter}>
            <Link to="/shopAccountRegister">
              <button className={style.btn}>新規登録</button>
            </Link>
          </div>
          <div className={style.btnCenter}>
            <Link to="/login">
              <button className={style.btn}>ログイン</button>
            </Link>
          </div>
        </>
      );
    }
  };
  return (
    <>
      <ShopHeader />
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
