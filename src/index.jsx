import ResetStyle from './style/ResetStyle.js'
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ResetStyle/>
    <App />
  </React.StrictMode>
);

