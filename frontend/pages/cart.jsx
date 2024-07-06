// pages/cart.js
'use client'
import { useDispatch, useSelector } from 'react-redux';
import { delfromcart, getcart, setCheckout, updateQuantity,  } from '@/redux/features/userSlice';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';



const Cart = ({ cartItems }) => {
    const dispatch = useDispatch();

useEffect(()=>{
    dispatch(getcart({id:'fhfdf'}))
},[])
  const cart = useSelector(state => state.user.cartItems);

  const handleQuantityChange = (itemId, quantity) => {
    dispatch(updateQuantity({ id:itemId, quantity }));
    dispatch(getcart({id:'fhfdf'}))
    
  };

  const handleRemoveItem = (itemId) => {
    dispatch(delfromcart(itemId));
  };
const router = useRouter()
  const handleCheckout = () => {
    // Implement checkout functionality
    dispatch(getcart({id:'fhfdf'}))
    dispatch(setCheckout(cart))
    router.push('/checkout');

  };
  const grandTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
        {cart.map(item => (
          <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-4">
            <img className="w-20 h-20 object-cover mr-4" src={item.imageUrl} alt={item.name} />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">${item.price}</p>
              <div className="flex items-center mt-2">
                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="px-3 py-1 bg-gray-200 rounded">-</button>
                <span className="px-4">{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="px-3 py-1 bg-gray-200 rounded">+</button>
              </div>
            </div>
            <button onClick={() => handleRemoveItem(item.id)} className="px-4 py-2 bg-red-500 text-white rounded">Remove</button>
          </div>
        ))}
        <div className="flex justify-between items-center mt-6">
          <h2 className="text-xl font-semibold">Grand Total: ${grandTotal.toFixed(2)}</h2>
          <button onClick={handleCheckout} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
