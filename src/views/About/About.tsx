import React, { useContext } from 'react';
import { TiffinContext } from 'src/context/TiffinContext';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  const { shopAccount } = useContext(TiffinContext);
  return (
    <>
      <h1>About Page!!!!</h1>
      <p>
        {shopAccount.id} : {shopAccount.email} : {shopAccount.pass}
      </p>
      <Link to="/">About</Link>
    </>
  );
};
