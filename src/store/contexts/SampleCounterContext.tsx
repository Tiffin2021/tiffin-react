import React, { createContext, useState } from 'react';

type SampleCounterContextProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

/**
 * サンプルカウンターのContext
 *
 * グローバルStateのイメージがつかみやすくなればと思って作成したものなので
 * 店舗新規登録画面まで作成できたら消しちゃってくだせぇ。
 */
export const SampleCounterContext = createContext<SampleCounterContextProps>({
  count: 0,
  setCount: () => console.warn('no function'),
});

/** サンプルカウンターContextのProvider */
export const SampleCounterContextProvider: React.FC = ({ children }) => {
  const [count, setCount] = useState<number>(0);
  return (
    <SampleCounterContext.Provider
      value={{
        count,
        setCount,
      }}
    >
      {children}
    </SampleCounterContext.Provider>
  );
};
