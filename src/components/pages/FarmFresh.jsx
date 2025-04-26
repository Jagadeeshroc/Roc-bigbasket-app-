import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, Loader2, Search } from 'lucide-react'; // Added Search icon here
import { cn } from "@/lib/utils";
import axios from 'axios';

const FarmFresh = () => {  // Changed function name to start with capital letter
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get('http://127.0.0.1:5000/api/products/category/vegetables,fruits');
        setProducts(data);
        setFilteredProducts(data); // Initialize filteredProducts with data
      } catch (err) {
        console.error(err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);
 
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
    hover: { scale: 1.03 },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-gray-500 dark:text-gray-400" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 dark:text-red-400">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <div className="relative mb-8 max-w-md ml-auto mt-5">
        <motion.div
          initial={false}
          animate={{
            boxShadow: isSearchFocused 
              ? '0 0 0 3px rgba(59, 130, 246, 0.5)' 
              : 'none',
          }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute inset-0 rounded-lg pointer-events-none",
            "transition-all duration-200",
            isSearchFocused ? "bg-blue-100/30" : "bg-transparent"
          )}
        />
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={cn(
              "h-5 w-5 transition-colors duration-200 ",
              isSearchFocused ? "text-blue-500" : "text-gray-400"
            )} />
          </div>
          <input
            type="text"
            className={cn(
              "block w-full py-2.5 pl-10 pr-4 text-sm ",
              "bg-white border border-gray-300 rounded-lg",
              "focus:outline-none focus:ring-2 focus:ring-lime-500",
              "transition-all duration-200",
              "placeholder-gray-400 text-gray-900",
              "shadow-sm hover:border-gray-400"
            )}
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>
      </div>

      <div>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="bg-gradient-to-br from-green-100 to-lime-200 dark:from-green-800 dark:to-lime-700 p-6 rounded-2xl shadow-xl text-center mb-6 mx-4"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 dark:text-lime-200 mb-3">
            Welcome to Farm Fresh!
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-100 max-w-2xl mx-auto">
            Sourced directly from local farms, our fruits and vegetables are grown with care,
            harvested at peak freshness, and delivered straight to your doorstep. Experience the
            true taste of nature — pure, organic, and full of life.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Link to="/about" className="bg-lime-600 text-white px-5 py-2 rounded-full hover:bg-lime-700 transition">
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:!grid-cols-4 gap-4 p-4 m-4">
        {filteredProducts.map(product => (  // Changed from products to filteredProducts
          <motion.div
            key={product._id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className={cn(
              'p-3 rounded-lg border border-gray-200',
              'flex flex-col justify-between',
              'transition-all duration-300 hover:shadow-md'
            )}
          >
            <div className="flex flex-col">
              <Link to={`/products/${product._id}`}>
                <img src={product.productImage} className='h-25 rounded-sm' alt={product.productName} />
              </Link>
              <h3 className="text-sm font-small text-gray-900 mb-1">{product.productName}</h3>
              <p className="text-gray-500">₹{product.productPrice}</p>
            </div>
            
            <div className="flex justify-between items-center">
              <button 
                className="text-sm font-medium text-gray-700 hover:text-blue-500"
                onClick={() => {/* add to cart */}}
              >
                Add to cart
              </button>
              <Link 
                to={`/products/${product._id}`} 
                className="text-gray-400 hover:text-gray-700"
              >
                <ArrowRight className="h-4 w-4 text-green-900 hover:text-lime-400" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default FarmFresh;  // Changed export to match component name