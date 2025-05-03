import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../ViewAllProducts/viewAllProductsFooter';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({});
  const accountId = localStorage.getItem('accountId');
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    if (!accountId) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/cart/${accountId}`);
      const data = await res.json();
      setCartItems(data.items);
    } catch (err) {
      console.error('Failed to fetch cart', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDetails = async (productId) => {
    try {
      const res = await fetch(`http://localhost:5000/products/${productId}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Failed to fetch product details for', productId);
      return null;
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const fetchAllProductDetails = async () => {
      const details = {};
      for (const item of cartItems) {
        if (!productDetails[item.productId]) {
          const data = await fetchProductDetails(item.productId);
          if (data) details[item.productId] = data;
        }
      }
      setProductDetails(prev => ({ ...prev, ...details }));
    };
    if (cartItems.length > 0) fetchAllProductDetails();
  }, [cartItems]);

  useEffect(() => {
    const totalAmount = cartItems.reduce((sum, item) => {
      const price = productDetails[item.productId]?.price || 0;
      return sum + price * item.quantity;
    }, 0);
    setTotal(totalAmount);
  }, [cartItems, productDetails]);

  const addToCart = async (productId) => {
    try {
      const res = await fetch('http://localhost:5000/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId, productId })
      });
      if (!res.ok) throw new Error('Failed to add item to cart');
      toast.success(`Successfully added`);
      fetchCart();
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch('http://localhost:5000/cart/remove', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId, productId })
      });
      if (!res.ok) throw new Error('Failed to remove item from cart');
      toast.success(`Successfully reduced`);
      fetchCart();
    } catch (err) {
      console.error('Error removing from cart:', err);
    }
  };

  const handleQuantityChange = (index, delta) => {
    const productId = cartItems[index].productId;
    if (delta > 0) {
      addToCart(productId);
    } else {
      removeFromCart(productId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-nunito py-10 px-4 md:px-8" 
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/loginimg3.jpg)` }}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white w-[90%] min-h-[850px] mx-auto rounded-2xl shadow-lg p-10 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Your Shopping Cart</h2>
              <FaSignOutAlt
                className="text-2xl text-gray-600 hover:text-black cursor-pointer"
                onClick={() => navigate('/products')}
              />
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-[400px]">
                <motion.div
                  className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            ) : cartItems.length === 0 ? (
              <p className="text-gray-500 text-center">Your cart is empty.</p>
            ) : (
              <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                {cartItems.map((item, index) => {
                  const details = productDetails[item.productId];
                  return (
                    <div
                      key={item.productId}
                      className="grid grid-cols-[1fr_120px_140px] items-center bg-gray-50 p-4 rounded-full shadow-sm hover:bg-gray-100 transition duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={details?.image}
                          alt={details?.title}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <p className="font-semibold text-lg text-gray-800">{details?.title || 'Product name'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 text-left">${details?.price?.toFixed(2) || '0.00'} each</p>
                      </div>
                      <div className="flex items-center space-x-2 justify-self-end">
                        <button onClick={() => handleQuantityChange(index, -1)} className="bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300">-</button>
                        <span className="text-gray-800 font-medium">{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(index, 1)} className="bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300">+</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {!loading && cartItems.length > 0 && (
            <div className="text-right text-2xl font-bold text-gray-800 mt-6">
              Total: ${total.toFixed(2)}
            </div>
          )}
        </div>
      </motion.div>
      <Footer/>
      <ToastContainer/>
    </div>
  );
};

export default ShoppingCart;
