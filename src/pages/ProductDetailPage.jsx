import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiShoppingCart, 
  FiHeart, 
  FiShare2, 
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
  FiCheck
} from 'react-icons/fi';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Rating from '../components/ui/Rating';
import ProductCard from '../components/products/ProductCard';
import { formatPrice } from '../utils/helpers';
import { useCart } from '../hooks/useCart';
import productsData from '../data/products.json';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  
  const product = productsData.products.find(p => p.slug === slug);
  const relatedProducts = productsData.products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/products')}>Browse Products</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const reviews = [
    {
      id: 1,
      author: 'Sarah Johnson',
      rating: 5,
      date: '2025-10-15',
      comment: 'Absolutely love this product! Exceeded my expectations in every way.',
      verified: true
    },
    {
      id: 2,
      author: 'Michael Chen',
      rating: 4,
      date: '2025-10-10',
      comment: 'Great quality and fast shipping. Would recommend!',
      verified: true
    },
    {
      id: 3,
      author: 'Emma Davis',
      rating: 5,
      date: '2025-10-05',
      comment: 'Perfect! Exactly what I was looking for.',
      verified: true
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <button onClick={() => navigate('/')} className="hover:text-primary-600">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/products')} className="hover:text-primary-600">Products</button>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all"
                  >
                    <FiChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all"
                  >
                    <FiChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <Badge variant="dark">{product.badge}</Badge>
                )}
                {product.discount > 0 && (
                  <Badge variant="danger">-{product.discount}%</Badge>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-50 transition-colors">
                  <FiHeart className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-50 transition-colors">
                  <FiShare2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-primary-600' : ''
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{product.category}</p>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <Rating rating={product.rating} size="lg" />
                <span className="text-gray-600">({product.reviews.toLocaleString()} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge variant="success">Save {product.discount}%</Badge>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  {product.variants[0].color ? 'Color' : product.variants[0].size ? 'Size' : 'Variant'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant, index) => {
                    const isColor = variant.color && variant.colorCode;
                    const label = variant.color || variant.size || variant.style || variant.package;
                    
                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedVariant(variant)}
                        className={`${
                          isColor 
                            ? 'w-12 h-12 rounded-full border-2'
                            : 'px-4 py-2 rounded-lg border-2'
                        } ${
                          selectedVariant === variant
                            ? 'border-primary-600 ring-2 ring-primary-200'
                            : 'border-gray-300 hover:border-gray-400'
                        } transition-all`}
                        style={isColor ? { backgroundColor: variant.colorCode } : {}}
                        title={label}
                      >
                        {!isColor && <span className="font-medium text-sm">{label}</span>}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  {product.stock} available
                </p>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                size="lg"
                fullWidth
                icon={isInCart(product.id, selectedVariant) ? <FiCheck /> : <FiShoppingCart />}
                className={isInCart(product.id, selectedVariant) ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {isInCart(product.id, selectedVariant) ? 'Added to Cart' : 'Add to Cart'}
              </Button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              {[
                { icon: FiTruck, text: 'Free shipping on orders over $50' },
                { icon: FiShield, text: '2-year warranty included' },
                { icon: FiRefreshCw, text: '30-day easy returns' },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-700">
                  <feature.icon className="w-5 h-5 text-primary-600" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          {/* Tab Navigation */}
          <div className="flex gap-8 border-b border-gray-200 mb-8">
            {['description', 'features', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-semibold capitalize transition-colors relative ${
                  activeTab === tab ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              )}

              {activeTab === 'features' && (
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FiCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-900">{review.author}</p>
                            {review.verified && (
                              <Badge variant="success" size="sm">Verified Purchase</Badge>
                            )}
                          </div>
                          <Rating rating={review.rating} size="sm" showNumber={false} />
                        </div>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
