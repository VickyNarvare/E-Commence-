import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi';

const Toast = ({ message, type = 'success', isVisible, onClose }) => {
  const icons = {
    success: <FiCheck className="w-5 h-5" />,
    error: <FiX className="w-5 h-5" />,
    warning: <FiAlertCircle className="w-5 h-5" />,
    info: <FiInfo className="w-5 h-5" />,
  };

  const styles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[100]"
        >
          <div className={`${styles[type]} px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px] max-w-md`}>
            <div className="flex-shrink-0">
              {icons[type]}
            </div>
            <p className="font-medium flex-1">{message}</p>
            <button
              onClick={onClose}
              className="flex-shrink-0 hover:opacity-80 transition-opacity"
              aria-label="Close notification"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
