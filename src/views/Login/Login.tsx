import React, { useState, useContext } from 'react';
import { TiffinContext } from 'src/context/TiffinContext';
import { Link } from 'react-router-dom';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { shopAccount, setShopAccount } = useContext(TiffinContext);

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const changePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  const chathAccount = () => {
    const newShopAccount = Object.assign({}, shopAccount);
    newShopAccount.email = email;
    newShopAccount.pass = pass;
    // const response = await Axios.get<ShopAccount[]>('shop_accounts');
    //   setShopAccount(response.data[0]);
    setShopAccount(newShopAccount);
  };

  return (
    <>
      <h1>Login Page!!</h1>
      <input
        type="email"
        value={email}
        placeholder="メールアドレス"
        onChange={changeEmail}
      />
      <input
        type="password"
        value={pass}
        placeholder="パスワード"
        onChange={changePass}
      />
      <p>
        {shopAccount.email} : {shopAccount.pass}
      </p>
      <button onClick={chathAccount}>Login</button>
      <Link to="/">Home</Link>
    </>
  );
};
