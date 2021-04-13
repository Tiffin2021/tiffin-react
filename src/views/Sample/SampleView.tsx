import React, { useContext } from 'react';
import './SampleView.css';
import { Link } from 'react-router-dom';
import headerImage from 'src/pictures/businessBackground2.jpg';
import { LoginShopAccountStateContext } from 'src/store/contexts/LoginShopAccountloginShopAccountStateContext';

export const SampleView: React.FC = () => {
  const { loginShopAccountState, setLoginShopAccountState } = useContext(LoginShopAccountStateContext);

  const loginViews = () => {
    if (loginShopAccountState == false)
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
    else
      return (
        <>
          <div className="buttonCenter">
            <button>ログアウト</button>
          </div>
        </>
      );
  };

  return (
    <div>
      <img src={headerImage} className="backgroundImage" />
      <div className="onImage">
        <div className="logo">🍴tiffin🍴</div>
        <div className="backgroundForm">
          <h1 className="pageTitle">Home</h1>
          {loginViews()}
        </div>
      </div>
    </div>
  );
};
