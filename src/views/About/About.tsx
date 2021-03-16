import React, { useContext } from 'react';
import { SampleCounterContext } from 'src/store/contexts/SampleCounterContext';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  const { count, setCount } = useContext(SampleCounterContext);

  /** +ボタンが押されたときに カウントを1プラスする */
  const clickedPlusButton = () => setCount(count + 1);

  /** -ボタンが押されたとき カウントを1マイナスする */
  const clickedMinusButton = () => setCount(count - 1);

  return (
    <>
      <h1>About Page!!</h1>
      <h2>Counter</h2>
      <div>
        <p>{count}</p>
        <button onClick={clickedPlusButton}>+</button>
        <button onClick={clickedMinusButton}>-</button>
      </div>
      <Link to="/">Home</Link>
    </>
  );
};
