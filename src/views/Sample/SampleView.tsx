import React, { useContext, useEffect, useState } from 'react';
import './SampleView.css';
import { SampleCounterContext } from 'src/store/contexts/SampleCounterContext';
import { Link } from 'react-router-dom';
import { GenreMaster } from 'src/model/GenreMaster';
import Axios from 'axios';

export const SampleView: React.FC = () => {
  // カウンターコンテキストで定義している、stateとsetState関数を呼び出す。
  // useContextでグローバルに定義している、createContextで作成された
  // (どのコンポーネントでも使える、useStateのセットが手に入るイメージ)
  const { count, setCount } = useContext(SampleCounterContext);

  /** +ボタンが押されたときに カウントを1プラスする */
  const clickedPlusButton = () => setCount(count + 1);

  /** -ボタンが押されたとき カウントを1マイナスする */
  const clickedMinusButton = () => setCount(count - 1);

  const initGenreMasters: GenreMaster[] = [];

  const [genreMasters, setGenreMasters] = useState(initGenreMasters);

  useEffect(() => {
    (async () => {
      const genres = await Axios.get<GenreMaster[]>('genres');
      setGenreMasters(genres.data);
    })();
  }, [setGenreMasters]);

  return (
    <>
      <h1>tiffin</h1>
      <p></p>
      <Link to="/shop_accounts_edit">アカウントの編集</Link>
      <p></p>
      <Link to="/shop_info_edit">店舗の編集</Link>
      <div>
        <div>ジャンルの選択</div>

        <select name="genre_selection">
          {genreMasters.map((genre) => {
            return <option key={genre.id} value={genre.genre}></option>;
          })}
        </select>
      </div>
      <h1>Home</h1>
      <h2>Counter</h2>
      <div>
        <p>{count}</p>
        <button onClick={clickedPlusButton}>+</button>
        <button onClick={clickedMinusButton}>-</button>
      </div>
      <Link to="/about">Aboutに移動しても、カウンターの値が保持されているはず！</Link>
    </>
  );
};
