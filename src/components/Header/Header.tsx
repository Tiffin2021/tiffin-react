import React, { useContext } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { LoginShopAccountStateContext } from 'src/store/contexts/LoginShopAccountloginShopAccountStateContext';

export const Header: React.FC = () => {
  const { loginShopAccountState, setLoginShopAccountState } = useContext(LoginShopAccountStateContext);
  const history = useHistory();

  const logoutAccount = () => {
    setLoginShopAccountState(false);
  };

  const loginViews = () => {
    if (loginShopAccountState == true) {
      return (
        <div className="headerButton">
          <button onClick={logoutAccount}>ログアウト</button>
        </div>
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
