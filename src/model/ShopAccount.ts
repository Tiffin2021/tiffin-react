export type ShopAccount = {
  id: number;
  email: string;
  pass: string;
};

/** 店舗アカウントの初期値 */
export const initialShopAccount: ShopAccount = {
  id: 0,
  email: '',
  pass: '',
};
