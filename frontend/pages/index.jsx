import Home from "@/components/Home";
import { getItems } from "@/redux/api";

// This function runs on the server-side
export async function getServerSideProps() {
  try {
    // Fetch data from an API or database
    const response = await getItems();
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    const products = response.data;
    // Pass data to the page component as props
    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        products: [],
      },
    };
  }
}

// Main page component
export default function CartPage({ products }) {
  return (
    <Home products={products} />
  );
}
