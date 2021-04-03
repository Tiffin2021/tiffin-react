import React, { useEffect, useContext } from 'react';
import './ShopAccountEdit.css';
import Axios from 'axios';
import { ShopAccount } from 'src/model/ShopAccount';
import { Link } from 'react-router-dom';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';

export const ShopAccountEdit: React.FC = () => {
  const id = 2;
  const { shopAccount, setShopAccount } = useContext(ShopAccountContext);

  useEffect(() => {
    (async () => {
      const response = await Axios.get<ShopAccount>(`shop_accounts/${id}`);
      setShopAccount(response.data);
    })();
  }, [id, setShopAccount]);

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
    const response = await Axios.delete(`shop_accounts/${id}`);
    if (response.status !== 200) {
      alert('更新に失敗しました');
      return;
    }
  };

  return (
    <>
      <h1>アカウント情報の編集</h1>
      <form>
        <table>
          <tr>
            <td>Email</td>
            <td>
              <input type="text" value={shopAccount.email} onChange={changedEmail} />
            </td>
          </tr>
          <tr>
            <td>パスワード</td>
            <td>
              <input type="text" value={shopAccount.pass} onChange={changedPass} />
            </td>
          </tr>
        </table>
      </form>

      <br />
      <button onClick={updateClick}>更新</button>
      <button onClick={deleteClick}>このアカウントを削除</button>
      <br />
      <br />
      <Link to="/">戻る</Link>
    </>
  );
};
