import React from 'react';
import './App.css';
import Axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SampleView } from 'src/views/Sample/SampleView';
import { About } from 'src/views/About/About';
import { TiffinProvider } from 'src/context/Provider';

Axios.defaults.baseURL = 'http://localhost:4000/api/';

const App: React.FC = () => {
  return (
    <>
      <TiffinProvider>
        <Router>
          <Route exact path="/" component={SampleView} />
          <Route path="/about" component={About} />
        </Router>
      </TiffinProvider>
    </>
  );
};

export default App;
