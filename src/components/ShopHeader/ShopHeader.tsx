import React, { useContext } from 'react';
import style from './ShopHeader.module.css';
import { useHistory } from 'react-router-dom';
import { LoginShopAccountStateContext } from 'src/store/contexts/LoginShopAccountStateContext';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';
import { initialShopAccount } from 'src/model/ShopAccount';

export const ShopHeader: React.FC = () => {
  const { setShopAccount } = useContext(ShopAccountContext);
  const { loginShopAccountState, setLoginShopAccountState } = useContext(LoginShopAccountStateContext);
  const history = useHistory();

  const logoutAccount = () => {
    setShopAccount(initialShopAccount);
    setLoginShopAccountState(false);
    history.push('/shop');
  };

  return (
    <div className={style.headerBack}>
      <div className={style.headerLogo} onClick={() => history.push('/shop')}>
        🍴tiffin🍴
      </div>
      <div className={style.headerButtonArea}>
        <button className={style.headerButton} onClick={() => history.push('/shop')}>
          戻る
        </button>
        {loginShopAccountState && (
          <button className={style.headerButton} onClick={logoutAccount}>
            ログアウト
          </button>
        )}
      </div>
    </div>
  );
};
