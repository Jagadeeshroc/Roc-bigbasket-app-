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
import LoginPage from './components/LoginPage.jsx';
import RegisterPage from './components/RegisterPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';




function App() {
  return (
   <>
    <NavbarHeader />
<main>
  <Routes>
  <Route path="/" element={<h1>Welcome Home</h1>} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />

  {/* Protected Routes */}
  <Route path="/orders" element={
    <ProtectedRoute><Orders /></ProtectedRoute>
  } />
  <Route path="/cart" element={
    <ProtectedRoute><Cart /></ProtectedRoute>
  } />
  <Route path="/sell" element={
    <ProtectedRoute><SellProduct /></ProtectedRoute>
  } />

  {/* Public routes */}
  <Route path="/saver" element={<Saver />} />
  <Route path="/Products" element={<Products />} />
  <Route path="/products/:id" element={<ProductDetail />} />
  <Route path="/farm fresh" element={<FarmFresh />} />
  <Route path="/categories" element={<Categories />} />
  <Route path="/services" element={<Services />} />

  {/* 404 fallback */}
  <Route path="*" element={<h1>404 Not Found</h1>} />
</Routes>
</main>
   
   </>
     
   
  );
}

export default App;
