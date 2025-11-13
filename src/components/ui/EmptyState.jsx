import React from 'react';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiSearch, FiInbox, FiPackage } from 'react-icons/fi';
import Button from './Button';

const EmptyState = ({ 
  icon: Icon = FiInbox,
  title = 'No items found',
  description = 'Try adjusting your filters or search query',
  action,
  actionLabel = 'Go back',
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-24 h-24 mb-6 bg-gray-100 rounded-full flex items-center justify-center"
      >
        <Icon className="w-12 h-12 text-gray-400" />
      </motion.div>

      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md mb-8">{description}</p>

      {action && (
        <Button onClick={action} size="lg">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export const EmptyCart = ({ onContinueShopping }) => (
  <EmptyState
    icon={FiShoppingBag}
    title="Your cart is empty"
    description="Looks like you haven't added anything to your cart yet. Start shopping to fill it up!"
    action={onContinueShopping}
    actionLabel="Start Shopping"
  />
);

export const EmptySearch = ({ onClearFilters }) => (
  <EmptyState
    icon={FiSearch}
    title="No products found"
    description="We couldn't find any products matching your search. Try different keywords or clear filters."
    action={onClearFilters}
    actionLabel="Clear Filters"
  />
);

export const EmptyOrders = ({ onBrowseProducts }) => (
  <EmptyState
    icon={FiPackage}
    title="No orders yet"
    description="You haven't placed any orders yet. Browse our products and make your first purchase!"
    action={onBrowseProducts}
    actionLabel="Browse Products"
  />
);

export default EmptyState;
