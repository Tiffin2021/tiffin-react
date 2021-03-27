import React from 'react';
import './App.css';
import Axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SampleView } from 'src/views/Sample/SampleView';
import { ShopAccountEdit } from 'src/views/ShopAccountEdit/ShopAccountEdit';
import { Provider } from 'src/store/Provider';
import { About } from './views/About/About';

Axios.defaults.baseURL = 'http://localhost:4000/api/';

const App: React.FC = () => {
  return (
    <>
      <Provider>
        <Router>
          <Route exact path="/" component={SampleView} />
          <Route path="/about" component={About} />
          <Route path="/shop_account_edit" component={ShopAccountEdit} />
        </Router>
      </Provider>
    </>
  );
};

export default App;
