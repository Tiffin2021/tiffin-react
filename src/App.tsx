import React from 'react';
import './App.css';
import Axios from 'axios';
import { SampleView } from 'src/views/Sample/SampleView';

Axios.defaults.baseURL = 'http://localhost:4000/api/';

const App: React.FC = () => {
  return (
    <>
      <SampleView />
    </>
  );
};

export default App;
