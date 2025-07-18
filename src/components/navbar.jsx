// src/components/navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';




export default function NavbarHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Adjust according to your slice


  return (
    <>
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="ml-10 mr-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Changed to Link for consistency */}
          <Link to="/saver" className="flex items-center space-x-2">
            <img src="https://ik.imagekit.io/e3e3repzs/my%20phto/WhatsApp%20Image%202025-04-18%20at%2015.07.16_c3f6f2e7.jpg?updatedAt=1745487629629" alt="Logo" className="h-8 w-auto rounded-sm" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">ROCS</span>
          </Link>

          {/* Desktop Links - Now shown on large screens and up */}
         {/* Desktop Links – hidden on sm, visible (flex) on md+ */}
<div className="desktop-links  space-x-6">
  {['Saver', 'Categories', 'Services', 'Farm Fresh', 'Orders'].map((label) => (
    <Link
      key={label}
      to={label === 'Home' ? '/' : `/${label.toLowerCase()}`} 
      className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-bold  font-[Cascadia_Code]"
    >
      {label}
    </Link>
  ))}
</div>


          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-1 focus:outline-none"
                aria-expanded={userMenuOpen}
                aria-label="User menu"
              >
            <img
                src={
                  user?.avatar
                    ? user.avatar.startsWith('data:')
                      ? user.avatar
                      : `data:image/png;base64,${user.avatar}`
                    : `https://ui-avatars.com/api/?name=${user?.name || 'Guest'}`
                }
                alt="User"
                className="h-10 w-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-600 object-cover"
              />

                
              </button>
              {/* Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1 z-50">
                  <Link to="/sell" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
                  onClick={() => setUserMenuOpen(false)}
                  >Sell On Rocs</Link>
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setUserMenuOpen(false)}
                  >Profile</Link>
                  <Link to="/settings" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setUserMenuOpen(false)}
                  >Settings</Link>
                </div>
              )}
            </div>
           {user ? (
              <button
                onClick={() => dispatch(logout())}
                className="hidden sm:!flex px-2 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 font-bold font-[Cascadia_Code]"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden sm:!flex px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-bold font-[Cascadia_Code]"
              >
                Get Started
              </Link>
            )}


            {/* Mobile Menu Button */}
            <button
              className="nav-toggle  p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-800 dark:text-white" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-800 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links - Updated to use Link components */}
      {menuOpen && (
        <div className="nav-toggle bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['Saver', 'Categories', 'Services', 'Farm Fresh', 'Orders'].map((label) => (
              <Link
                key={label}
                to={label === 'Home' ? '/' : `/${label.toLowerCase()}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                
                onClick={() => setMenuOpen(false)}
                aria-expanded={userMenuOpen}
              aria-label="Toggle navigation menu"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
    </>
  );
}