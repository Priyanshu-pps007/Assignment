import Link from "next/link";

// components/ProductCard.js
const ProductCard = ({ imageUrl, name, price, id }) => {
    return (
        <Link href={`products/${id}`}>     
         <div className="max-w-xs mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img className="w-full h-48 object-cover" src={imageUrl} alt={name} />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-700">{name}</h3>
          <p className="mt-2 text-gray-500">${price}</p>
        </div>
      </div>
      </Link>

    );
  };
  
  export default ProductCard;
  