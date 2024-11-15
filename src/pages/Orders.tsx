// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAuth } from 'react-oidc-context';

// interface Order {
//   orderId: number;
//   customerName: string;
//   status: string;
//   totalAmount: number;
// }

const Orders: React.FC = () => {
  // const [orders, setOrders] = useState<Order[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const auth = useAuth();

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     if (!auth.user?.id_token) return;

  //     try {
  //       const response = await axios.get('http://localhost:5073/api/orders', {
  //         headers: {
  //           Authorization: `Bearer ${auth.user.id_token}`,
  //         },
  //       });
  //       setOrders(response.data);
  //     } catch (err) {
  //       setError('Error loading orders');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrders();
  // }, [auth.user]);

  // if (loading) return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  // if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <>
    </>
    // <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-20">
    //   <h1 className="text-2xl font-semibold text-gray-800 mb-6">Orders List</h1>
    //   {orders.length === 0 ? (
    //     <p className="text-gray-600">No orders found.</p>
    //   ) : (
    //     <ul className="divide-y divide-gray-200">
    //       {orders.map((order) => (
    //         <li key={order.orderId} className="flex justify-between items-center py-4">
    //           <span className="font-semibold">Order #{order.orderId}</span>
    //           <span>{order.customerName}</span>
    //           <span className={`px-2 py-1 rounded ${
    //             order.status === 'Completed' ? 'bg-green-200' : 'bg-yellow-200'
    //           }`}>
    //             {order.status}
    //           </span>
    //           <span className="font-semibold">${order.totalAmount.toFixed(2)}</span>
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
  );
};

export default Orders;
