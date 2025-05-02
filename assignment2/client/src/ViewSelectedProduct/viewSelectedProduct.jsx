import React, { useEffect, useState } from 'react';
import Footer from '../ViewAllProducts/viewAllProductsFooter';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const ViewSelectedProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div
      className="min-h-screen bg-gray-100 font-nunito"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/loginimg3.jpg)` }}
    >
      <div className="bg-white rounded-2xl shadow-lg mx-auto w-full max-w-screen-2xl mt-6 px-6 py-4 h-[95vh]">
        <div className="flex flex-col md:flex-row -mx-4 h-full justify-between">
          <div className="md:w-1/2 px-4 flex flex-col justify-between">
            <div className="h-[760px] rounded-lg bg-gray-300 mb-2">
              <img
                className="w-full h-full object-contain"
                src={product.image}
                alt={product.title}
              />
            </div>
            <div className="flex -mx-2">
              <div className="w-full px-2">
                <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 px-4 flex flex-col justify-start font-nunito text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-gray-600 text-lg mb-2">
                {product.description}
              </p>
            </motion.div>

            <motion.div
              className="flex mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mr-4">
                <span className="font-bold text-gray-700 text-lg">Price:</span>
                <span className="text-gray-600 text-lg"> ${product.price}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700 text-lg">Availability:</span>
                <span className="text-gray-600 text-lg"> In Stock</span>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center mb-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="text-yellow-500 text-sm mr-1 text-lg">★</span>
              <span className="text-sm font-medium text-gray-700 text-lg">{product.rating?.rate}</span>
              <span className="text-sm text-gray-400 ml-1 text-lg">({product.rating?.count})</span>
            </motion.div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Customer Reviews</h3>
              <div className="max-h-64 overflow-y-auto pr-2 space-y-4">
                {[
                  { name: 'Jane D.', comment: 'Absolutely loved it. The quality is fantastic and delivery was super fast!', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
                  { name: 'Ali K.', comment: 'Looks even better in person. Great craftsmanship, worth the price.', avatar: 'https://randomuser.me/api/portraits/men/35.jpg' },
                  { name: 'Mei L.', comment: 'Received as a gift. Loved the packaging and the product was perfect.', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
                  { name: 'Carlos V.', comment: 'Solid build, stylish design. Happy with my purchase.', avatar: 'https://randomuser.me/api/portraits/men/55.jpg' },
                  { name: 'Nina T.', comment: 'Customer service was responsive and helpful. Great experience!', avatar: 'https://randomuser.me/api/portraits/women/32.jpg' },
                  { name: 'Sam Y.', comment: 'Fast shipping and beautiful presentation. Will buy again.', avatar: 'https://randomuser.me/api/portraits/men/48.jpg' },
                ].map((review, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 p-4 rounded-full shadow-sm hover:bg-gray-200 transition duration-300 ease-in-out flex justify-between items-center"
                  >
                    <div className="text-left">
                      <p className="font-semibold text-gray-700">{review.name}</p>
                      <p className="text-gray-700 text-sm mt-1">{review.comment}</p>
                    </div>
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover ml-4"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="mt-auto px-2 pt-4">
                <button
                    className="w-full bg-white text-black py-2 px-4 rounded-full font-bold border border-gray-400 hover:bg-gray-200 transition"
                    onClick={() => navigate('/products')}
                >
                    Back Home
                </button>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default ViewSelectedProduct;
