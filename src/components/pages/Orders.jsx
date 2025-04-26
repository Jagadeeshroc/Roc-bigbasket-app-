import React from 'react';
import { CheckCircleIcon, ShoppingBagIcon, XCircleIcon } from '@heroicons/react/24/solid';

const Orders = () => {
  // Sample order data (replace with actual data from your application)
  const orders = [
    {
      id: '12345',
      date: '2024-07-28',
      total: 75.0,
      status: 'Shipped',
      items: [
        { name: 'Product A', quantity: 2, price: 20.0 },
        { name: 'Product B', quantity: 1, price: 35.0 },
      ],
    },
    {
      id: '67890',
      date: '2024-07-25',
      total: 120.0,
      status: 'Delivered',
      items: [{ name: 'Product C', quantity: 3, price: 40.0 }],
    },
    {
      id: '24680',
      date: '2024-07-20',
      total: 25.0,
      status: 'Cancelled',
      items: [{ name: 'Product D', quantity: 1, price: 25.0 }],
    },
    {
      id: '13579',
      date: '2024-07-18',
      total: 95.5,
      status: 'Out for Delivery',
      items: [
        { name: 'Product E', quantity: 1, price: 45.5 },
        { name: 'Product F', quantity: 1, price: 50.0 },
      ],
    },
  ];

  // Remove the ": string" here
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Shipped':
        return <ShoppingBagIcon className="h-5 w-5 text-blue-500" />;
      case 'Delivered':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'Cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'Out for Delivery':
        return <ShoppingBagIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
          Your Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No orders found.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Order ID: {order.id}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">Date: {order.date}</p>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      Status: {order.status}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Items:
                  </h3>
                  <ul className="space-y-2">
                    {order.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between text-gray-600 dark:text-gray-400"
                      >
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    Total: ₹{order.total.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
