import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCart from "../../hooks/useCart"; 
import Products from './Products.jsx';


const Saver = () => {
  const { cart } = useCart();
   
  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <h1 className='text-center text-4xl font-[Bungee_Tint]'>
          <span className="animate-pulse">Discount Sale 70%</span>
        </h1>
        <Link to="/cart" className="relative group">
          <ShoppingCart className="h-8 w-8 transition-transform group-hover:scale-110" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </Link>
      </div>
      <Products />
    </div>
  );
};

export default Saver;