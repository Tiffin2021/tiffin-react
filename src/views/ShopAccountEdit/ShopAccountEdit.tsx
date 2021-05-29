import React, { useEffect, useContext } from 'react';
import style from './ShopAccountEdit.module.css';
import Axios from 'axios';
import { ShopAccount, initialShopAccount } from 'src/model/ShopAccount';
import backgroundImage from 'src/pictures/businessBackground.jpg';
import { useHistory } from 'react-router-dom';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';
import { initialShopInfo, ShopInfoContext } from 'src/store/contexts/ShopInfoContext';
import { LoginShopAccountStateContext } from 'src/store/contexts/LoginShopAccountStateContext';
import { ShopHeader } from 'src/components/ShopHeader/ShopHeader';

export const ShopAccountEdit: React.FC = () => {
  const { shopAccount, setShopAccount } = useContext(ShopAccountContext);
  const { setShopInfo } = useContext(ShopInfoContext);
  const { setLoginShopAccountState } = useContext(LoginShopAccountStateContext);

  const id = shopAccount.id;

  useEffect(() => {
    (async () => {
      const response = await Axios.get<ShopAccount>(`shop_accounts/${id}`);
      setShopAccount(response.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setLoginShopAccountState(false);
    history.push('/shop');
  };

  return (
    <>
      <ShopHeader />
      <img src={backgroundImage} className={style.backgroundImage} />
      <div className={style.onImage}>
        <div className={style.backgroundForm}>
          <h2 className={style.pageTitle}>アカウント情報の編集</h2>
          <div className={style.formItem}>
            <input type="email" className={style.formInput} value={shopAccount.email} onChange={changedEmail} />
          </div>
          <div className={style.formItem}>
            <input type="password" className={style.formInput} value={shopAccount.pass} onChange={changedPass} />
          </div>
          <div className={style.btnCenter}>
            <button className={style.btn} onClick={updateClick}>
              更新
            </button>
          </div>
        </div>
        <div className={style.btnCenter}>
          <button className={style.btnDanger} onClick={deleteClick}>
            このアカウントの削除
          </button>
        </div>
      </div>
    </>
  );
};
