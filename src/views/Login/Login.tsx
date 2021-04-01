import React, { useState, useContext } from 'react';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';
import { LoginShopAccountStateContext } from 'src/store/contexts/LoginShopAccountloginShopAccountState';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ShopAccount } from '../../model/ShopAccount';

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
    console.info(response.data);
    const id = response.data;
    const newShopAccount = Object.assign({}, shopAccount);
    newShopAccount.id = id;
    newShopAccount.email = email;
    newShopAccount.pass = pass;
    setShopAccount(newShopAccount);
    setLoginShopAccountState(true);
    console.info(loginShopAccountState);
  };

  const checkLogin = () => {
    console.info('loginShopAccountState');
    // if (loginShopAccountState === false) {
    //   return <p>ログインしろ!!!</p>;
    // }
    // return <p>ログアウトしろ!!!</p>;
  };

  return (
    <>
      <h1>Login Page!!</h1>
      <input type="email" value={email} placeholder="メールアドレス" onChange={changeEmail} />
      <input type="password" value={pass} placeholder="パスワード" onChange={changePass} />
      <p>
        {shopAccount.id} : {shopAccount.email} : {shopAccount.pass}
      </p>
      <p>{checkLogin}</p>
      <button onClick={loginAccount}>Login</button>
      <Link to="/">Home</Link>
    </>
  );
};
