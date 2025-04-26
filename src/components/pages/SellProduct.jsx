import React, {useState} from "react";
import Axios from "axios";
import {useNavigate} from 'react-router-dom';

let sellProduct = () => {
    let navigate = useNavigate();
    let [product, setProduct] = useState({
        productName: '',
        productDescription: '',
        productPrice: 0,
        productImage: '',
        productCategory: '',
        productBrand: '',
        productColor: '',
        productSize: '',
        productQuantity: 0,
        productCondition: 'new',
        productAvailability: 'in stock',
        productReturnPolicy: '30-day returns',
        productShipping: 'Free standard shipping',
        productWarranty: '1 year',
        productDiscount: 0,
        productStock: 0
    });
    
    let [submitted, setSubmitted] = useState(false);
    let [errorMessage, setErrorMessage] = useState('');
    let [isLoading, setIsLoading] = useState(false);

    // changeInput
    let changeInput = (event) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        });
    };

    // changeImage
    let changeImage = async (event) => {
        let imageFile = event.target.files[0];
        if (!imageFile) return;
        
        let reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.addEventListener('load', () => {
            if (reader.result) {
                setProduct({
                    ...product,
                    productImage: reader.result
                });
            } else {
                setErrorMessage('Error uploading image');
            }
        });
    };

    // submitProduct
    let submitProduct = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        
        try {
            let dataURL = `http://127.0.0.1:5000/api/products/`;
            await Axios.post(dataURL, product);
            setSubmitted(true);
            navigate('/admin');
        } catch (err) {
            setErrorMessage(err.response?.data?.message || 'Error creating product');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const categories = [
      'Fruits',
      'Vegetables',
      'Dairy',
      'Meat & Seafood',
      'Bakery',
      'Beverages',
      'Frozen Foods',
      'Snacks',
      'Pantry Essentials',
      'Grains & Pulses',
      'Spices & Condiments',
      'Oils & Ghee',
      'Sweets & Chocolates',
      'Personal Care',
      'Household Supplies',
      'Baby Products',
      'Organic & Health Foods',
      'Ready to Eat',
      'Instant Foods',
      'Pet Care',
      'Cleaning & Laundry',
      'Breakfast & Cereals',
      'Stationery & Office Supplies',
      'Mobile Accessories',
      'Health & Hygiene',
      'Face Masks & Sanitizers',
      'Seasonal Essentials',
      'Kitchen Tools & Utensils',
      'Ice Creams & Desserts',
      'Energy Drinks & Protein Bars','others'
    ];
    
    const conditions = ['new', 'refurbished', 'used'];
    const availabilityOptions = ['in stock', 'out of stock', 'pre-order'];
    const colors = [
      'Red',
      'Green',
      'Blue',
      'Black',
      'White',
      'Yellow',
      'Orange',
      'Purple',
      'Pink',
      'Brown',
      'Gray',
      'Maroon',
      'Navy Blue',
      'Sky Blue',
      'Olive',
      'Beige',
      'Cream',
      'Teal',
      'Turquoise',
      'Lavender',
      'Peach',
      'Mint Green',
      'Coral',
      'Magenta',
      'Gold',
      'Silver',
      'Bronze',
      'Multi-color',
      'Transparent',
    ];
    
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Create New Product
                    </h1>
                    <p className="mt-3 text-xl text-gray-500">
                        Fill in the details below to add a new product to your inventory
                    </p>
                </div>

                {errorMessage && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{errorMessage}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <form onSubmit={submitProduct} className="divide-y divide-gray-200">
                        {/* Basic Information */}
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Basic Information</h3>
                            <p className="mt-1 text-sm text-gray-500">Essential details about your product.</p>
                            
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                                        Product Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="productName"
                                        id="productName"
                                        value={product.productName}
                                        onChange={changeInput}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        required
                                        id="productDescription"
                                        name="productDescription"
                                        rows={3}
                                        value={product.productDescription}
                                        onChange={changeInput}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700">
                                        Category
                                    </label>
                                    <select
                                        required
                                        id="productCategory"
                                        name="productCategory"
                                        value={product.productCategory}
                                        onChange={changeInput}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="productBrand" className="block text-sm font-medium text-gray-700">
                                        Brand
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="productBrand"
                                        id="productBrand"
                                        value={product.productBrand}
                                        onChange={changeInput}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Pricing & Inventory */}
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Pricing & Inventory</h3>
                            <p className="mt-1 text-sm text-gray-500">Set pricing and stock information.</p>
                            
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-2">
                                    <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
                                        Price (₹)
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm p-2">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">₹</span>
                                        </div>
                                        <input
                                            required
                                            type="number"
                                            name="productPrice"
                                            id="productPrice"
                                            min="0"
                                            step="0.01"
                                            value={product.productPrice}
                                            onChange={changeInput}
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="productDiscount" className="block text-sm font-medium text-gray-700">
                                        Discount (%)
                                    </label>
                                    <input
                                        type="number"
                                        name="productDiscount"
                                        id="productDiscount"
                                        min="0"
                                        max="100"
                                        value={product.productDiscount}
                                        onChange={changeInput}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="productStock" className="block text-sm font-medium text-gray-700">
                                        Stock Quantity
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        name="productStock"
                                        id="productStock"
                                        min="0"
                                        value={product.productStock}
                                        onChange={changeInput}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Product Details</h3>
                            <p className="mt-1 text-sm text-gray-500">Additional specifications for your product.</p>
                            
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-2">
                                    <label htmlFor="productColor" className="block text-sm font-medium text-gray-700">
                                        Color
                                    </label>
                                    <select
                                        id="productColor"
                                        name="productColor"
                                        value={product.productColor}
                                        onChange={changeInput}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">Select a color</option>
                                        {colors.map(color => (
                                            <option key={color} value={color}>{color}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="productSize" className="block text-sm font-medium text-gray-700">
                                        Size
                                    </label>
                                    <input
                                        type="text"
                                        name="productSize"
                                        id="productSize"
                                        value={product.productSize}
                                        onChange={changeInput}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="e.g. 3inches, XL, 500ml"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="productCondition" className="block text-sm font-medium text-gray-700">
                                        Condition
                                    </label>
                                    <select
                                        id="productCondition"
                                        name="productCondition"
                                        value={product.productCondition}
                                        onChange={changeInput}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        {conditions.map(condition => (
                                            <option key={condition} value={condition}>{condition}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="productAvailability" className="block text-sm font-medium text-gray-700">
                                        Availability
                                    </label>
                                    <select
                                        id="productAvailability"
                                        name="productAvailability"
                                        value={product.productAvailability}
                                        onChange={changeInput}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        {availabilityOptions.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="productWarranty" className="block text-sm font-medium text-gray-700">
                                        Warranty
                                    </label>
                                    <input
                                        type="text"
                                        name="productWarranty"
                                        id="productWarranty"
                                        value={product.productWarranty}
                                        onChange={changeInput}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shipping & Policies */}
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Shipping & Policies</h3>
                            <p className="mt-1 text-sm text-gray-500">Information about shipping and return policies.</p>
                            
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="productShipping" className="block text-sm font-medium text-gray-700">
                                        Shipping Information
                                    </label>
                                    <input
                                        type="text"
                                        name="productShipping"
                                        id="productShipping"
                                        value={product.productShipping}
                                        onChange={changeInput}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="productReturnPolicy" className="block text-sm font-medium text-gray-700">
                                        Return Policy
                                    </label>
                                    <input
                                        type="text"
                                        name="productReturnPolicy"
                                        id="productReturnPolicy"
                                        value={product.productReturnPolicy}
                                        onChange={changeInput}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Product Image */}
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Product Image</h3>
                            <p className="mt-1 text-sm text-gray-500">Upload a high-quality image of your product.</p>
                            
                            <div className="mt-6">
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        {product.productImage ? (
                                            <div className="flex flex-col items-center">
                                                <img 
                                                    src={product.productImage} 
                                                    alt="Product preview" 
                                                    className="h-32 w-32 object-contain"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setProduct({...product, productImage: ''})}
                                                    className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                >
                                                    Remove Image
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input
                                                            id="file-upload"
                                                            name="file-upload"
                                                            type="file"
                                                            className="sr-only"
                                                            onChange={changeImage}
                                                            accept="image/*"
                                                        />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="button"
                                onClick={() => navigate('/saver')}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating...
                                    </>
                                ) : 'Create Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default sellProduct;