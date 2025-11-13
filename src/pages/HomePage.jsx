import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { 
  FiArrowRight, 
  FiTrendingUp, 
  FiAward, 
  FiPackage 
} from 'react-icons/fi';
import { 
  MdDevices, 
  MdSportsSoccer, 
  MdHome 
} from 'react-icons/md';
import { GiClothes } from 'react-icons/gi';
import ProductCard from '../components/products/ProductCard';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import productsData from '../data/products.json';
import { useFadeIn, useStagger, useCounter } from '../hooks/useGsap';

const HomePage = () => {
  const featuredProducts = productsData.products.filter(p => 
    ['Bestseller', 'New Arrival', 'Premium'].includes(p.badge)
  ).slice(0, 8);

  // GSAP Animation Refs
  const heroRef = useFadeIn({ duration: 1, y: 30 });
  const categoriesRef = useStagger({ stagger: 0.15, y: 40 });
  const productsRef = useStagger({ stagger: 0.1, y: 50 });
  const decorativeRef1 = useRef(null);
  const decorativeRef2 = useRef(null);
  const statsCounter1 = useCounter(10, { duration: 2, formatter: (val) => Math.floor(val) + 'K+' });
  const statsCounter2 = useCounter(50, { duration: 2, formatter: (val) => Math.floor(val) + 'K+' });
  const statsCounter3 = useCounter(100, { duration: 2, formatter: (val) => Math.floor(val) + '+' });

  // Floating animation for decorative elements
  useEffect(() => {
    if (decorativeRef1.current && decorativeRef2.current) {
      gsap.to(decorativeRef1.current, {
        y: -20,
        x: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      gsap.to(decorativeRef2.current, {
        y: 20,
        x: -15,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }
  }, []);

  const categories = [
    { 
      name: 'Electronics', 
      icon: MdDevices, 
      color: 'from-blue-500 to-cyan-500',
      path: '/products?category=electronics'
    },
    { 
      name: 'Fashion', 
      icon: GiClothes, 
      color: 'from-pink-500 to-purple-500',
      path: '/products?category=fashion'
    },
    { 
      name: 'Sports', 
      icon: MdSportsSoccer, 
      color: 'from-green-500 to-emerald-500',
      path: '/products?category=sports'
    },
    { 
      name: 'Home', 
      icon: MdHome, 
      color: 'from-orange-500 to-red-500',
      path: '/products?category=home'
    },
  ];

  const stats = [
    { icon: FiPackage, ref: statsCounter1, label: 'Products' },
    { icon: FiTrendingUp, ref: statsCounter2, label: 'Happy Customers' },
    { icon: FiAward, ref: statsCounter3, label: 'Awards Won' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20" />
        
        <div className="container-custom h-full flex items-center relative z-10">
          <div ref={heroRef} className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary-600/20 backdrop-blur-sm px-4 py-2 rounded-full text-primary-300 mb-6"
            >
              <FiTrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Trending in 2025</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Discover Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                Perfect Style
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 mb-8 max-w-lg"
            >
              Shop premium quality products with exclusive deals. Free shipping on orders over $50.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/products">
                <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white">
                  Shop Collection
                  <FiArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Our Story
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <div className="flex gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-600/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <p ref={stat.ref} className="text-2xl font-bold text-white">0</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div ref={decorativeRef1} className="absolute top-20 right-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
        <div ref={decorativeRef2} className="absolute bottom-20 left-20 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our curated collections of premium products
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" ref={categoriesRef}>
            {categories.map((category, index) => (
              <div key={index}>
                <Link to={category.path}>
                  <Card className="group text-center p-8 hover:scale-105 cursor-pointer transition-all duration-300 bg-white border border-gray-100 hover:border-primary-200 hover:shadow-lg">
                    <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300`}>
                      <category.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-500 mt-2 text-sm">Explore collection</p>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-16"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600">
                Handpicked items just for you
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:border-primary-300 hover:text-primary-600">
                View All
                <FiArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Our Community Today
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get exclusive access to deals, new arrivals, and special promotions
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  Create Account
                  <FiArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Browse Products
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;