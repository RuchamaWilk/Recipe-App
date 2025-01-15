import React from 'react';
import { BrowserRouter ,Route,Routes} from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import AppRouters from './routers/AppRouters';
import ScrollToTop from './utils/scrollToTop';
import {UserProvider} from './providers/UserProvider'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <UserProvider>
        <Layout>
          <AppRouters />
        </Layout>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
