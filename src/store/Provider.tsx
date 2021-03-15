import React from 'react';
import { ShopAccountContextProvider } from 'src/store/contexts/ShopAccountContext';
import { ShopInfoContextProvider } from 'src/store/contexts/ShopInfoContext';

/**
 * すべてのContextProviderをまとめたラッピングComponent
 */
export const Provider: React.FC = ({ children }) => {
  // 公式によるとネストしていくのが正しいやり方らしい↓
  // https://ja.reactjs.org/docs/context.html#consuming-multiple-contexts
  //
  // Contextが増えるたびにネストしていくのはキモいため、
  // Appコンポーネント側ではネストを意識せずに使用できるようラッピングすることにした
  // (公式が推奨してるのが理解できない...)
  return (
    <ShopAccountContextProvider>
      <ShopInfoContextProvider>{children}</ShopInfoContextProvider>
    </ShopAccountContextProvider>
  );
};
