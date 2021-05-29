import React from 'react';
import Axios from 'axios';
import { HashRouter as Router, Route } from 'react-router-dom';
import { ShopHome } from 'src/views/Shop/ShopHome/ShopHome';
import { ShopInfoEdit } from 'src/views/Shop/ShopInfoEdit/ShopInfoEdit';
import { ShopAccountEdit } from 'src/views/Shop/ShopAccountEdit/ShopAccountEdit';
import { Provider } from 'src/store/Provider';
import { ShopLogin } from 'src/views/Shop/ShopLogin/ShopLogin';
import { ShopAccountRegisterView } from './views/Shop/ShopAccountRegister/ShopAccountRegisterView';
import { ShopInfoRegisterView } from './views/Shop/ShopInfoRegister/ShopInfoRegisterView';
import { PhotoListByShop } from './views/Shop/PhotoListByShop/PhotoListByShop';
import { PhotoRegister } from './views/Shop/PhotoRegister/PhotoRegister';
import { PhotoDetail } from './views/Shop/PhotoDetail/PhotoDetail';

//ここをEC2のURLに変更する
Axios.defaults.baseURL = 'http://localhost:4000/api/';
// Axios.defaults.baseURL = 'http://54.250.180.48:4000/api/';

const App: React.FC = () => {
  return (
    <>
      <Provider>
        <Router>
          <Route exact path="/shop" component={ShopHome} />
          <Route path="/shop_accounts_edit" component={ShopAccountEdit} />
          <Route path="/shop_info_edit" component={ShopInfoEdit} />
          <Route path="/login" component={ShopLogin} />
          <Route path="/shopAccountRegister" component={ShopAccountRegisterView} />
          <Route path="/shopInfoRegister" component={ShopInfoRegisterView} />
          <Route path="/photoListByShop" component={PhotoListByShop} />
          <Route path="/photoRegister" component={PhotoRegister} />
          <Route path="/photo/detail/:id" component={PhotoDetail} />
        </Router>
      </Provider>
    </>
  );
};

export default App;
