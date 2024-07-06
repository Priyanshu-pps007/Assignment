import { getUserDetails, getcart } from '@/redux/features/userSlice';
import Link from 'next/link';
import { useEffect } from 'react';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getcart())
        dispatch(getUserDetails({id:'533dcssg'}))
    },[])
  const user = useSelector((state) => state.user.userInfo);
  const cartItems = useSelector((state) => state.user.cartItems);

  return (
    <nav className=" fixed top-0 left-0 w-full z-50 bg-white text-blue p-4" style={{ boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -2px rgba(59, 130, 246, 0.1)' }}>
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <span className="text-xl font-bold">MyShop</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <span className="relative">
              <FaShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-1 inline-block w-2 h-2 transform translate-x-1 -translate-y-1 text-red font-bold" >2</span>
              )}
            </span>
          </Link>
          <div className="flex items-center space-x-2">
            <FaUserCircle size={24} />
            <span>{user.name}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
