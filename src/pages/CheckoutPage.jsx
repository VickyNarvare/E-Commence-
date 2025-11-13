import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiCreditCard, FiTruck, FiCheck } from 'react-icons/fi';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Toast from '../components/ui/Toast';
import Confetti from '../components/ui/Confetti';
import SavedAddresses from '../components/ui/SavedAddresses';
import { formatPrice, validateEmail, validatePhone, validateCreditCard, formatCardNumber } from '../utils/helpers';
import { useCart } from '../hooks/useCart';
import { useSavedAddresses } from '../hooks/useSavedAddresses';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { savedAddresses, saveAddress, deleteAddress, getDefaultAddress } = useSavedAddresses();
  const [activeStep, setActiveStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [selectedSavedAddressId, setSelectedSavedAddressId] = useState(null);

  const [formData, setFormData] = useState({
    // Shipping Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Info
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Options
    saveInfo: false,
    sameAsShipping: true,
  });

  const [errors, setErrors] = useState({});

  // Load default address on component mount
  useEffect(() => {
    const defaultAddress = getDefaultAddress();
    if (defaultAddress) {
      setFormData(prev => ({
        ...prev,
        firstName: defaultAddress.firstName || '',
        lastName: defaultAddress.lastName || '',
        email: defaultAddress.email || '',
        phone: defaultAddress.phone || '',
        address: defaultAddress.address || '',
        city: defaultAddress.city || '',
        state: defaultAddress.state || '',
        zipCode: defaultAddress.zipCode || '',
      }));
      setSelectedSavedAddressId(defaultAddress.id);
    }
  }, []);

  const handleSelectSavedAddress = (address) => {
    setFormData(prev => ({
      ...prev,
      firstName: address.firstName,
      lastName: address.lastName,
      email: address.email,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
    }));
    setSelectedSavedAddressId(address.id);
    setErrors({}); // Clear any existing errors
  };

  const handleDeleteAddress = (addressId) => {
    deleteAddress(addressId);
    if (selectedSavedAddressId === addressId) {
      setSelectedSavedAddressId(null);
    }
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let processedValue = value;
    
    // Format card number
    if (name === 'cardNumber') {
      processedValue = formatCardNumber(value.replace(/\s/g, '')).slice(0, 19);
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      processedValue = value
        .replace(/\D/g, '')
        .slice(0, 4)
        .replace(/(\d{2})(\d)/, '$1/$2');
    }
    
    // Format CVV
    if (name === 'cvv') {
      processedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Valid email is required';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Valid phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!validateCreditCard(formData.cardNumber)) {
      newErrors.cardNumber = 'Invalid card number';
    }
    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
    }
    if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (activeStep === 1 && validateStep1()) {
      // Save address if saveInfo is checked or if it's a new address
      if (formData.saveInfo || !selectedSavedAddressId) {
        const addressToSave = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        };
        const saved = saveAddress(addressToSave);
        if (saved) {
          setSelectedSavedAddressId(saved.id);
        }
      }
      setActiveStep(2);
    } else if (activeStep === 2 && validateStep2()) {
      setActiveStep(3);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success toast
    setShowSuccessToast(true);
    setIsProcessing(false);
    
    // Wait for toast animation then navigate
    setTimeout(() => {
      clearCart();
      navigate('/order-success');
    }, 2000);
  };

  const steps = [
    { number: 1, title: 'Shipping', icon: FiTruck },
    { number: 2, title: 'Payment', icon: FiCreditCard },
    { number: 3, title: 'Review', icon: FiCheck },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      {/* Confetti Effect */}
      {showSuccessToast && <Confetti />}

      {/* Success Toast */}
      <Toast
        message="🎉 Order Placed Successfully! Redirecting..."
        type="success"
        isVisible={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
      />

      <div className="container-custom max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <FiLock className="w-4 h-4" />
            <p>Your information is safe and secure</p>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-6 h-0.5 bg-gray-200 -z-10">
              <div
                className="h-full bg-primary-600 transition-all duration-500"
                style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>
            
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    activeStep >= step.number
                      ? 'bg-primary-600 text-white'
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}
                >
                  {activeStep > step.number ? (
                    <FiCheck className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <span className="text-sm font-medium text-gray-700 mt-2">{step.title}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              {/* Step 1: Shipping Information */}
              {activeStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                  
                  {/* Saved Addresses */}
                  <SavedAddresses
                    addresses={savedAddresses}
                    onSelectAddress={handleSelectSavedAddress}
                    selectedAddressId={selectedSavedAddressId}
                    onDelete={handleDeleteAddress}
                  />

                  {/* Add New Address or Use Selected */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {selectedSavedAddressId ? 'Edit Address' : 'Add New Address'}
                    </h3>
                  
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        error={errors.firstName}
                        required
                      />
                      <Input
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                        required
                      />
                    </div>

                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                      required
                    />

                    <Input
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={errors.phone}
                      required
                    />

                    <Input
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      error={errors.address}
                      required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        error={errors.city}
                        required
                      />
                      <Input
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        error={errors.state}
                        required
                      />
                      <Input
                        label="ZIP Code"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        error={errors.zipCode}
                        required
                      />
                    </div>

                    {/* Save Address Checkbox */}
                    <div className="flex items-center gap-2 mt-4">
                      <input
                        type="checkbox"
                        id="saveInfo"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <label htmlFor="saveInfo" className="text-sm text-gray-700 cursor-pointer">
                        💾 Save this address for future orders
                      </label>
                    </div>
                  </div>

                  <Button fullWidth size="lg" onClick={handleContinue}>
                    Continue to Payment
                  </Button>
                </motion.div>
              )}

              {/* Step 2: Payment Information */}
              {activeStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>

                  <Input
                    label="Card Number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    error={errors.cardNumber}
                    placeholder="1234 5678 9012 3456"
                    icon={<FiCreditCard />}
                    required
                  />

                  <Input
                    label="Cardholder Name"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    error={errors.cardName}
                    placeholder="John Doe"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      error={errors.expiryDate}
                      placeholder="MM/YY"
                      required
                    />
                    <Input
                      label="CVV"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      error={errors.cvv}
                      placeholder="123"
                      type="password"
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setActiveStep(1)}>
                      Back
                    </Button>
                    <Button fullWidth size="lg" onClick={handleContinue}>
                      Review Order
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review & Place Order */}
              {activeStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>

                  {/* Shipping Info Review */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Shipping Address</h3>
                      <button
                        onClick={() => setActiveStep(1)}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-gray-700">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} {formData.zipCode}<br />
                      {formData.email}<br />
                      {formData.phone}
                    </p>
                  </div>

                  {/* Payment Info Review */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Payment Method</h3>
                      <button
                        onClick={() => setActiveStep(2)}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-gray-700">
                      Card ending in {formData.cardNumber.slice(-4)}<br />
                      {formData.cardName}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-gray-700">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    fullWidth
                    size="lg"
                    onClick={handlePlaceOrder}
                    isLoading={isProcessing}
                    icon={<FiLock />}
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </Button>
                </motion.div>
              )}
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24"
            >
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({cartItems.length} items)</span>
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
                    <span>Tax</span>
                    <span className="font-semibold">{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-2xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="pt-6 border-t border-gray-200 space-y-3">
                  {[
                    '256-bit SSL encryption',
                    'Secure payment processing',
                    '30-day money-back guarantee'
                  ].map((text, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <FiCheck className="w-4 h-4 text-green-600" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
