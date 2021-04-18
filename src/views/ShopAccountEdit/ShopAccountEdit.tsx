import React, { useEffect, useContext } from 'react';
import './ShopAccountEdit.css';
import Axios from 'axios';
import { ShopAccount, initialShopAccount } from 'src/model/ShopAccount';
import backgroundImage from 'src/pictures/businessBackground.jpg';
import { Link, useHistory } from 'react-router-dom';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';
import { initialShopInfo, ShopInfoContext } from 'src/store/contexts/ShopInfoContext';

export const ShopAccountEdit: React.FC = () => {
  const id = 2;
  const { shopAccount, setShopAccount } = useContext(ShopAccountContext);
  const { setShopInfo } = useContext(ShopInfoContext);

  useEffect(() => {
    (async () => {
      const response = await Axios.get<ShopAccount>(`shop_accounts/${id}`);
      setShopAccount(response.data);
    })();
  }, [id, setShopAccount]);

  const history = useHistory();

  const changedEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShopAccount = Object.assign({}, shopAccount);
    newShopAccount.email = e.target.value;
    setShopAccount(newShopAccount);
  };

  const changedPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShopAccount = Object.assign({}, shopAccount);
    newShopAccount.pass = e.target.value;
    setShopAccount(newShopAccount);
  };

  const updateClick = async () => {
    const response = await Axios.put(`shop_accounts/${id}`, shopAccount);
    if (response.status !== 200) {
      alert('更新に失敗しました');

      return;
    }
  };

  const deleteClick = async () => {
    await Axios.delete(`shop/${id}`);
    setShopAccount(initialShopAccount);
    setShopInfo(initialShopInfo);
    history.push('/');
  };

  return (
    <>
      <img src={backgroundImage} className="backgroundImage" />
      <div className="onImage">
        <div className="logo">🍴tiffin🍴</div>
        <div className="backgroundForm">
          <h2 className="pageTitle">アカウント情報の編集</h2>
          <div className="formItem">
            <input type="email" className="formInput" value={shopAccount.email} onChange={changedEmail} />
            <input type="password" className="formInput" value={shopAccount.pass} onChange={changedPass} />
          </div>
          <div>
            <button className="buttonCenter" onClick={updateClick}>
              更新
            </button>
            <button className="buttonCenter" onClick={deleteClick}>
              このアカウントの削除
            </button>
          </div>
          <Link to="/">Home</Link>
        </div>
      </div>
    </>
  );
};
