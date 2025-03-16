import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

interface Proptypes {
  img: string;
  title: string;
  desc: string;
  rating: number;
  price: string;
  id: number;
}

const ProductCards: React.FC<Proptypes> = ({ img, title, desc, rating, price, id }) => {
  const { addToCart, addToWishlist, removeFromWishlist } = useCart();
  const [showModal, setShowModal] = useState(false); 
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  const trimmedDesc = desc.length > 100 ? desc.slice(0, 100) + '...' : desc;

  const toggleModal = () => setShowModal(!showModal);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart({
      id,
      img,
      title,
      desc,
      price,
      rating,
      quantity,
    });
  };

  const handleWishlist = () => {
    if (isWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, img, title, desc, price, rating, quantity });
    }
    setIsWishlist(!isWishlist);
  };

  return (
    <div className="flex flex-col justify-between px-4 border border-gray-200 rounded-xl max-w-[300px] h-[400px]">
      <div className="h-[200px] overflow-hidden">
        <Image
          className="object-cover"
          src={img}
          alt={title}
          width={200}
          height={200}
        />
      </div>

      
      <div className="space-y-2 py-2 flex-1">
        <h2 className="text-accent font-medium uppercase">{title}</h2>
        <p className="text-yellow-500">{'⭐'.repeat(Math.floor(rating))}</p>
        <p className="font-bold text-xl">{price}</p>
        <p className="text-gray-500">{trimmedDesc}</p>

        {desc.length > 100 && (
          <button className="text-blue-500 text-sm mt-2" onClick={toggleModal}>
            View More
          </button>
        )}

        <div className="flex items-center mt-2">
          <button onClick={decreaseQuantity} className="px-2 py-1 bg-gray-200 rounded">-</button>
          <span className="mx-2">{quantity}</span>
          <button onClick={increaseQuantity} className="px-2 py-1 bg-gray-200 rounded">+</button>
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add to Cart
        </button>

        <button
          onClick={handleWishlist}
          className={`mt-2 ${isWishlist ? 'text-red-500' : 'text-gray-500'}`}
        >
          {isWishlist ? '❤️ Added to Wishlist' : '♡ Add to Wishlist'}
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-lg w-full">
            <h2 className="text-lg font-semibold">{title}</h2>
            <Image
              className="w-full my-4"
              src={img}
              width={300}
              height={300}
              alt={title}
              style={{height:'200px'}}
            />
            <p className="text-gray-700 mb-4">{desc}</p>
            <p className="font-bold text-xl">{price}</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCards;
