import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Home, FileText, Info, Settings, MessageCircle, Phone, BookOpen, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="inline-block h-4 w-4 mr-2" /> },
    { name: 'Summarize', path: '/summarize', icon: <FileText className="inline-block h-4 w-4 mr-2" /> },
    { name: 'About', path: '/about', icon: <Info className="inline-block h-4 w-4 mr-2" /> },
    { name: 'How It Works', path: '/how-it-works', icon: <Settings className="inline-block h-4 w-4 mr-2" /> },
    { name: 'Feedback', path: '/feedback', icon: <MessageCircle className="inline-block h-4 w-4 mr-2" /> },
    { name: 'Contact', path: '/contact', icon: <Phone className="inline-block h-4 w-4 mr-2" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass shadow-large backdrop-blur-xl' 
        : 'bg-white/80 backdrop-blur-md shadow-soft'
    } rounded-2xl border border-white/20`}>
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 group">
          <div className="relative">
            <BookOpen className="h-6 w-6 text-primary-600 group-hover:text-primary-700 transition-colors" />
            <Sparkles className="h-3 w-3 text-accent-400 absolute -top-1 -right-1 animate-bounce-gentle" />
          </div>
          <span className="text-xl font-bold gradient-text font-heading select-none">
            UniSummarize
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 select-none ${
                  isActive
                    ? 'bg-primary-500 text-white shadow-glow'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/summarize"
            className="btn-primary text-sm animate-fade-in-up"
          >
            Try Now
          </Link>
        </div>

        {/* Mobile Navigation Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-white/20 bg-white/95 backdrop-blur-xl rounded-b-2xl animate-fade-in-down">
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 select-none ${
                    isActive
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-gray-200">
              <Link
                to="/summarize"
                className="btn-primary w-full text-center"
                onClick={() => setIsOpen(false)}
              >
                Try Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
