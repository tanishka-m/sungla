import React from "react";
import { Link } from "react-router-dom";
import { useCart } from '../AddCartComponent/cart';
import toast from "react-hot-toast";

function ProductCart(props) {
   const product = props.data;
   const [cart, setCart] = useCart()

   const handleAddToCart = () => {
      const updatedCart = [...cart];
      const existingItemIndex = updatedCart.findIndex(item => item._id === product._id);

      // If the item already exists in the cart, increase the quantity
      if (existingItemIndex !== -1) {
          updatedCart[existingItemIndex].quantity += 1;
      } else {
          // If the item doesn't exist, add it to the cart with quantity 1
          updatedCart.push({ ...product, quantity: 1 });
      }

      // Update the cart state and save to localStorage
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      // Trigger toast to indicate item was added/updated in the cart
      toast.success('Item Added to Cart');
  };

   return (
      <>
         <div className="bg-white p-4 rounded-xl shadow-sm">
            <Link to={`/addcart/${product._id}`}>
               <img src={`./assets/uploads/picons/${product.piconnm}`} alt='' className="w-full h-80 object-cover object-top drop-shadow-[0_80px_30px_#0007]" />
            </Link>
            <h3 className="text-2xl py-3 text-center font-medium">{product.title}</h3>
            <div className="flex justify-between items-center">
               <p>
                  <span className="text-2xl font-medium">{product.price}</span> INR
               </p>
               <img src='./assets/images/addtocart.png' className="w-5" />
               <button className="bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2"
                  onClick={handleAddToCart}
                  >
                  Add To Cart
               </button>
            </div>
         </div>
      </>
   )
}

export default ProductCart;
