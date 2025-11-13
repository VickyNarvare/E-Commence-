import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiTrash2, FiMapPin } from 'react-icons/fi';
import Card from '../ui/Card';
import Button from '../ui/Button';

const SavedAddresses = ({ addresses, onSelectAddress, selectedAddressId, onDelete }) => {
  if (addresses.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <FiMapPin className="w-5 h-5 text-primary-600" />
        Saved Addresses
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address, index) => (
          <motion.div
            key={address.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all ${
                selectedAddressId === address.id
                  ? 'ring-2 ring-primary-600 bg-primary-50'
                  : 'hover:shadow-lg'
              }`}
              onClick={() => onSelectAddress(address)}
              padding="md"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold text-gray-900">
                      {address.firstName} {address.lastName}
                    </p>
                    {address.isDefault && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                        Default
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-1">{address.address}</p>
                  <p className="text-sm text-gray-600 mb-1">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p className="text-sm text-gray-600">{address.phone}</p>
                </div>

                <div className="flex flex-col gap-2 ml-3">
                  {selectedAddressId === address.id ? (
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                      <FiCheck className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                  )}
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(address.id);
                    }}
                    className="text-red-500 hover:text-red-700 transition-colors p-1"
                    aria-label="Delete address"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SavedAddresses;
