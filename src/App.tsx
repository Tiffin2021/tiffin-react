import React from 'react';
import './App.css';
import axios from 'axios';

const App: React.FC = () => {
  axios.get('http://localhost:4000/api/shop_accounts/');
  return <h1>tiffin</h1>;
};

export default App;
