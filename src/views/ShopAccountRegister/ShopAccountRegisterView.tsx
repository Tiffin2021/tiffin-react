/* eslint-disable no-console */
import styles from './ShopAccountRegisterView.css';
import React, { useContext, useState } from 'react';
import { TiffinContext } from 'src/context/TiffinContext';
import { Link } from 'react-router-dom';

export const ShopAccountRegisterView: React.FC = () => {
  const { shopAccount, setShopAccount } = useContext(TiffinContext);
  let secondPass = '';
  const [show, setShow] = useState(false);

  const showButton = () => {
    if (shopAccount.pass === secondPass && secondPass != '') {
      setShow(true);
    } else {
      setShow(false);
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
    showButton();
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
          type="email"
          className={styles.todoTitleInput}
          placeholder="メールアドレス"
          onChange={changeMail}
        />
        <input
          type="password"
          className={styles.todoTitleInput}
          placeholder="パスワード"
          onChange={changePass}
        />
        <input
          type="password"
          className={styles.todoTitleInput}
          placeholder="パスワードの確認"
          onChange={passCheck}
        />
      </div>
      {/* {(() => {
        if (show === true) {
          return (
            <Link to="/shopInfoRegister">
              <button>次へ</button>
            </Link>
          );
        }
      })()} */}
      {show ? (
        <Link to="/shopInfoRegister">
          <button>次へ</button>
        </Link>
      ) : (
        <></>
      )}
    </>
  );
};
