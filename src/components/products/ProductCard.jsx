import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart, FiEye } from "react-icons/fi";
import gsap from "gsap";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Rating from "../ui/Rating";
import { formatPrice } from "../../utils/helpers";
import { useCart } from "../../hooks/useCart";
import { useScrollAnimation } from "../../hooks/useGsap";

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const [isHovered, setIsHovered] = React.useState(false);
  const cardRef = useScrollAnimation({ y: 60, duration: 0.8 });
  const imageRef = useRef(null);
  const buttonRef = useRef(null);
  const priceRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Image zoom effect
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.05,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset image
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Add to cart with animation
    addToCart(product, 1);

    // Animate button
    if (buttonRef.current) {
      gsap
        .timeline()
        .to(buttonRef.current, {
          scale: 0.9,
          duration: 0.1,
        })
        .to(buttonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "elastic.out(1, 0.5)",
        });
    }
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to wishlist functionality here
    console.log("Added to wishlist:", product.name);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick view functionality here
    console.log("Quick view:", product.name);
  };

  return (
    <div ref={cardRef}>
      <Card
        className="product-card h-full flex flex-col cursor-pointer group border border-gray-200 hover:border-primary-300 transition-all duration-300 rounded-xl overflow-hidden"
        padding="none"
        hover={false} // Disable Card's built-in hover effects to avoid conflicts
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image Container */}
        <div className="relative">
          <Link to={`/product/${product.slug}`} className="block">
            <div className="aspect-square overflow-hidden bg-gray-100">
              <img
                ref={imageRef}
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500"
              />
            </div>
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.badge && (
              <Badge variant="dark" size="sm">
                {product.badge}
              </Badge>
            )}
            {product.discount > 0 && (
              <Badge variant="danger" size="sm">
                -{product.discount}%
              </Badge>
            )}
          </div>

          {/* Quick Actions - Hidden by default, shown on hover */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-50 transition-colors"
              onClick={handleWishlistClick}
              aria-label="Add to wishlist"
            >
              <FiHeart className="w-4 h-4 text-gray-700" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-50 transition-colors"
              onClick={handleQuickViewClick}
              aria-label="Quick view"
            >
              <FiEye className="w-4 h-4 text-gray-700" />
            </motion.button>
          </div>
        </div>

        {/* Product Info */}
        <Link to={`/product/${product.slug}`} className="block">
          <div className="p-4 flex-1 flex flex-col">
            <div className="mb-2">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                {product.category}
              </p>
              <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
                {product.name}
              </h3>
            </div>

            {/* Rating */}
            <div className="mb-3">
              <Rating rating={product.rating} size="sm" />
              <p className="text-xs text-gray-500 mt-1">
                ({product.reviews.toLocaleString()} reviews)
              </p>
            </div>

            {/* Price */}
            <div className="mt-auto flex items-center justify-between">
              <div className="flex flex-col">
                <span
                  ref={priceRef}
                  className="text-lg font-bold text-gray-900"
                >
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              
              {/* Add to Cart Button - Always visible but changes state */}
              <motion.button
                ref={buttonRef}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${
                  isInCart(product.id)
                    ? "bg-green-500 text-white"
                    : "bg-primary-100 text-primary-600 hover:bg-primary-600 hover:text-white"
                }`}
                aria-label={isInCart(product.id) ? "In Cart" : "Add to Cart"}
              >
                <FiShoppingCart className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Stock Status */}
            <div className="mt-3">
              {product.inStock ? (
                <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  In Stock ({product.stock} available)
                </p>
              ) : (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Out of Stock
                </p>
              )}
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
};

export default ProductCard;