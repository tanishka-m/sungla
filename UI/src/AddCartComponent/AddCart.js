import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiUrlProduct } from '../apiUrl';
import { useCart } from '../AddCartComponent/cart';
import toast from "react-hot-toast";

function AddCart() {
   const [cart, setCart] = useCart();
   const [pDetails, setProductDetails] = useState([]); //all product
   const [detail, setDetails] = useState([]); //specific selected product
   const [quantity, setQuantity] = useState(1);
   const { _id } = useParams(); //object destructions
   useEffect(() => {
      axios.get(apiUrlProduct+"fetch").then((response) => {
         setProductDetails(response.data);
      }).catch((error) => {
         console.log(error);
      })
   })

   useEffect(() => {
      setInterval(() => {
      const findDetail = pDetails.filter(product => product._id == _id);
      if (findDetail.length > 0) {
         setDetails(findDetail[0]);
      }
   }, 2)
   })

   //console.log(detail)
   const handleMinusQuantity=()=>{
      setQuantity(quantity-1 < 1?1:quantity-1);
   }
   const handlePlusQuantity=()=>{
      setQuantity(quantity+1);
   }

   // Handle adding product to the cart
   const handleAddToCart = () => {
      const updatedCart = [...cart];
      const existingItemIndex = updatedCart.findIndex(item => item._id === detail._id);

      // If the item already exists in the cart, update the quantity
      if (existingItemIndex !== -1) {
          updatedCart[existingItemIndex].quantity += quantity;
      } else {
          // If item doesn't exist in the cart, add it
          updatedCart.push({ ...detail, quantity });
      }

      // Save the updated cart in localStorage and update the state
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      toast.success('Item Added to Cart');
  };

   return (
      <>
         <section class="banner_main">
            <div id="banner1" >
               <div class="container">
                     <h2 className='text-3xl text-center'>PRODUCT DETAIL</h2>
                     <div className='grid grid-cols-2 gap-5 mt-5'>
                        <div>
                           <img src={`../assets/uploads/picons/${detail.piconnm}`} className='w-full' />
                        </div>
                        <div className='flex flex-col gap-5'>
                           <h1 className='text-4xl uppercase font-bold'>{detail.title}</h1>
                           <p className='font-bold text-3xl'>
                              {detail.price} INR
                           </p>
                           <div className='flex gap-5'>
                              <div className='flex gap-2 justify-center items-center'>
                                 <button className='bg-yellow-500 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center' onClick={handleMinusQuantity}>-</button>
                                 <span className='bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center'>{quantity}</span>
                                 <button className='bg-yellow-500 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center' onClick={handlePlusQuantity}>+</button>
                              </div>
                              <button className='bg-black text-white px-7 py-3 rounded-xl shadow-2xl' onClick={handleAddToCart}>Add To Cart</button>
                           </div>
                           <p>
                              {detail.description}
                           </p>
                        </div>
                     </div>
                  </div>
            </div>
         </section>
      </>
   )
}

export default AddCart;
