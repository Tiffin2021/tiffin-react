/* eslint-disable no-console */
import styles from './ShopAccountRegisterView.css';
import React, { useContext, useState } from 'react';
import { TiffinContext } from 'src/context/TiffinContext';
import { Link } from 'react-router-dom';

export const ShopAccountRegisterView: React.FC = () => {
  const { shopAccount, setShopAccount } = useContext(TiffinContext);
  let secondPass = '';
  const [show, setShow] = useState({ display: 'none' });

  const showButton = () => {
    if (shopAccount.pass === secondPass && secondPass != '') {
      const newShow = Object.assign({}, show);
      newShow.display = 'block';
      setShow(newShow);
    } else {
      const newShow = Object.assign({}, show);
      newShow.display = 'none';
      setShow(newShow);
    }
  };

  const changeMail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShopAccount = Object.assign({}, shopAccount);
    newShopAccount.email = e.target.value;
    setShopAccount(newShopAccount);
    console.log(shopAccount.email);
  };

  const changePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShopAccount = Object.assign({}, shopAccount);
    newShopAccount.pass = e.target.value;
    setShopAccount(newShopAccount);
    showButton();
    console.log(shopAccount.pass);
  };

  const passCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    secondPass = e.target.value;
    showButton();
    console.log(shopAccount.pass);
  };
  return (
    <>
      <h3>新規店舗登録①</h3>
      <div>
        <input
          className={styles.todoTitleInput}
          placeholder="メールアドレス"
          onChange={changeMail}
        />
        <input
          className={styles.todoTitleInput}
          placeholder="パスワード"
          onChange={changePass}
        />
        <input
          className={styles.todoTitleInput}
          placeholder="パスワードの確認"
          onChange={passCheck}
        />
      </div>
      <Link to="/shopInfoRegister">
        <button style={show}>次へ</button>
      </Link>
    </>
  );
};
