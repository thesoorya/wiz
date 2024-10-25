import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import { Toaster } from 'react-hot-toast';
import { StoreContext } from './context/Store';
import Dashboard from './pages/Dashboard/Dashboard';

const App = () => {
  const { user, getProfile, loading } = useContext(StoreContext);

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route 
            path='/dashboard' 
            element={user && user.role === 'admin' ? <Dashboard /> : <Navigate to='/login' />} 
          />
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
};

export default App;
