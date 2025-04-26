import {  Routes, Route } from 'react-router-dom';
import './App.css';
import NavbarHeader from './components/navbar.jsx';
import Orders from './components/pages/Orders.jsx';
import Services from './components/pages/Services.jsx';
import Saver from './components/pages/Saver.jsx';
import Products from './components/pages/Products';
import SellProduct from './components/pages/SellProduct';
import FarmFresh from './components/pages/FarmFresh.jsx';
import ProductDetail from './components/pages/ProductDetails.jsx';
import Categories from './components/pages/Categories.jsx';
import Cart from './components/Cart.jsx'



function App() {
  return (
   <>
    <NavbarHeader />
<main>
  <Routes>
    {/* Home route */}
    <Route path="/" element={<h1>Welcome Home</h1>} />

    {/* Orders page */}
    <Route path="/orders" element={<Orders />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/saver" element={<Saver />} />
    <Route path="/Products" element={<Products />} />
    <Route path="/products/:id" element={<ProductDetail />} />
    <Route path="/sell" element={<SellProduct />} />
    <Route path="/farm fresh" element={<FarmFresh />} />
    <Route path="/categories" element={<Categories />} />
    

    {/* 404 fallback */}
    <Route path="/services" element={<Services/>} />
  </Routes>
</main>
   
   </>
     
   
  );
}

export default App;
