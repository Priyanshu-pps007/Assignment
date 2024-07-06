// pages/checkout.js
'use client'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getcart } from '@/redux/features/userSlice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export async function getServerSideProps() {
  // Fetch data from an API or database, if necessary
  // In this example, we're assuming items items are already available in the Redux store
  return {
    props: {},
  };
}

const Checkout = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(()=>{
        dispatch(getcart({id:'fbd'}))
    },[])
  const items = useSelector(state => state.user.itemsBuy);

  const handleCheckout = async () => {
    try {
      // Implement your checkout API call here
      // For example: await api.checkout(items);

      // Clear the items after successful checkout
      dispatch(clearCart());

      // Redirect to a success page or display a success message
      alert('Checkout successful!');
      router.push('/success'); // Redirect to a success page (create a success.js page)
    } catch (error) {
      alert('Checkout failed!');
    }
  };
  const grandTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between border-b border-gray-300 py-4">
            <img className="w-24 h-24 object-cover mr-4" src={item.imageUrl} alt={item.name} />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-500">${item.price}</p>
              <p className="text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <p className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <div className="flex justify-between items-center mt-8">
          <h2 className="text-2xl font-bold">Grand Total: ${grandTotal.toFixed(2)}</h2>
          <button onClick={handleCheckout} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500">Confirm and Pay</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
