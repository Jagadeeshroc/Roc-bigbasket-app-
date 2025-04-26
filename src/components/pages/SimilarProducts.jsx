import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import axios from 'axios';

const similarProducts = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(`http://127.0.0.1:5000/api/products/category/${props.sameProducts}`);
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [props.sameProducts]);
 
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
    
    <div className="grid grid-cols-2 sm:grid-cols-3 md:!grid-cols-4 gap-4 p-4 m-4">
     
        {products.map(product => (
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
              <Link  to={`/products/${product._id}`} >
              <img src={product.productImage} className='h-25 rounded-sm'/>
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
    
  );
};

export default similarProducts;