import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react'; 
import MobileSidebar from './MobileSidebar'; 

// Central list of navigation links
const navLinks = [
  { to: '/', name: 'Home' },
  { to: '/blog', name: 'Blog' },
  { to: '/store', name: 'Store' },
  { to: '/store/tools', name: 'Tools' },
  { to: '/about', name: 'About' },
  { to: '/contact', name: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur text-white shadow">
      <nav className="flex items-center justify-between px-4 sm:px-6 py-3 max-w-7xl mx-auto">
        
        {/* Logo - small and fixed to the left */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src="/name.png"
            alt="name"
            className="h-3 w-auto sm:h-4 md:h-5 object-contain"

          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8 text-sm uppercase ml-auto">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="hover:text-[#AB79B3] transition-colors duration-200"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden ml-auto p-2"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} navLinks={navLinks} />
    </header>
  );
};

export default Navbar;
