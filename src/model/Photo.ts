export type Photo = {
  id: number;
  pass: string;
  genre: string;
  prefecture: string;
  area: string;
  station: string;
  price: number;
  menu: string;
  opentime: number;
  closetime: number;
  shop_info_id: number;
  img?: string;
};
export const initPhoto: Photo = {
  id: 0,
  pass: '',
  genre: '',
  prefecture: '',
  area: '',
  station: '',
  price: 0,
  menu: '',
  opentime: 0,
  closetime: 0,
  shop_info_id: 0,
};
