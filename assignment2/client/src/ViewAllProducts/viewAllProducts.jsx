import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './viewAllProductsHeader';
import Footer from './viewAllProductsFooter';
import LogoutModal from './logoutModal';
import { FaEye } from 'react-icons/fa';

const ProductLandingPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const itemsPerPage = 3;
  const accountId = localStorage.getItem('accountId');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/products');
        const data = await res.json();
        setProducts(data);
        setCurrentPage(1);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
  }, [searchQuery]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!accountId) return;
      try {
        const res = await fetch(`http://localhost:5000/cart/${accountId}`);
        const data = await res.json();
        setCartItems(data.items || []);
      } catch (err) {
        console.error('Failed to fetch cart items:', err);
      }
    };
    fetchCart();
  }, []);

  const filteredProducts = products.filter(product =>
    searchQuery ? product.category.toLowerCase() === searchQuery.toLowerCase() : true
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      className="min-h-screen bg-gray-100 font-nunito"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/loginimg3.jpg)` }}
    >
      <Header
        categories={[...new Set(products.map(p => p.category))]}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLogoutClick={() => setShowLogoutModal(true)}
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      <div className="bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-2xl mt-6 h-[83vh]">
        <div className="h-full overflow-y-auto rounded-b-2xl px-6">
          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center py-6">
            {paginatedProducts.length ? (
              paginatedProducts.map(product => (
                <div
                  key={product.id}
                  className="w-[440px] h-[660px] flex flex-col bg-white shadow-md rounded-xl \
                            transition-transform transition-shadow duration-500 ease-in-out \
                            hover:scale-105 hover:shadow-2xl opacity-0 animate-fade-in"
                >
                  <div className="h-72 flex justify-center items-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 px-6 py-4 flex flex-col justify-start">
                    <span className="text-gray-400 text-xs uppercase">{product.category}</span>
                    <p className="text-lg font-bold text-black capitalize mt-1 text-left">{product.title}</p>
                    <div className="flex items-center text-left mt-1">
                      <span className="text-yellow-500 text-sm mr-1">★</span>
                      <span className="text-sm font-medium text-gray-700">{product.rating?.rate}</span>
                      <span className="text-sm text-gray-400 ml-1">({product.rating?.count})</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3 text-left">{product.description}</p>

                    <div className="flex items-center justify-between mt-auto pt-6">
                      <p className="text-lg font-semibold text-black">${product.price}</p>
                      <FaEye
                        className="text-xl text-gray-600 hover:text-black cursor-pointer"
                        onClick={() => navigate(`/products/${product.id}`)}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-600 font-nunito">No products found.</p>
            )}
          </main>

          {showLogoutModal && (
            <LogoutModal
              onConfirm={() => {
                setShowLogoutModal(false);
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('accountId');
                navigate('/', { replace: true });
              }}
              onCancel={() => setShowLogoutModal(false)}
            />
          )}

          <div className="flex justify-center gap-4 pb-6">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:opacity-50 font-nunito"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-700 font-semibold mt-2">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:opacity-50 font-nunito"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductLandingPage;
