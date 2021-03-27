import React from 'react';
import './App.css';
import Axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SampleView } from 'src/views/Sample/SampleView';
import { TiffinProvider } from 'src/context/TiffinContext';
import { ShopAccountEdit } from 'src/views/ShopAccountEdit/ShopAccountEdit';
import { About } from 'src/views/About/About';
import { Provider } from 'src/store/Provider';

Axios.defaults.baseURL = 'http://localhost:4000/api/';

const App: React.FC = () => {
  return (
    <>
      <Provider>
        <Router>
          <Route exact path="/" component={SampleView} />
          <Route path="/shop_account_edit" component={ShopAccountEdit} />
        </Router>
      </Provider>
    </>
  );
};

export default App;
