import React, { useContext } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { LoginShopAccountStateContext } from 'src/store/contexts/LoginShopAccountStateContext';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';
import { initialShopAccount } from 'src/model/ShopAccount';
import { render } from '@testing-library/react';

export const Header: React.FC = () => {
  const { setShopAccount } = useContext(ShopAccountContext);
  const { loginShopAccountState, setLoginShopAccountState } = useContext(LoginShopAccountStateContext);
  const history = useHistory();

  const logoutAccount = () => {
    setShopAccount(initialShopAccount);
    setLoginShopAccountState(false);
  };

  return (
    <div className="headerBack">
      <div className="headerLogo" onClick={() => history.push('/')}>
        🍴tiffin🍴
      </div>
      <div className="headerButtonArea">
        {loginShopAccountState && (
          <>
            <div className="headerButton">
              <Link to="/photoListByShop">
                <button>メニュー一覧</button>
              </Link>
            </div>
            <div className="headerButton">
              <button onClick={logoutAccount}>ログアウト</button>
            </div>
          </>
        )}
        {!loginShopAccountState && (
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
        )}
      </div>
    </div>
  );
};
