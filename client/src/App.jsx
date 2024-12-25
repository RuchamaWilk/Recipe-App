import React from 'react';
import { BrowserRouter ,Route,Routes} from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import AppRouters from './routers/AppRouters';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRouters />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
