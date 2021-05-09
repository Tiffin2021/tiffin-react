import style from './ShopAccountRegisterView.module.css';
import React, { useContext, useState } from 'react';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';
import backgroundImage from 'src/pictures/businessBackground.jpg';
import { Link } from 'react-router-dom';
import { Header } from 'src/components/Header/Header';

export const ShopAccountRegisterView: React.FC = () => {
  const { shopAccount, setShopAccount } = useContext(ShopAccountContext);
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
    <div>
      <Header />
      <img src={backgroundImage} className={style.backgroundImage} />
      <div className={style.onImage}>
        <div className={style.backgroundForm}>
          <h2 className={style.pageTitle}>新規店舗登録①</h2>
          <div>
            <div className={style.formItem}>
              <div>メールアドレス</div>
              <input type="email" className={style.formInput} placeholder="メールアドレス" onChange={changeMail} />
            </div>
            <div className={style.formItem}>
              <div>パスワード</div>
              <input type="password" className={style.formInput} placeholder="パスワード" onChange={changePass} />
            </div>
            <div className={style.formItem}>
              <div>パスワードの確認</div>
              <input type="password" className={style.formInput} placeholder="パスワードの確認" onChange={passCheck} />
            </div>
          </div>
          <div className={style.btnCenter}>
            {(() => {
              if (show === true) {
                return (
                  <Link to="/shopInfoRegister">
                    <button className={style.btn}>次へ</button>
                  </Link>
                );
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};
