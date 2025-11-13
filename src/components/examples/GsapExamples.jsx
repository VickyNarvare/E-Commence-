import React, { useRef } from 'react';
import { 
  useFadeIn, 
  useScrollAnimation, 
  useStagger, 
  useHoverScale, 
  useParallax,
  useCounter,
  useGsap 
} from '../../hooks/useGsap';
import { animations, ecommerceAnimations } from '../../utils/animations';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { FiCheck, FiShoppingCart } from 'react-icons/fi';

/**
 * GSAP Animation Examples Component
 * Demonstrates all available animations in the project
 */
const GsapExamples = () => {
  // Example 1: Fade In
  const fadeInRef = useFadeIn({ duration: 1, y: 30 });

  // Example 2: Scroll Animation
  const scrollRef = useScrollAnimation({ y: 60, duration: 0.8 });

  // Example 3: Stagger Children
  const staggerRef = useStagger({ stagger: 0.15, y: 40 });

  // Example 4: Hover Scale
  const hoverRef = useHoverScale({ scale: 1.1 });

  // Example 5: Parallax
  const parallaxRef = useParallax({ y: -50 });

  // Example 6: Counter Animation
  const counterRef = useCounter(1000, { 
    duration: 2, 
    formatter: (val) => Math.floor(val).toLocaleString() 
  });

  // Example 7: Custom Animation
  const customRef = useRef(null);
  useGsap(() => {
    if (customRef.current) {
      animations.rotateIn(customRef.current, { duration: 1 });
    }
  }, []);

  // Example 8: Add to Cart Animation
  const cartButtonRef = useRef(null);
  const handleAddToCart = () => {
    ecommerceAnimations.addToCart(cartButtonRef.current);
  };

  // Example 9: Price Update Animation
  const priceRef = useRef(null);
  const handlePriceUpdate = () => {
    ecommerceAnimations.priceUpdate(priceRef.current);
  };

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container-custom max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          GSAP Animation Examples
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Interactive demonstrations of all available GSAP animations in this project
        </p>

        {/* Example 1: Fade In on Mount */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Fade In Animation</h2>
          <div ref={fadeInRef}>
            <Card className="p-8 text-center">
              <p className="text-lg text-gray-700">
                This card fades in when the component mounts! 🎭
              </p>
            </Card>
          </div>
        </section>

        {/* Example 2: Scroll Triggered Animation */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Scroll Animation</h2>
          <div ref={scrollRef}>
            <Card className="p-8 text-center bg-gradient-to-br from-primary-500 to-secondary-500">
              <p className="text-lg text-white font-medium">
                Scroll down to see me animate! 📜
              </p>
            </Card>
          </div>
        </section>

        {/* Example 3: Stagger Animation */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Stagger Children</h2>
          <div ref={staggerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <Card key={num} className="p-6 text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{num}</span>
                </div>
                <p className="text-gray-700">Card {num}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Example 4: Hover Scale */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Hover Scale Effect</h2>
          <div className="flex justify-center">
            <div ref={hoverRef}>
              <Card className="p-8 cursor-pointer">
                <p className="text-lg text-gray-700">Hover over me! 🖱️</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Example 5: Parallax */}
        <section className="mb-16 relative h-64 bg-gray-200 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div ref={parallaxRef} className="bg-primary-500 text-white p-12 rounded-2xl">
              <p className="text-xl font-semibold">Parallax Effect - Scroll to see! 🏔️</p>
            </div>
          </div>
        </section>

        {/* Example 6: Counter Animation */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Animated Counter</h2>
          <Card className="p-8 text-center">
            <p className="text-5xl font-bold text-primary-600 mb-2">
              <span ref={counterRef}>0</span>+
            </p>
            <p className="text-gray-600">Happy Customers</p>
          </Card>
        </section>

        {/* Example 7: Custom Rotate Animation */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Custom Rotation</h2>
          <div className="flex justify-center">
            <div ref={customRef}>
              <Card className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl mx-auto flex items-center justify-center">
                  <FiCheck className="w-10 h-10 text-white" />
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Example 8: Add to Cart Animation */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. E-commerce: Add to Cart</h2>
          <div className="flex justify-center">
            <Button 
              ref={cartButtonRef}
              onClick={handleAddToCart}
              size="lg"
              className="flex items-center gap-2"
            >
              <FiShoppingCart className="w-5 h-5" />
              Click to Add to Cart
            </Button>
          </div>
        </section>

        {/* Example 9: Price Update Animation */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. E-commerce: Price Update</h2>
          <Card className="p-8 text-center">
            <p className="text-gray-600 mb-2">Product Price:</p>
            <p ref={priceRef} className="text-4xl font-bold text-gray-900 mb-4">$99.99</p>
            <Button onClick={handlePriceUpdate}>Update Price</Button>
          </Card>
        </section>

        {/* Tips Section */}
        <section className="mt-20">
          <Card className="p-8 bg-gradient-to-br from-primary-50 to-secondary-50">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">💡 Tips</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✅ All animations are hardware-accelerated (60fps)</li>
              <li>✅ ScrollTrigger automatically cleans up on unmount</li>
              <li>✅ Use <code className="bg-white px-2 py-1 rounded">useGsap</code> hook for custom animations</li>
              <li>✅ Animations respect your warm taupe color theme</li>
              <li>✅ Check <code className="bg-white px-2 py-1 rounded">GSAP_ANIMATIONS_GUIDE.md</code> for full documentation</li>
            </ul>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default GsapExamples;
