/* eslint-disable no-console */
import './ShopAccountRegisterView.css';
import React, { useContext, useState } from 'react';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';
import backgroundImage from 'src/pictures/businessBackground.jpg';
import { Link } from 'react-router-dom';
import { relative } from 'node:path';

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
    <div style={{ position: 'relative' }}>
      <img src={backgroundImage} width="100%" />
      <div style={{ backgroundColor: 'white' }}>
        <h2 style={{ position: 'absolute', top: '5%', left: '45%' }}>新規店舗登録①</h2>
        <div style={{ position: 'absolute', top: '30%', left: '32%' }}>
          <div style={{ margin: 20 }}>
            <input type="email" className="todoTitleInput" placeholder="メールアドレス" onChange={changeMail} />
          </div>
          <div style={{ margin: 20 }}>
            <input type="password" className="todoTitleInput" placeholder="パスワード" onChange={changePass} />
          </div>
          <div style={{ margin: 20 }}>
            <input type="password" className="todoTitleInput" placeholder="パスワードの確認" onChange={passCheck} />
          </div>
        </div>
        {(() => {
          if (show === true) {
            return (
              <Link to="/shopInfoRegister">
                <button style={{ position: 'absolute', bottom: '30%', left: '33%' }}>次へ</button>
              </Link>
            );
          }
        })()}
      </div>
    </div>
  );
};
