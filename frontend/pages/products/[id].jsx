import { useState } from 'react';
import { particularprod } from "@/redux/api";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addtocart, setCheckout } from '@/redux/features/userSlice';

export async function getServerSideProps({ params }) {
  const { id } = params;
  const formData = {
    id
  }
  const response = await particularprod(formData);
  const product = response.data;

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();

  const goToHome = () => {
    router.push('/');
  };
  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalAmount = (product.price * quantity).toFixed(2);
  const handleCheckout = () => {
    dispatch(setCheckout([{...product, quantity}]))
    alert(`Proceeding to checkout with ${quantity} of ${product.name}. Total: $${totalAmount}`);
    router.push('/checkout')
    // Implement checkout functionality here
  };
  const addToCart = () => {
    dispatch(addtocart({ ...product, quantity }));
    alert(`${quantity} of ${product.name} added to cart.`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 mt-5">
      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-4xl w-full">
        <div className="flex">
          <img className="w-1/2 object-cover" src={product.imageUrl} alt={product.name} />
          <div className="p-6 w-1/2 flex flex-col">
            <h1 className="text-2xl font-semibold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-6">${product.price}</p>
            <p className="text-gray-600 mb-6">Some more details about the product...</p>
            <div className="flex items-center mb-6">
              <button onClick={decrementQuantity} className="px-3 py-1 bg-gray-200 rounded">-</button>
              <span className="px-4">{quantity}</span>
              <button onClick={incrementQuantity} className="px-3 py-1 bg-gray-200 rounded">+</button>
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-semibold">Total: ${totalAmount}</span>
              <button onClick={handleCheckout} className="px-4 py-2 bg-blue-500 text-white rounded">Proceed to Checkout</button>
            </div>
            <button onClick={addToCart} className="px-4 py-2 bg-green-500 text-white rounded mb-4">Add to Cart</button>

            <button onClick={goToHome} className="px-4 py-2 bg-gray-500 text-white rounded">Back to Home</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
