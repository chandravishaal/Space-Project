
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react'; 
import MobileSidebar from './MobileSidebar'; 

// Central list of navigation links
// this makes links reusable for both desktop and mobile views so that i dont need to chaneg evrywhere whenerver i make chnages
const navLinks = [
  { to: '/', name: 'Home' },
  { to: '/blog', name: 'Blog' },
  { to: '/store', name: 'Store' },
  { to: '/store/tools', name: 'Tools' },
  { to: '/about', name: 'About' },
  { to: '/contact', name: 'Contact' },
];

const Navbar = () => {
  // State to control visibility of the mobile sidebar
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Sticky header
    <header className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur text-white shadow">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo linking to homepage */}
        <Link to="/" className="text-xl font-bold tracking-wide">
          Astrosapientes
        </Link>

        {/* Desktop Navigation - visible from md screens and up */}
        <ul className="hidden md:flex space-x-6 text-sm uppercase">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="hover:text-blue-400">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button - visible on small screens only */}
        <button onClick={() => setIsOpen(true)} className="md:hidden">
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Sidebar - slides in when isOpen is true */}
      <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} navLinks={navLinks} />
    </header>
  );
};

export default Navbar;
