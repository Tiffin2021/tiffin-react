/* eslint-disable no-console */
import './ShopAccountRegisterView.css';
import React, { useContext, useState } from 'react';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';
import backgroundImage from 'src/pictures/businessBackground.jpg';
import { Link } from 'react-router-dom';

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
      <img src={backgroundImage} className="backgroundImage" />
      <div className="onImage">
        <div className="logo">🍴tiffin🍴</div>
        <div className="backgroundForm">
          <h2 className="pageTitle">新規店舗登録①</h2>
          <div>
            <div className="formItem">
              <div>メールアドレス</div>
              <input type="email" className="formInput" placeholder="メールアドレス" onChange={changeMail} />
            </div>
            <div className="formItem">
              <div>パスワード</div>
              <input type="password" className="formInput" placeholder="パスワード" onChange={changePass} />
            </div>
            <div className="formItem">
              <div>パスワードの確認</div>
              <input type="password" className="formInput" placeholder="パスワードの確認" onChange={passCheck} />
            </div>
          </div>
          <div className="buttonCenter">
            {(() => {
              if (show === true) {
                return (
                  <Link to="/shopInfoRegister">
                    <button>次へ</button>
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
