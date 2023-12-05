

import React from 'react';
import {Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './container/auth/login';
import Signup from './container/auth/signup';
import ForgotPassword from './container/auth/forgotPassword'
import ResetPassword from './container/auth/resetPassword';
import CustomNavbar from './components/navbar';
import CustomSidebar from './components/sidebar/sidebar';
import Dashboard from './container/admin/dashboard';
import AllRoutes from './routes';

function App() {
  return (
      <AllRoutes />
  );
}

export default App;
