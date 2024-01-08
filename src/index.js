import React from 'react';
import ReactDOM from 'react-dom/client'
import CreateGlobalStyle from './styles/globalStyles'
import { ToastContainer } from 'react-toastify';
import Routes from './routes/routes';
import AppProvider from './hooks';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <AppProvider>
      <Routes />
    </AppProvider>
    <ToastContainer autoClose={2000} theme='colored' />
    <CreateGlobalStyle />
  </>
);


