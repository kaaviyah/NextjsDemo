
import Hero from '@/components/Hero';
import './globals.css'

 import NewProducts from '@/components/NewProducts';
import { CartProvider } from '@/context/CartContext';
// import Hero from '@/components/Hero';
export default function Home() {
  return (
    <div>
      <main>
    
       
    
   <Hero/>
        <CartProvider>
        <NewProducts/>
        </CartProvider>
       
       
      </main>
    </div>
  );
}
