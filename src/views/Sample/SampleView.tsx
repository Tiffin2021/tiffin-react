import React, { useContext } from 'react';
import './SampleView.css';
import { SampleCounterContext } from 'src/store/contexts/SampleCounterContext';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';
import { LoginShopAccountStateContext } from 'src/store/contexts/LoginShopAccountloginShopAccountState';
import { Link } from 'react-router-dom';

export const SampleView: React.FC = () => {
  // カウンターコンテキストで定義している、stateとsetState関数を呼び出す。
  // useContextでグローバルに定義している、createContextで作成された
  // (どのコンポーネントでも使える、useStateのセットが手に入るイメージ)
  const { count, setCount } = useContext(SampleCounterContext);
  const { shopAccount } = useContext(ShopAccountContext);
  const { loginShopAccountState } = useContext(LoginShopAccountStateContext);

  /** +ボタンが押されたときに カウントを1プラスする */
  const clickedPlusButton = () => setCount(count + 1);

  /** -ボタンが押されたとき カウントを1マイナスする */
  const clickedMinusButton = () => setCount(count - 1);

  return (
    <>
      <h1>Home</h1>
      <h2>Counter</h2>
      <div>
        <p>{count}</p>
        <p>
          {shopAccount.id} : {shopAccount.email} : {shopAccount.pass}
          {console.info(loginShopAccountState)}
        </p>
        <button onClick={clickedPlusButton}>+</button>
        <button onClick={clickedMinusButton}>-</button>
      </div>
      <Link to="/about">Aboutに移動しても、カウンターの値が保持されているはず！</Link>
      <Link to="/login">Login</Link>
    </>
  );
};
