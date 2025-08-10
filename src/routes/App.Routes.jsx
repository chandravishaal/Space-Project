import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Blog from '../pages/Blog/Blog';
import NotFound from '../pages/NotFound';
import MainLayout from '../layout/MainLayouts';
import Tools from '../pages/Tools/Tools';
import Contact from '../pages/Contact';
import Store from '../pages/Store/Store';
import BlogPost from '../pages/Blog/BlogNew';
import TestParticles from '../pages/StarPartTest';
import BlackHole from '../pages/Blackhole/BlackHole';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost/>} />
        <Route path="/store" element={<Store />} />
        <Route path="/tools" element={<Tools/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/test-particles" element={<TestParticles />} />
        <Route path="/blackhole" element={<BlackHole/>}/>


      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
