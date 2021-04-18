import React, { useContext } from 'react';
import './Home.css';
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
          <div className="buttonCenter">
            <Link to="/shop_accounts_edit">
              <button>アカウントの編集</button>
            </Link>
          </div>
          <div className="buttonCenter">
            <Link to="/shop_info_edit">
              <button>店舗の編集</button>
            </Link>
          </div>
          <div className="buttonCenter">
            <Link to="/photoListByShop">
              <button>メニュー一覧</button>
            </Link>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="buttonCenter">
            <Link to="/shopAccountRegister">
              <button>新規登録</button>
            </Link>
          </div>
          <div className="buttonCenter">
            <Link to="/login">
              <button>ログイン</button>
            </Link>
          </div>
        </>
      );
    }
  };
  return (
    <>
      <img src={headerImage} className="backgroundImage" />
      <div className="onImage">
        <Header />
        <div className="backgroundForm">
          <h1 className="pageTitle">Home</h1>
          {homeViews()}
        </div>
      </div>
    </>
  );
};
