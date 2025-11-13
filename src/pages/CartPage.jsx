import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { formatPrice } from '../utils/helpers';
import { useCart } from '../hooks/useCart';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const freeShippingThreshold = 50;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                <FiShoppingBag className="w-16 h-16 text-gray-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Your cart is empty</h1>
              <p className="text-gray-600">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link to="/products">
                <Button size="lg">
                  Continue Shopping
                  <FiArrowRight />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{cartItems.length} items in your cart</p>
        </motion.div>

        {/* Free Shipping Progress */}
        {remainingForFreeShipping > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-200">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <FiShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    Add {formatPrice(remainingForFreeShipping)} more to get FREE shipping!
                  </p>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-600 to-secondary-600 transition-all duration-500"
                      style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => {
              const variantLabel = item.selectedVariant 
                ? Object.values(item.selectedVariant).find(v => typeof v === 'string')
                : null;

              return (
                <motion.div
                  key={`${item.id}-${JSON.stringify(item.selectedVariant)}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <Link to={`/product/${item.slug}`} className="flex-shrink-0">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <Link to={`/product/${item.slug}`}>
                              <h3 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-1">
                                {item.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">
                              {item.category}
                              {variantLabel && ` • ${variantLabel}`}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id, item.selectedVariant)}
                            className="ml-4 p-2 hover:bg-red-50 rounded-lg transition-colors group"
                            aria-label="Remove item"
                          >
                            <FiTrash2 className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
                          </button>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-end justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border-2 border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedVariant)}
                                className="px-3 py-1.5 hover:bg-gray-100 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <FiMinus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-1.5 font-semibold min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedVariant)}
                                className="px-3 py-1.5 hover:bg-gray-100 transition-colors"
                                disabled={item.quantity >= item.stock}
                                aria-label="Increase quantity"
                              >
                                <FiPlus className="w-4 h-4" />
                              </button>
                            </div>
                            {item.quantity >= item.stock && (
                              <p className="text-xs text-red-600">Max stock reached</p>
                            )}
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            {item.originalPrice > item.price && (
                              <p className="text-sm text-gray-400 line-through">
                                {formatPrice(item.originalPrice * item.quantity)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}

            {/* Clear Cart Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="outline"
                onClick={clearCart}
                className="w-full md:w-auto"
              >
                Clear Cart
              </Button>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24"
            >
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (8%)</span>
                    <span className="font-semibold">{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  fullWidth
                  size="lg"
                  onClick={() => navigate('/checkout')}
                  className="mb-4"
                >
                  Proceed to Checkout
                  <FiArrowRight />
                </Button>

                <Link to="/products">
                  <Button fullWidth variant="outline">
                    Continue Shopping
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span>Free returns within 30 days</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span>Money-back guarantee</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
