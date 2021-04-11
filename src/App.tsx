import React from 'react';
import './App.css';
import Axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SampleView } from 'src/views/Sample/SampleView';
import { About } from 'src/views/About/About';
import { Login } from 'src/views/Login/Login';
import { Provider } from 'src/store/Provider';
import { ShopAccountRegisterView } from './views/ShopAccountRegister/ShopAccountRegisterView';
import { ShopInfoRegisterView } from './views/ShopInfoRegister/ShopInfoRegisterView';

Axios.defaults.baseURL = 'http://localhost:4000/api/';

const App: React.FC = () => {
  return (
    <>
      <Provider>
        <Router>
          <Route exact path="/" component={SampleView} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/shopAccountRegister" component={ShopAccountRegisterView} />
          <Route path="/shopInfoRegister" component={ShopInfoRegisterView} />
        </Router>
      </Provider>
    </>
  );
};

export default App;
