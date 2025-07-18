import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Advertisement Card Component
const AdCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.03 }}
    >
      <div className="h-40 bg-gradient-to-r from-purple-400 to-blue-500 relative overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
          }}
        />
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          Hot Deal!
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{item.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-green-600 font-bold">${item.price}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            Shop Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [adItems, setAdItems] = useState([]);
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();

  // Reliable mock data with fallback images
  useEffect(() => {
    const mockAdItems = [
      {
        id: 1,
        name: 'Wireless Headphones',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: 2,
        name: 'Smart Watch',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: 3,
        name: 'Bluetooth Speaker',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      },
    ];
    setAdItems(mockAdItems);
  }, []);

  const handleImageUpload = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    setAvatar(reader.result); // base64 string
  };
  if (file) {
    reader.readAsDataURL(file);
  }
};


  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password, avatar });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-row lg:flex-row">
      {/* Left side - Registration Form */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 p-8 flex items-center justify-center"
      >
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl mr-3"
            >
              🛒
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              Join Our Shop
            </h1>
          </div>

          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 mb-4 text-center"
              >
                {error}
              </motion.p>
            )}
            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Profile Picture</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    </div>
                    {avatar && (
                    <img
                        src={avatar}
                        alt="Preview"
                        className="w-20 h-20 rounded-full object-cover mx-auto my-2 shadow"
                    />
                    )}


              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Full Name</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Password</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password (min 6 characters)"
                  minLength="6"
                  required
                  autoComplete="current-password"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white p-3 rounded-lg font-semibold text-lg shadow-lg"
              >
                Register Now
              </motion.button>
            </form>
            <p className="text-center mt-4 text-gray-600">
              Already have an account?{' '}
              <motion.a
                href="/login"
                className="text-blue-600 hover:underline"
                whileHover={{ scale: 1.05 }}
              >
                Sign in
              </motion.a>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right side - Advertisements */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-50 to-green-50 p-8 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            🔥 Today's Hot Deals 🔥
          </motion.span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adItems.map((item, index) => (
            <AdCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="mt-8 p-6 bg-white rounded-xl shadow-lg flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <h3 className="text-xl font-bold mb-4">Why Register With Us?</h3>
            <ul className="space-y-3 text-left">
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center"
              >
                <span className="mr-2 text-green-500">✓</span> Exclusive member discounts
              </motion.li>
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center"
              >
                <span className="mr-2 text-green-500">✓</span> Early access to sales
              </motion.li>
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center"
              >
                <span className="mr-2 text-green-500">✓</span> Personalized recommendations
              </motion.li>
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center"
              >
                <span className="mr-2 text-green-500">✓</span> Faster checkout process
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;