import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './layout/header';
import Footer from './layout/footer';
import HomePage from './pages/homePage';
import CategoryPage from './pages/categoryPage';
import Login from './components/logIn';
import RecipePage from './pages/recipe';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:categoryName" element={<CategoryPage />} />
        <Route path="/recipe/:recipeName" element={<RecipePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
