import React, { useState, useContext } from 'react';
import style from './ShopLogin.module.css';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';
import backgroundImage from 'src/pictures/businessBackground.jpg';
import { LoginShopAccountStateContext } from 'src/store/contexts/LoginShopAccountStateContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { ShopHeader } from 'src/components/ShopHeader/ShopHeader';

export const ShopLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { shopAccount, setShopAccount } = useContext(ShopAccountContext);
  const { loginShopAccountState, setLoginShopAccountState } = useContext(LoginShopAccountStateContext);

  const history = useHistory();

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const changePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  const loginAccount = async () => {
    const response = await axios.get<number>(`shop_accounts_login?email=${email}&pass=${pass}`);
    if (response.status != 200) {
      return console.info(loginShopAccountState);
    }
    const id = response.data;
    const newShopAccount = Object.assign({}, shopAccount);
    newShopAccount.id = id;
    newShopAccount.email = email;
    newShopAccount.pass = pass;
    setShopAccount(newShopAccount);
    setLoginShopAccountState(true);
    history.push('/shop');
  };

  return (
    <>
      <ShopHeader />
      <img src={backgroundImage} className={style.backgroundImage} />
      <div className={style.onImage}>
        <div className={style.backgroundForm}>
          <h1 className={style.pageTitle}>ログイン</h1>
          <div className={style.formItem}>
            <input
              type="email"
              className={style.formInput}
              value={email}
              placeholder="メールアドレス"
              onChange={changeEmail}
            />
          </div>
          <div className={style.formItem}>
            <input
              type="password"
              className={style.formInput}
              value={pass}
              placeholder="パスワード"
              onChange={changePass}
            />
          </div>
          <div className="buttonCenter">
            <button className={style.btn} onClick={loginAccount}>
              ログイン
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
