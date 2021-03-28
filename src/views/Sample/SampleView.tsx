import './SampleView.css';
import './SampleView.css';
import { Link } from 'react-router-dom';
import headerImage from 'src/pictures/businessBackground2.jpg';
// import React, { useContext } from 'react';
// import { SampleCounterContext } from 'src/store/contexts/SampleCounterContext';

export const SampleView: React.FC = () => {
  return (
    <div style={{ position: 'relative' }}>
      <header style={{ fontSize: 30, position: 'absolute', top: '2%', left: '0' }}>🍴tiffin🍴</header>
      <h1 style={{ position: 'absolute', top: '20%', left: '46%' }}>Home</h1>
      <img src={headerImage} width="100%" />
      <div>
        <Link to="/shopAccountRegister">
          <button style={{ textAlign: 'center', position: 'absolute', bottom: '50%', left: '32%' }}>新規登録</button>
        </Link>
      </div>
    </div>
  );
  // カウンターコンテキストで定義している、stateとsetState関数を呼び出す。
  // useContextでグローバルに定義している、createContextで作成された
  // (どのコンポーネントでも使える、useStateのセットが手に入るイメージ)
  // const { count, setCount } = useContext(SampleCounterContext);

  // /** +ボタンが押されたときに カウントを1プラスする */
  // const clickedPlusButton = () => setCount(count + 1);

  // /** -ボタンが押されたとき カウントを1マイナスする */
  // const clickedMinusButton = () => setCount(count - 1);
};
