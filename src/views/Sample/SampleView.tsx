import React, { useContext } from 'react';
import './SampleView.css';
import { Link } from 'react-router-dom';
import headerImage from 'src/pictures/businessBackground2.jpg';
import { LoginShopAccountStateContext } from 'src/store/contexts/LoginShopAccountloginShopAccountStateContext';
import { Header } from 'src/components/Header/Header';

export const SampleView: React.FC = () => {
  return (
    <div>
      <img src={headerImage} className="backgroundImage" />
      <div className="onImage">
        <Header />
        <div className="backgroundForm">
          <h1 className="pageTitle">Home</h1>
        </div>
      </div>
    </div>
  );
};
