

import './App.scss'
import Nav from './components/navigation/Nav';
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes/AppRoutes';
import _ from "lodash"
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
function App() {
  return (
    <Router>

      <div className='app-header'>
        <Nav />
      </div>
      <div className='app-container'>
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover// Use equals sign and provide a string value
        />
      </div>
    </Router>
  );
}

export default App;
