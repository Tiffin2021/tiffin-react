import React, { useContext } from 'react';
import './SampleView.css';
import { SampleCounterContext } from 'src/store/contexts/SampleCounterContext';
import { Link } from 'react-router-dom';

export const SampleView: React.FC = () => {
  // カウンターコンテキストで定義している、stateとsetState関数を呼び出す。
  // useContextでグローバルに定義している、createContextで作成された
  // (どのコンポーネントでも使える、useStateのセットが手に入るイメージ)
  const { count, setCount } = useContext(SampleCounterContext);

  /** +ボタンが押されたときに カウントを1プラスする */
  const clickedPlusButton = () => setCount(count + 1);

  /** -ボタンが押されたとき カウントを1マイナスする */
  const clickedMinusButton = () => setCount(count - 1);

  return (
    <>
      <h1>tiffin</h1>
      <Link to="/shopAccountRegister">新規登録</Link>
      <h1>Home</h1>
      <h2>Counter</h2>
      <div>
        <p>{count}</p>
        <button onClick={clickedPlusButton}>+</button>
        <button onClick={clickedMinusButton}>-</button>
      </div>
      <Link to="/about">
        Aboutに移動しても、カウンターの値が保持されているはず！
      </Link>
    </>
  );
};
