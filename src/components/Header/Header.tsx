import React, { useContext } from 'react';
import style from './Header.module.css';
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
    <div className={style.headerBack}>
      <div className={style.headerLogo} onClick={() => history.push('/')}>
        🍴tiffin🍴
      </div>
      <div className={style.headerButtonArea}>
        {loginShopAccountState && (
          <>
            <Link to="/photoListByShop">
              <button className={style.headerButton}>メニュー一覧</button>
            </Link>
            <button className={style.headerButton} onClick={logoutAccount}>
              ログアウト
            </button>
          </>
        )}
        {!loginShopAccountState && (
          <>
            <Link to="/shopAccountRegister">
              <button className={style.headerButton}>新規登録</button>
            </Link>
            <Link to="/login">
              <button className={style.headerButton}>ログイン</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
