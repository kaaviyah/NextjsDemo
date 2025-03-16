// import React, { useState } from 'react';
// import Image from 'next/image';

// interface Proptypes {
//   img: string;
//   title: string;
//   desc: string;
//   rating: number;
//   price: string;
// }

// const ProductCards: React.FC<Proptypes> = ({ img, title, desc, rating, price }) => {
//   const [showModal, setShowModal] = useState(false); // To manage modal visibility

//   // Trim description to a max length (e.g., 100 characters)
//   const trimmedDesc = desc.length > 100 ? desc.slice(0, 100) + '...' : desc;

//   // Toggle modal visibility
//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };

//   return (
//     <div className='flex flex-col justify-between px-4 border border-gray-200 rounded-xl max-w-[400px] h-[400px]'> {/* Fixed height for equal size cards */}
//       {/* Image Section */}
//       <div className="h-[200px] overflow-hidden"> {/* Set fixed height for image */}
//         <Image
//           className='object-cover'  // Ensures image covers the space while maintaining aspect ratio
//           src={img}
//           width={200}
//           height={200}
//           alt={title}
//           style={{width:'140px',height:'auto'}}
//         />
//       </div>

//       {/* Product Info Section */}
//       <div className='space-y-2 py-2 flex-1'> {/* Flex grow to take remaining space */}
//         <h2 className='text-accent font-medium uppercase'>{title}</h2>
//         <p className="text-yellow-500">{'⭐'.repeat(Math.floor(rating))}</p>
//         <p className='font-bold text-xl'>{price}</p>

//         <p className='text-gray-500'>{trimmedDesc}</p>

//         {/* View More Link */}
//         {desc.length > 100 && (
//           <button
//             className='text-blue-500 text-sm mt-2'
//             onClick={toggleModal}
//           >
//             View More
//           </button>
//         )}
//       </div>

//       {/* Modal for Full Description */}
//       {showModal && (
//         <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
//           <div className='bg-white rounded-lg p-4 max-w-lg w-full'>
//             <h2 className='text-lg font-semibold'>{title}</h2>
//             <Image
//               className='w-full h-auto my-4'
//               src={img}
//               width={300}
//               height={300}
//               alt={title}
//               style={{width:'100px'}}
//             />
//             <p className='text-gray-700 mb-4'>{desc}</p>
//             <p className='font-bold text-xl'>{price}</p>

//             {/* Close Button */}
//             <button
//               className='mt-4 bg-red-500 text-white px-4 py-2 rounded-lg'
//               onClick={toggleModal}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductCards;



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
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [quantity, setQuantity] = useState(1); // Quantity state for the product
  const [isWishlist, setIsWishlist] = useState(false); // Wishlist state

  // Trim description to a max length (e.g., 100 characters)
  const trimmedDesc = desc.length > 100 ? desc.slice(0, 100) + '...' : desc;

  // Toggle modal visibility
  const toggleModal = () => setShowModal(!showModal);

  // Handle quantity increase/decrease
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Add to Cart function
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

  // Add/Remove from Wishlist function
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
      {/* Image Section */}
      <div className="h-[200px] overflow-hidden">
        <Image
          className="object-cover"
          src={img}
          alt={title}
          width={200}
          height={200}
        />
      </div>

      {/* Product Info Section */}
      <div className="space-y-2 py-2 flex-1">
        <h2 className="text-accent font-medium uppercase">{title}</h2>
        <p className="text-yellow-500">{'⭐'.repeat(Math.floor(rating))}</p>
        <p className="font-bold text-xl">{price}</p>
        <p className="text-gray-500">{trimmedDesc}</p>

        {/* View More Link */}
        {desc.length > 100 && (
          <button className="text-blue-500 text-sm mt-2" onClick={toggleModal}>
            View More
          </button>
        )}

        {/* Quantity and Add to Cart */}
        <div className="flex items-center mt-2">
          <button onClick={decreaseQuantity} className="px-2 py-1 bg-gray-200 rounded">-</button>
          <span className="mx-2">{quantity}</span>
          <button onClick={increaseQuantity} className="px-2 py-1 bg-gray-200 rounded">+</button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add to Cart
        </button>

        {/* Wishlist Button (Heart Icon) */}
        <button
          onClick={handleWishlist}
          className={`mt-2 ${isWishlist ? 'text-red-500' : 'text-gray-500'}`}
        >
          {isWishlist ? '❤️ Added to Wishlist' : '♡ Add to Wishlist'}
        </button>
      </div>

      {/* Modal for Full Description */}
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

            {/* Close Button */}
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
