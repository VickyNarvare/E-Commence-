import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX, FiGrid, FiList } from 'react-icons/fi';
import ProductCard from '../components/products/ProductCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import productsData from '../data/products.json';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(productsData.products);
  const [filteredProducts, setFilteredProducts] = useState(productsData.products);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', ...new Set(productsData.products.map(p => p.category.toLowerCase()))];
  
  const priceRanges = [
    { label: 'All Prices', min: 0, max: 10000 },
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $300', min: 100, max: 300 },
    { label: '$300+', min: 300, max: 10000 },
  ];

  useEffect(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory);
    }

    // Subcategory filter
    if (selectedSubCategory !== 'all') {
      result = result.filter(p => p.subCategory === selectedSubCategory);
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Search filter
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(result);
  }, [selectedCategory, selectedSubCategory, priceRange, sortBy, searchParams, products]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    setPriceRange([0, 1000]);
    setSortBy('featured');
    setSearchParams({});
  };

  const activeFiltersCount = 
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedSubCategory !== 'all' ? 1 : 0) +
    (priceRange[0] !== 0 || priceRange[1] !== 1000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {searchParams.get('search') 
              ? `Search Results for "${searchParams.get('search')}"`
              : 'All Products'
            }
          </h1>
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      Clear All ({activeFiltersCount})
                    </button>
                  )}
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-primary-600 capitalize">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                      <button
                        key={index}
                        onClick={() => setPriceRange([range.min, range.max])}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          priceRange[0] === range.min && priceRange[1] === range.max
                            ? 'bg-primary-50 text-primary-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl p-4 shadow-lg mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden btn-outline px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FiFilter className="w-5 h-5" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="primary" size="sm">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </button>

                {/* View Mode Toggle */}
                <div className="hidden md:flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-200'
                    }`}
                    aria-label="Grid view"
                  >
                    <FiGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-gray-200'
                    }`}
                    aria-label="List view"
                  >
                    <FiList className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Mobile Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden bg-white rounded-2xl p-6 shadow-lg mb-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Filters</h3>
                    <button onClick={() => setShowFilters(false)}>
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                  {/* Add mobile filter content here - same as desktop */}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-6'
              }>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-400 mb-4">No products found</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
