// src/pages/LoginPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaLock, 
  FaEnvelope, 
  FaSpinner, 
  FaSignInAlt, 
  FaShoppingCart, 
  FaGift, 
  FaStar, 
  FaTags,
  FaPercentage 
} from 'react-icons/fa';
import { TbPassword } from "react-icons/tb";
import { RiShieldUserLine, RiCouponLine } from 'react-icons/ri';
import { useSpring, animated, config } from '@react-spring/web';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [hoverState, setHoverState] = useState({
    email: false,
    password: false,
    button: false
  });
  const [showSpecialOffer, setShowSpecialOffer] = useState(false);
  const navigate = useNavigate();

  // 3D tilt animation for the form container
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: config.molasses
  }));

  // Background gradient animation - fixed style properties
  const [gradientPos, setGradientPos] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPos((prev) => (prev + 0.005) % 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Show special offer after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpecialOffer(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);
      
      // Generate a random discount coupon on successful login
      const couponCode = `SHOP${Math.floor(1000 + Math.random() * 9000)}`;
      localStorage.setItem('coupon', couponCode);
      
      // Success animation before navigation
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/saver');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setIsLoading(false);
    }
  };

  // Icons with different animations
  const icons = {
    email: <FaEnvelope className="inline mr-2" />,
    password: <TbPassword className="inline mr-2" />,
    user: <FaUser className="inline mr-2" />,
    lock: <FaLock className="inline mr-2" />,
    shield: <RiShieldUserLine className="inline mr-2" />,
    login: <FaSignInAlt className="inline mr-2" />,
    cart: <FaShoppingCart className="inline mr-2" />,
    gift: <FaGift className="inline mr-2" />,
    star: <FaStar className="inline mr-2" />,
    tags: <FaTags className="inline mr-2" />,
    discount: <FaPercentage className="inline mr-2" />,
    coupon: <RiCouponLine className="inline mr-2" />
  };

  // Featured products carousel
  const featuredProducts = [
    { id: 1, name: "Wireless Earbuds", price: "$79.99", discount: "20% OFF" },
    { id: 2, name: "Smart Watch", price: "$199.99", discount: "15% OFF" },
    { id: 3, name: "VR Headset", price: "$299.99", discount: "30% OFF" },
    { id: 4, name: "Bluetooth Speaker", price: "$59.99", discount: "10% OFF" }
  ];

  // Fixed background style to avoid property conflicts
  const backgroundStyle = {
    backgroundImage: `linear-gradient(${gradientPos * 360}deg, #6366f1, #8b5cf6, #ec4899, #f59e0b, #6366f1)`,
    backgroundSize: '400% 400%',
    transition: 'background-image 0.5s ease'
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={backgroundStyle}
    >
      <animated.div
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: [
          -(y - window.innerHeight / 2) / 50,
          (x - window.innerWidth / 2) / 50,
          1.05
        ]})}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{
          transform: props.xys.to((x, y, s) => `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`)
        }}
        className="w-full max-w-4xl flex gap-8"
      >
        {/* Shopping Info Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: 'spring', delay: 0.2 }}
          className="hidden md:block w-1/2 bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden p-8"
        >
          <div className="text-center mb-8">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 3 
              }}
              className="inline-block mb-4"
            >
              <FaShoppingCart className="text-5xl text-indigo-600" />
            </motion.div>
            <motion.h2 
              className="text-3xl font-bold text-gray-800 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to ShopSphere
            </motion.h2>
            <motion.p 
              className="text-gray-600 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Your premier destination for the latest gadgets and tech
            </motion.p>
          </div>

          {/* Special Offer */}
          <AnimatePresence>
            {showSpecialOffer && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl mb-8 shadow-lg"
              >
                <div className="flex items-center mb-2">
                  <FaGift className="text-2xl mr-2" />
                  <h3 className="text-xl font-bold">Exclusive Member Offer!</h3>
                </div>
                <p className="mb-4">Login today and get 15% off your first purchase plus free shipping!</p>
                <div className="flex items-center">
                  <RiCouponLine className="text-xl mr-2" />
                  <span className="font-mono bg-white/20 px-2 py-1 rounded">WELCOME15</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Featured Products Carousel */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              {icons.star} Today's Hot Deals
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/80 p-4 rounded-lg border border-gray-200 shadow-sm cursor-pointer"
                >
                  <div className="h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded mb-2 flex items-center justify-center">
                    <FaGift className="text-3xl text-indigo-500" />
                  </div>
                  <h4 className="font-medium text-gray-800">{product.name}</h4>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-indigo-600 font-bold">{product.price}</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {product.discount}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Member Benefits */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              {icons.tags} Member Benefits
            </h3>
            <ul className="space-y-2">
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <FaStar className="text-yellow-500 mr-2" />
                <span>Exclusive discounts and early access to sales</span>
              </motion.li>
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <RiCouponLine className="text-purple-500 mr-2" />
                <span>Personalized coupon codes</span>
              </motion.li>
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <FaGift className="text-red-500 mr-2" />
                <span>Birthday rewards and special offers</span>
              </motion.li>
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                <FaPercentage className="text-green-500 mr-2" />
                <span>Free shipping on all orders over $50</span>
              </motion.li>
            </ul>
          </div>
        </motion.div>

        {/* Login Form */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="w-full md:w-1/2 bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden p-8"
        >
          <div className="text-center mb-8">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 3 
              }}
              className="inline-block mb-4"
            >
              <RiShieldUserLine className="text-5xl text-indigo-600" />
            </motion.div>
            <motion.h2 
              className="text-3xl font-bold text-gray-800 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Member Login
            </motion.h2>
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Sign in to access exclusive deals and your shopping profile
            </motion.p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin}>
            <motion.div 
              className="mb-6 relative"
              animate={{
                y: activeField === 'email' ? -5 : 0,
                borderColor: activeField === 'email' ? '#6366f1' : hoverState.email ? '#a5b4fc' : '#e5e7eb'
              }}
              transition={{ type: 'spring', stiffness: 500 }}
              onMouseEnter={() => setHoverState({...hoverState, email: true})}
              onMouseLeave={() => setHoverState({...hoverState, email: false})}
            >
              <motion.label 
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
                animate={{
                  color: activeField === 'email' ? '#6366f1' : '#374151',
                  x: activeField === 'email' ? 5 : 0
                }}
              >
                {icons.email} Email Address
              </motion.label>
              <motion.input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setActiveField('email')}
                onBlur={() => setActiveField(null)}
                className="w-full px-4 py-3 rounded-lg border-2 bg-white/70 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                animate={{
                  paddingLeft: activeField === 'email' ? '1.5rem' : '1rem'
                }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: activeField === 'email' ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div 
              className="mb-8 relative"
              animate={{
                y: activeField === 'password' ? -5 : 0,
                borderColor: activeField === 'password' ? '#6366f1' : hoverState.password ? '#a5b4fc' : '#e5e7eb'
              }}
              transition={{ type: 'spring', stiffness: 500 }}
              onMouseEnter={() => setHoverState({...hoverState, password: true})}
              onMouseLeave={() => setHoverState({...hoverState, password: false})}
            >
              <motion.label 
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
                animate={{
                  color: activeField === 'password' ? '#6366f1' : '#374151',
                  x: activeField === 'password' ? 5 : 0
                }}
              >
                {icons.lock} Password
              </motion.label>
              <motion.input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setActiveField('password')}
                onBlur={() => setActiveField(null)}
                className="w-full px-4 py-3 rounded-lg border-2 bg-white/70 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                animate={{
                  paddingLeft: activeField === 'password' ? '1.5rem' : '1rem'
                }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: activeField === 'password' ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-lg relative overflow-hidden ${isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
              whileHover={{ scale: isLoading ? 1 : 1.03 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              onMouseEnter={() => setHoverState({...hoverState, button: true})}
              onMouseLeave={() => setHoverState({...hoverState, button: false})}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <FaSpinner className="inline mr-2" />
                  Authenticating...
                </motion.div>
              ) : (
                <>
                  {icons.login} Sign In & Shop Now
                  <motion.span 
                    className="absolute inset-0 bg-white opacity-0 hover:opacity-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoverState.button ? 0.1 : 0 }}
                  />
                </>
              )}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-300"
                initial={{ width: 0 }}
                animate={{ width: isLoading ? '100%' : 0 }}
                transition={{ duration: 2, repeat: isLoading ? Infinity : 0 }}
              />
            </motion.button>
          </form>

          <motion.div 
            className="mt-6 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p>
              New to ShopSphere?{' '}
              <motion.a 
                href="/register" 
                className="text-indigo-600 hover:underline font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create an account
              </motion.a>
            </p>
          </motion.div>
        </motion.div>

        {/* Floating animated elements in background */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, Math.random() * 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        ))}
      </animated.div>
    </div>
  );
};

export default LoginPage;