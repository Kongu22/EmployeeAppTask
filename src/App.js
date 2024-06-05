import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { EmployeeProvider } from './context/context';
import Header from './components/Header';
import Home from './components/Home';
import EmployeeDetails from './components/EmployeeDetails';
import Favorites from './components/Favorites';
import Statistics from './components/Statistics';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }
  };

  return (
    <Router>
      <EmployeeProvider>
        <div className="site-wrapper">
          <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          <div className="main-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/employee/:id" element={<EmployeeDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </div>
          <Footer darkMode={darkMode} />
        </div>
        <ToastContainer />
      </EmployeeProvider>
    </Router>
  );
};

export default App;
