import styles from './ShopInfoRegisterView.css';
import React from 'react';

export const ShopInfoRegisterView: React.FC = () => {
  return (
    <>
      <h3>新規店舗登録②</h3>
      <form>
        <input className={styles.todoTitleInput} placeholder="店舗名" />
        <select name="ジャンル">
          <option value="選択肢1">選択肢1</option>
          <option value="選択肢2">選択肢2</option>
          <option value="選択肢3">選択肢3</option>
        </select>
        <select name="開店時間">
          <option value="選択肢1">選択肢1</option>
          <option value="選択肢2">選択肢2</option>
          <option value="選択肢3">選択肢3</option>
        </select>
        <select name="閉店時間">
          <option value="選択肢1">選択肢1</option>
          <option value="選択肢2">選択肢2</option>
          <option value="選択肢3">選択肢3</option>
        </select>
        <input className={styles.todoTitleInput} placeholder="住所" />
        <select name="最寄り駅">
          <option value="選択肢1">選択肢1</option>
          <option value="選択肢2">選択肢2</option>
          <option value="選択肢3">選択肢3</option>
        </select>
        <input className={styles.todoTitleInput} placeholder="tel" />
        <div>
          <button className={styles.todoAddButton}>登録</button>
        </div>
      </form>
    </>
  );
};
