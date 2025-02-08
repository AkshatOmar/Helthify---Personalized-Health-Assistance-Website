import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { text: 'Home', href: '/' },
    { text: 'BMI Calculator', href: '/bmi' },
    { text: 'Workouts', href: '/workouts' },
    { text: 'Meal Plans', href: '/meals' },
    { text: 'Blog', href: '/blog' },
  ];

  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  if (isAuthPage) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">HEALTHIFY</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.text}
                to={item.href}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {item.text}
              </Link>
            ))}
            <Link to="/login">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.text}
                  to={item.href}
                  className="block px-3 py-2 text-gray-600 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.text}
                </Link>
              ))}
              <div className="pt-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Sign In</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}