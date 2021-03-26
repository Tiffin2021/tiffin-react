import React, { useState, useContext } from 'react';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ShopAccount } from '../../model/ShopAccount';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { shopAccount, setShopAccount } = useContext(ShopAccountContext);

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const changePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  const chathAccount = async () => {
    const response = await axios.get<ShopAccount[]>(`shop_accounts/login?email=${email}&pass=${pass}`);
    console.info(response.status);
    if (response.status != 200) {
      return <p>メールアドレスかパスワードが違います</p>;
    }
    const newShopAccount = Object.assign({}, shopAccount);
    newShopAccount.email = email;
    newShopAccount.pass = pass;
    setShopAccount(newShopAccount);
  };

  return (
    <>
      <h1>Login Page!!</h1>
      <input type="email" value={email} placeholder="メールアドレス" onChange={changeEmail} />
      <input type="password" value={pass} placeholder="パスワード" onChange={changePass} />
      <p>
        {shopAccount.email} : {shopAccount.pass}
      </p>
      <button onClick={chathAccount}>Login</button>
      <Link to="/">Home</Link>
    </>
  );
};
