'use client';
import React, { useState, useEffect } from 'react';
import ProductCards from './ProductCards';

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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product:Product) => (
          <ProductCards
                key={product?.id}
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
