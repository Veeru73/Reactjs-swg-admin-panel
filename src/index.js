import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'animate.css';
import 'toastr/build/toastr.min.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from "./states/AuthContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </HashRouter>
);

reportWebVitals();
