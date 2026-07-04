import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Booking from '../pages/Booking';
import BuildingDetail from '../pages/BuildingDetail';
import Buildings from '../pages/Buildings';
import Dashboard from '../pages/Dashboard';
import History from '../pages/History';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/gedung" element={<Buildings />} />
          <Route path="/gedung/:id" element={<BuildingDetail />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/riwayat" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/masuk" element={<Login />} />
          <Route path="/daftar" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
