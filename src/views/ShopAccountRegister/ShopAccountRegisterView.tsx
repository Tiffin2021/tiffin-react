import styles from './ShopAccountRegisterView.css';
import React, { useContext, useState } from 'react';
import { TiffinContext } from 'src/context/TiffinContext';

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
  };

  const changePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShopAccount = Object.assign({}, shopAccount);
    newShopAccount.pass = e.target.value;
    setShopAccount(newShopAccount);
    // showButton();
  };

  const passCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    secondPass = e.target.value;
    showButton();
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
          value={shopAccount.pass}
        />
        <input
          className={styles.todoTitleInput}
          placeholder="パスワードの確認"
          onChange={passCheck}
        />
      </div>
      <button style={show}>
        <a href="/ShopInfoRegister">次へ</a>
      </button>
    </>
  );
};
