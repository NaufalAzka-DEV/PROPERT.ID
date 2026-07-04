import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-[#07111f] text-white">
      <Navbar />
      <main className="flex-1">
        <div key={location.pathname} className="page-transition">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
