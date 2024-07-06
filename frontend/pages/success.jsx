// pages/success.js
import { useRouter } from 'next/router';

const Success = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold mb-8">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-8">Thank you for your purchase. Your order is being processed.</p>
        <button onClick={() => router.push('/')} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500">Go to Home</button>
      </div>
    </div>
  );
};

export default Success;
