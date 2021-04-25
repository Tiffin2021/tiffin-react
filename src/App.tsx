import React from 'react';
import './App.css';
import Axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from 'src/views/Home/Home';
import { ShopInfoEdit } from 'src/views/ShopInfoEdit/ShopInfoEdit';
import { ShopAccountEdit } from 'src/views/ShopAccountEdit/ShopAccountEdit';
import { Provider } from 'src/store/Provider';
import { About } from './views/About/About';
import { Login } from 'src/views/Login/Login';
import { ShopAccountRegisterView } from './views/ShopAccountRegister/ShopAccountRegisterView';
import { ShopInfoRegisterView } from './views/ShopInfoRegister/ShopInfoRegisterView';
import { PhotoListByShop } from './views/PhotoListByShop/PhotoListByShop';
import { PhotoUpdate } from './views/PhotoUpdate/PhotoUpdate';

Axios.defaults.baseURL = 'http://localhost:4000/api/';

const App: React.FC = () => {
  return (
    <>
      <Provider>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/shop_accounts_edit" component={ShopAccountEdit} />
          <Route path="/shop_info_edit" component={ShopInfoEdit} />
          <Route path="/login" component={Login} />
          <Route path="/shopAccountRegister" component={ShopAccountRegisterView} />
          <Route path="/shopInfoRegister" component={ShopInfoRegisterView} />
          <Route path="/photoListByShop" component={PhotoListByShop} />
          <Route path="/PhotoUpdate" component={PhotoUpdate} />
        </Router>
      </Provider>
    </>
  );
};

export default App;
