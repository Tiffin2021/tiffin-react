import React, { useContext } from 'react';
import { ShopAccountContext } from 'src/store/contexts/ShopAccountContext';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  const { shopAccount } = useContext(ShopAccountContext);
  return (
    <>
      <h1>About Page!!</h1>
      <p>
        {shopAccount.id} : {shopAccount.email} : {shopAccount.pass}
      </p>
      <Link to="/">Home</Link>
    </>
  );
};
