import './SampleView.css';
import { Link } from 'react-router-dom';
import headerImage from 'src/pictures/businessBackground2.jpg';
// import React, { useContext } from 'react';
// import { SampleCounterContext } from 'src/store/contexts/SampleCounterContext';

export const SampleView: React.FC = () => {
  return (
    <div>
      <img src={headerImage} className="backgroundImage" />
      <div className="onImage">
        <div className="logo">🍴tiffin🍴</div>
        <div className="backgroundForm">
          <h1 className="pageTitle">Home</h1>
          <div className="buttonCenter">
            <Link to="/shopAccountRegister">
              <button>新規登録</button>
            </Link>
          </div>
        </div>
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
