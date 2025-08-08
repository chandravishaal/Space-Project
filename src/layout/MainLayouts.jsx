import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20 px-4 max-w-7xl mx-auto min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
