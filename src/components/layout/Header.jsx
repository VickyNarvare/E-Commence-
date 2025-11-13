import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiUser,
  FiSearch,
  FiMenu,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    {
      name: "Shop",
      path: "/products",
      hasDropdown: true,
      dropdownItems: [
        { name: "All Products", path: "/products" },
        { name: "Electronics", path: "/products?category=electronics" },
        { name: "Fashion", path: "/products?category=fashion" },
        { name: "Sports", path: "/products?category=sports" },
        { name: "Home & Living", path: "/products?category=home" },
      ],
    },
    {
      name: "Collections",
      path: "/collections",
      hasDropdown: true,
      dropdownItems: [
        { name: "Summer Collection", path: "/collections/summer" },
        { name: "Winter Collection", path: "/collections/winter" },
        { name: "New Arrivals", path: "/collections/new" },
        { name: "Best Sellers", path: "/collections/bestsellers" },
      ],
    },
    { name: "Brands", path: "/brands" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Calculate cart count directly from cartItems to ensure reactivity
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm py-3' : 'bg-white py-4'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3"
            >
              <img 
                src="/logo.svg" 
                alt="EliteShop Logo" 
                className="w-10 h-10 rounded-xl"
              />
              <span className="text-2xl font-bold text-gray-900 hidden sm:block">EliteShop</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <div key={index} className="relative">
                {link.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(link.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center gap-1 px-4 py-2.5 text-gray-700 hover:text-primary-600 transition-colors rounded-lg font-medium">
                      <span>{link.name}</span>
                      <FiChevronDown className="w-4 h-4" />
                    </button>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                        >
                          {link.dropdownItems.map((item, itemIndex) => (
                            <Link
                              key={itemIndex}
                              to={item.path}
                              className="block px-4 py-2.5 text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className="px-4 py-2.5 text-gray-700 hover:text-primary-600 transition-colors font-medium rounded-lg"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>

            {/* User Icon */}
            <Link to="/login">
              <div className="p-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <FiUser className="w-5 h-5" />
              </div>
            </Link>

            {/* Cart Icon */}
            <Link to="/cart">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden mt-4"
            >
              <nav className="flex flex-col gap-1 py-4 border-t border-gray-200">
                {navLinks.map((link, index) => (
                  <div key={index}>
                    {link.hasDropdown ? (
                      <div className="space-y-1">
                        <div className="text-gray-900 font-medium px-4 py-3 flex items-center justify-between">
                          {link.name}
                          <FiChevronDown className="w-4 h-4" />
                        </div>
                        {link.dropdownItems.map((item, itemIndex) => (
                          <Link
                            key={itemIndex}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-gray-600 hover:text-primary-600 transition-colors px-6 py-2.5"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-gray-700 hover:text-primary-600 font-medium transition-colors px-4 py-3"
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile Action Buttons */}
                <div className="flex flex-col gap-3 px-4 pt-4 border-t border-gray-200 mt-4">
                  <button
                    onClick={() => {
                      setIsSearchOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 bg-gray-100 text-gray-900 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    <FiSearch className="w-5 h-5" />
                    <span>Search Products</span>
                  </button>

                  <Link
                    to="/login"
                    className="flex items-center gap-3 bg-gray-100 text-gray-900 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FiUser className="w-5 h-5" />
                    <span>Account</span>
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50 px-4"
            >
              <form
                onSubmit={handleSearch}
                className="bg-white rounded-2xl shadow-xl p-1 border border-gray-200"
              >
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products..."
                    className="w-full pl-12 pr-4 py-4 bg-transparent rounded-xl focus:outline-none text-lg placeholder-gray-500"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;