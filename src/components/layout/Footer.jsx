import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaHeadset
} from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import Button from '../ui/Button';
import { validateEmail } from '../../utils/helpers';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQs', path: '/faq' },
    { name: 'Shipping Info', path: '/shipping' },
    { name: 'Returns', path: '/returns' },
    { name: 'Privacy Policy', path: '/privacy' },
  ];

  const categories = [
    { name: 'Electronics', path: '/products?category=electronics' },
    { name: 'Fashion', path: '/products?category=fashion' },
    { name: 'Sports', path: '/products?category=sports' },
    { name: 'Home & Living', path: '/products?category=home' },
  ];

  const features = [
    { icon: FaTruck, text: 'Free Shipping', subtext: 'On orders over $50' },
    { icon: FaUndo, text: '30-Day Returns', subtext: 'Money back guarantee' },
    { icon: FaShieldAlt, text: 'Secure Payment', subtext: '100% protected' },
    { icon: FaHeadset, text: '24/7 Support', subtext: 'Dedicated support' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Features Bar */}
      <div className="border-b border-gray-800">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600/10 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">{feature.text}</p>
                  <p className="text-sm text-gray-400 mt-1">{feature.subtext}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold text-white">EliteShop</span>
            </Link>
            <p className="text-gray-400 max-w-md">
              Your trusted destination for premium products. Quality, style, and exceptional service in every purchase.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-gray-300">
                <FiPhone className="w-5 h-5 text-primary-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FiMail className="w-5 h-5 text-primary-400" />
                <span>support@eliteshop.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FiMapPin className="w-5 h-5 text-primary-400" />
                <span>123 Commerce St, NY 10001</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3 pt-4">
              {[
                { icon: FaFacebookF, href: '#' },
                { icon: FaTwitter, href: '#' },
                { icon: FaInstagram, href: '#' },
                { icon: FaLinkedinIn, href: '#' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Social media link"
                >
                  <social.icon className="w-4 h-4 text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.path}>
                  <Link
                    to={category.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get special offers and updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm text-white placeholder-gray-500"
                  required
                />
              </div>
              <Button type="submit" fullWidth size="sm" className="bg-primary-600 hover:bg-primary-700">
                {subscribed ? '✓ Subscribed!' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-900/50">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} EliteShop. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm">We Accept:</span>
              {[FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal].map((Icon, index) => (
                <div
                  key={index}
                  className="w-10 h-7 bg-white rounded flex items-center justify-center"
                >
                  <Icon className="w-6 h-6 text-gray-700" />
                </div>
              ))}
              <div className="flex items-center gap-1 ml-2 px-3 py-1 bg-green-500/10 rounded-full">
                <FaShieldAlt className="w-3 h-3 text-green-500" />
                <span className="text-green-500 text-xs font-semibold">SSL Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;