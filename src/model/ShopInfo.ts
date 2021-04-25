export type ShopInfo = {
  id: number;
  shop_accounts_id: number;
  name: string;
  prefecture: string;
  area: string;
  station: string;
  address: string;
  tel: string;
  opentime: number;
  closetime: number;
};
export const initShopInfo = {
  id: 0,
  shop_accounts_id: 0,
  name: '',
  prefecture: '',
  area: '',
  station: '',
  opentime: 0,
  closetime: 0,
  address: '',
  tel: '',
};
