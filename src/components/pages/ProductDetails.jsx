import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Loader2, ArrowLeft, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import SimilarProducts from './SimilarProducts';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://127.0.0.1:5000/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500">
        <p>{error}</p>
        <Link to="/" className="mt-4 text-blue-500 hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Link to="/saver" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="mr-2" /> Back to products
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className=" rounded-lg overflow-hidden">
            <img 
              src={product.productImage} 
              alt={product.productName}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.productName}</h1>
            <p className="text-2xl text-gray-800 mb-4">₹{product.productPrice}</p>
            
            <div className="mb-6">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {product.productCategory}
              </span>
              <span className="text-gray-600">Rating: {product.productRating}/5</span>
            </div>

            <p className="text-gray-700 mb-6">{product.productDescription}</p>

            <div className="flex items-center space-x-4 mb-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center">
                <ShoppingCart className="mr-2" /> Add to Cart
              </button>
              <span className="text-gray-600">In Stock: {product.productStock}</span>
            </div>

            {/* Additional Info Button */}
            <button 
              onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              {showAdditionalInfo ? (
                <>
                  <ChevronUp className="mr-1" /> Hide Additional Information
                </>
              ) : (
                <>
                  <ChevronDown className="mr-1" /> Show Additional Information
                </>
              )}
            </button>

            {/* Additional Info Content */}
            {showAdditionalInfo && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Product Details</h3>
                <ul className="space-y-2">
                  {/* Add any additional product information you have */}
                  <li><span className="font-medium">Brand:</span> {product.productBrand || 'N/A'}</li>
                  <li><span className="font-medium">Weight: </span> {product.productQuantity || 'N/A'}</li>
                  <li><span className="font-medium">Size:</span> {product.productSize || 'N/A'}</li>
                <li><span className="font-medium">Colour:{product.productColor}</span> {product.productColor || 'N/A'}</li>
                  <li><span className="font-medium">Warranty :</span> {product.productWarranty || 'N/A'}</li>
                  <li><span className="font-medium">Availability :</span> {product.productAvailability || 'N/A'}</li>
                  <li><span className="font-medium"> Return Policy: </span> {product.productReturnPolicy || 'N/A'}</li>
                  <li><span className="font-medium">Condition : </span> {product.productCondition}</li>
                  {/* Add more fields as needed */}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <SimilarProducts sameProducts={product.productCategory}/>
    </>
  );
};

export default ProductDetail;