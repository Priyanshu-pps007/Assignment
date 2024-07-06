import { getItems } from "@/redux/api";
import ProductCard from "./ProductCard";

const Home = ({products}) => {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mt-20">
          {products?.map((product) => {
            console.log(product)
           return  <ProductCard
              key={product.id}
              id={product.id}
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
            />
})}
        </div>
      </div>
    );
  };
  
  
  export default Home;