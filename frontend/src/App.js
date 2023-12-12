import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Toastify from './components/Toastify/Toastify';
import Login from './pages/Auth/Login/login';
import Register from './pages/Auth/Register/register';
import ProtectedRoutes from './protectedRoute';
import Layout from './components/Layout';
import Devices from './components/Devices/devices';
import Users from './components/Users/users';
import Profile from './components/Profile/profile';
import DeviceDetails from './components/Devices/deviceDetails';
import { refreshTokenApi } from './services/api';
import NotFound from './pages/notFound';

function App() {

  useEffect(() => {
    const refresh = JSON.parse(localStorage.getItem("refresh"))
    if (refresh) {
      const timer = setInterval(async () => {
        const access = await refreshTokenApi({ refresh: refresh })
        if (access?.access) {
          localStorage.setItem("authToken", JSON.stringify(access?.access));
        }
      }, 200000)
      return () => {
        clearInterval(timer)
      }
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Devices />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/device_details/:deviceId" element={<DeviceDetails />} />
          </Route>
        </Route>
      </Routes>
      <Toastify />
    </Router>
  );
}

export default App;
