

import './App.scss'
import NavHeader from './components/navigation/NavHeader.js';
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes/AppRoutes';
import _ from "lodash"
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { RotatingLines } from 'react-loader-spinner'
import { UserContext } from './context/UserContext'
function App() {
  const [userChanged, setUserChanged] = useState(false);
  const { user } = useContext(UserContext);
  // useEffect để theo dõi sự thay đổi của user và kích hoạt việc rerender
  useEffect(() => {
    setUserChanged(true);
  }, [user.isLoading]);

  return (
    <Router>
      {user && user.isLoading === true ?
        <div className='loading-container'>
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <div>Loading data...</div>
        </div>

        :
        <>
          <div className='app-header'>
            <NavHeader />
          </div>
          <div className='app-container'>
            <AppRoutes />
          </div>
        </>

      }
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
    </Router>
  );
}

export default App;
