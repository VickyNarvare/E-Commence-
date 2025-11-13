import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiPackage, FiMail } from 'react-icons/fi';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const OrderSuccessPage = () => {
  useEffect(() => {
    // Confetti animation could be added here
    window.scrollTo(0, 0);
  }, []);

  const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="text-center p-12">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
            >
              <FiCheck className="w-12 h-12 text-green-600" />
            </motion.div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Order Placed Successfully!
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                Thank you for your purchase
              </p>
              <p className="text-gray-500 mb-8">
                Order #{orderNumber}
              </p>
            </motion.div>

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              <div className="bg-gray-50 rounded-xl p-6">
                <FiMail className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Email Confirmation</h3>
                <p className="text-sm text-gray-600">
                  We've sent a confirmation email with your order details
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <FiPackage className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Shipping Soon</h3>
                <p className="text-sm text-gray-600">
                  Your order will be shipped within 2-3 business days
                </p>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/products" className="flex-1 sm:flex-none">
                <Button size="lg" fullWidth>
                  Continue Shopping
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Track Order
              </Button>
            </motion.div>
          </Card>
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What happens next?</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: 'Order Confirmation', desc: 'You will receive an email confirmation shortly' },
                { step: 2, title: 'Processing', desc: 'We will process and pack your order' },
                { step: 3, title: 'Shipping', desc: 'Your order will be shipped to your address' },
                { step: 4, title: 'Delivery', desc: 'Track your package until it arrives' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
