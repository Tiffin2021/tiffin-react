import React, { useContext } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { LoginShopAccountStateContext } from 'src/store/contexts/LoginShopAccountStateContext';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';
import { initialShopAccount } from 'src/model/ShopAccount';

export const Header: React.FC = () => {
  const { setShopAccount } = useContext(ShopAccountContext);
  const { loginShopAccountState, setLoginShopAccountState } = useContext(LoginShopAccountStateContext);
  const history = useHistory();

  const logoutAccount = () => {
    setShopAccount(initialShopAccount);
    setLoginShopAccountState(false);
  };

  const loginViews = () => {
    if (loginShopAccountState == true) {
      return (
        <>
          <div className="headerButton">
            <Link to="/shop_accounts_edit">
              <button>アカウントの編集</button>
            </Link>
          </div>
          <div className="headerButton">
            <Link to="/shop_info_edit">
              <button>店舗の編集</button>
            </Link>
          </div>
          <div className="headerButton">
            <Link to="/photoListByShop">
              <button>メニュー一覧</button>
            </Link>
          </div>
          <div className="headerButton">
            <button onClick={logoutAccount}>ログアウト</button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="headerButton">
            <Link to="/shopAccountRegister">
              <button>新規登録</button>
            </Link>
          </div>
          <div className="headerButton">
            <Link to="/login">
              <button>ログイン</button>
            </Link>
          </div>
        </>
      );
    }
  };
  return (
    <div className="headerBack">
      <div className="headerLogo" onClick={() => history.push('/')}>
        🍴tiffin🍴
      </div>
      {loginViews()}
    </div>
  );
};
