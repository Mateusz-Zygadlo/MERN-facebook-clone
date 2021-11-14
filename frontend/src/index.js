import React from 'react';
import ReactDOM from 'react-dom';
import { AllRoutes } from './AllRoutes';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AllRoutes />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();