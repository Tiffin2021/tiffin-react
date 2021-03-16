/* eslint-disable no-console */
import styles from './ShopAccountRegisterView.css';
import React, { useContext } from 'react';
import { TiffinContext } from 'src/context/TiffinContext';

export const ShopAccountRegisterView: React.FC = () => {
  const { shopAccount, setShopAccount } = useContext(TiffinContext);
  let visible = 'visibility:hidden';

  const changeMail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShopAccount = Object.assign({}, shopAccount);
    newShopAccount.email = e.target.value;
    setShopAccount(newShopAccount);
    console.log(shopAccount);
  };

  const changePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShopAccount = Object.assign({}, shopAccount);
    newShopAccount.pass = e.target.value;
    setShopAccount(newShopAccount);
    console.log(shopAccount);
  };

  const changePassCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (shopAccount.pass === e.target.value) {
      visible = 'visible';
    } else {
      visible = 'hidden';
    }
    console.log(shopAccount);
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
          onChange={changePassCheck}
        />
      </div>
      <button style={visible}>
        <a href="/ShopInfoRegister">次へ</a>
      </button>
    </>
  );
};
