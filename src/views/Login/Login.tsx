import React, { useState, useContext } from 'react';
import './Login.css';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';
import backgroundImage from 'src/pictures/businessBackground.jpg';
import { LoginShopAccountStateContext } from 'src/store/contexts/LoginShopAccountloginShopAccountStateContext';
import { ShopAccount } from 'src/model/ShopAccount';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { shopAccount, setShopAccount } = useContext(ShopAccountContext);
  const { loginShopAccountState, setLoginShopAccountState } = useContext(LoginShopAccountStateContext);

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
  };

  const logoutAccount = () => {
    const delShopAccount: ShopAccount = {
      id: 0,
      email: '',
      pass: '',
    };
    setShopAccount(delShopAccount);
    setLoginShopAccountState(false);
  };

  return (
    <>
      <img src={backgroundImage} className="backgroundImage" />
      <div className="onImage">
        <div className="logo">🍴tiffin🍴</div>
        <div className="backgroundForm">
          <h2 className="pageTitle">ログイン</h2>
          <div className="formItem">
            <input
              type="email"
              className="formInput"
              value={email}
              placeholder="メールアドレス"
              onChange={changeEmail}
            />
            <input type="password" className="formInput" value={pass} placeholder="パスワード" onChange={changePass} />
          </div>
          <p>
            {shopAccount.id} : {shopAccount.email} : {shopAccount.pass}
          </p>
          <p>loginShopAccountState : {loginShopAccountState ? 'true' : 'false'}</p>
          <div>
            <button className="buttonCenter" onClick={loginAccount}>
              Login
            </button>
            <button className="buttonCenter" onClick={logoutAccount}>
              Logout
            </button>
          </div>
          <Link to="/">Home</Link>
        </div>
      </div>
    </>
  );
};
