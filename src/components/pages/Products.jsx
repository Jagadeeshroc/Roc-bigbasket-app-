import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, Loader2, Search, ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import axios from 'axios';
import useCart from '../../hooks/useCart'; 

const Products = ({ initialProducts  }) => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get('http://127.0.0.1:5000/api/products');
        setProducts(data);
        setFilteredProducts(data);
        
        // Extract unique categories from products
        const uniqueCategories = ['all', ...new Set(data.map(product => product.productCategory))];
        setCategories(uniqueCategories);
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
    let filtered = products;
    
    // Filter by category first
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.productCategory === selectedCategory
      );
    }
    
    // Then filter by search query
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(product =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

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
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {/* Category Dropdown */}
        <div className="relative w-65 sm:w-100">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className={cn(
              "flex items-center justify-between w-full px-4 py-2.5",
              "text-sm text-left bg-white border border-gray-300 rounded-lg",
              "hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500",
              "transition-all duration-200"
            )}
          >
            <span>
              {selectedCategory === 'all' 
                ? 'All Categories' 
                : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Dropdown Menu */}
          {isCategoryOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute z-10 mt-1 w-100 bg-lime-100 shadow-lg rounded-lg py-1",
                "border border-gray-200 max-h-60 overflow-auto"
              )}
            >
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsCategoryOpen(false);
                  }}
                  className={cn(
                    "block w-full text-left px-4 py-2 text-sm",
                    "hover:bg-gray-100 transition-colors",
                    selectedCategory === category ? "bg-gray-100 font-medium" : "text-gray-700"
                  )}
                >
                  {category === 'all' 
                    ? 'All Categories' 
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Enhanced Search Bar with Glow Effect */}
        <div className="relative w-65 sm:w-120">
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
                "h-5 w-5 transition-colors duration-200",
                isSearchFocused ? "text-blue-500" : "text-gray-400"
              )} />
            </div>
            <input
              type="text"
              className={cn(
                "block w-full py-2.5 pl-10 pr-4 text-sm",
                "bg-white border border-gray-300 rounded-lg",
                "focus:outline-none focus:ring-2 focus:ring-blue-500",
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
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:!grid-cols-5 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
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
                  <img 
                    src={product.productImage} 
                    className='h-40 w-full object-cover rounded-sm' 
                    alt={product.productName} 
                  />
                </Link>
                <h3 className="text-md font-small text-gray-900 mb-1 mt-2">{product.productName}</h3>
                <p className="text-gray-500">₹{product.productPrice}</p>
                <span className="text-xs text-gray-400 mt-1">
                  {product.productCategory}
                </span>
              </div>
              
              <div className="flex justify-between items-center mt-2">
              <motion.button
    whileTap={{ scale: 0.95 }}
    className="text-sm font-medium text-gray-700 hover:text-blue-500"
    onClick={() => {
      addToCart(product);
      // Optional: Add a toast notification
      alert(`${product.productName} added to cart!`);
    }}
  >
    Add to cart
  </motion.button>
                <Link 
                  to={`/products/${product._id}`} 
                  className="text-gray-400 hover:text-gray-700"
                >
                  <ArrowRight className="h-4 w-4 text-green-900 hover:text-lime-400" />
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;