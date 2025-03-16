'use client'; // Ensure this is at the top of the file
import React, { useState, useEffect } from 'react';
import ProductCards from './ProductCards'; // Import ProductCards component

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }
  
const NewProducts = () => {
  // State to store the products data
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  // Fetch data from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data); // Store the fetched data in the state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false); // In case of an error, stop the loading spinner
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs once after the initial render

  // If data is still loading, show loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Map through the products array and pass the necessary props to ProductCards */}
        {products.map((product:Product) => (
          <ProductCards
                key={product?.id} // Unique key for each product
                img={product?.image}
                title={product?.title}
                desc={product.description}
                rating={product.rating.rate}
                price={`$${product.price.toFixed(2)}`} 
                id={product?.id}
                       />
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
