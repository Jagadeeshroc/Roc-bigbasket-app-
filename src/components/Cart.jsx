// components/Cart.js
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

const Cart = () => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    cartTotal, 
    itemCount 
  } = useCart();

  const handleQuantityChange = (id, change) => {
    const item = cart.find(i => i._id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart ({itemCount} items)</h1>
      
      {cart.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-5xl mb-4">🛒</div>
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <Link 
            to="/saver" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map(item => (
              <motion.div
                key={`${item._id}-${item.quantity}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg shadow-sm bg-white h-55 sm-h-10"
              >
                <img 
                  src={item.productImage} 
                  alt={item.productName} 
                  className="w-55 sm:w-25 h-25 rounded-md"
                />
                
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{item.productName}</h3>
                  <p className="text-gray-600">₹{item.productPrice.toFixed(2)}</p>
                  
                  <div className="mt-1 flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <button 
                        onClick={() => handleQuantityChange(item._id, -1)}
                        className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-3 text-center min-w-[30px]">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => handleQuantityChange(item._id, 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                    <div className="text-right ">
                  <p className="font-bold text-sm">
                    ₹{(item.productPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
                  </div>
                </div>
                
                
              </motion.div>
            ))}
            
            <div className="flex justify-end mt-4">
              <button 
                onClick={clearCart}
                className="text-red-500 hover:text-red-700"
              >
                Clear Cart
              </button>
            </div>
          </div>
          
          <div className="border rounded-lg p-6 h-fit sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal ({itemCount} items)</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
              Proceed to Checkout
            </button>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              or <Link to="/" className="text-blue-500 hover:underline">Continue Shopping</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;