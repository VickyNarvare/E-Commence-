import { useLocalStorage } from './useLocalStorage';

export const useSavedAddresses = () => {
  const [savedAddresses, setSavedAddresses] = useLocalStorage('savedAddresses', []);

  const saveAddress = (address) => {
    const newAddress = {
      id: Date.now().toString(),
      ...address,
      savedAt: new Date().toISOString(),
    };

    // Check if address already exists (avoid duplicates)
    const isDuplicate = savedAddresses.some(
      (addr) =>
        addr.address === address.address &&
        addr.city === address.city &&
        addr.zipCode === address.zipCode
    );

    if (!isDuplicate) {
      setSavedAddresses([newAddress, ...savedAddresses]);
      return newAddress;
    }

    return null;
  };

  const deleteAddress = (addressId) => {
    setSavedAddresses(savedAddresses.filter((addr) => addr.id !== addressId));
  };

  const setDefaultAddress = (addressId) => {
    setSavedAddresses(
      savedAddresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
  };

  const getDefaultAddress = () => {
    return savedAddresses.find((addr) => addr.isDefault) || savedAddresses[0];
  };

  return {
    savedAddresses,
    saveAddress,
    deleteAddress,
    setDefaultAddress,
    getDefaultAddress,
  };
};
