import React from 'react' //rfc -short abbrevation to get react functional component
import { apiUrlUser, apiUrlProduct } from '../apiUrl';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from './cart';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import DropIn from "braintree-web-drop-in-react";

export default function CartPage() {
   const navigate = useNavigate();
   const [name, setName] = useState();
   const [cart, setCart] = useCart();
   const [clientToken, setClientToken] = useState("");
   const [instance, setinstance] = useState("");
   let id = localStorage.getItem('_id');

   useEffect(() => {
      axios.get(apiUrlUser + "fetch?email=" + localStorage.getItem('email')).then((response) => {
         var userDetails = response.data.userList[0];
         setName(userDetails.name);
      })
   }, []);

   //delete item
   const removeCartItem = (pid) => {
      try {
         let myCart = [...cart];
         let index = myCart.findIndex(item => item._id === pid);
         myCart.splice(index, 1);
         setCart(myCart);
         localStorage.setItem('cart', JSON.stringify(myCart));
      } catch (error) {
         console.log(error);
      }
   }

   //total Price
   const totalPrice = () => {
      try {
         let total = 0;
         cart?.map((item) => {
            total = total + item.price * item.quantity;
         });
         return total.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
         });
      } catch (error) {
         console.log(error);
      }
   }

   //get payment gateway token
   const getToken = async () => {
      try {
         const { data } = await axios.get(apiUrlProduct + "braintree/token");
         //console.log(data)
         setClientToken(data?.clientToken);
      } catch (error) {
         console.log(error);
      }
   }
   useEffect(() => {
      getToken();
   });

   //handle payments
   const handlePayment = async () => {
      try {
         const { nonce } = await instance.requestPaymentMethod();
         const { data } = await axios.post(apiUrlProduct + "braintree/payment", {
            nonce, cart,
            userId: id, // Pass the user ID
         })
         localStorage.removeItem('cart');
         setCart([]);
         navigate('/user');
         toast.success('Payment Completed Successfully');
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <section class="banner_main">
         <div id="banner1" >
            <div class="container">
               <h1 className='text-center p-2 mb-1'>Hello {name}</h1>
               <h4 className='text-center'>
                  {cart?.length ? `You Have ${cart.length} items in your cart` : "Your Cart Is Empty"}
               </h4><br />
               <div className='row'>
                  <div className='col-md-8'>
                     {cart?.map((p) => (
                        <div className='row mb-2 p-1 card flex-row border-1 border-gray-300 rounded-lg'>
                           <div className='col-md-4'>
                              <img src={`./assets/uploads/picons/${p.piconnm}`} alt={p.title} className="w-full h-60 object-cover object-top drop-shadow-[0_80px_30px_#000]" />
                           </div>
                           <div className='col-md-8'>
                              <p>{p.title}</p>
                              <p>{p.description}</p>
                              <p>Price : {p.price} /per</p>
                              <p>Quantity : {p.quantity}</p>
                              <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className='col-md-4 text-center'>
                     <h2>Cart Summary</h2>
                     <p>Total | Checkout | Payment</p><hr />
                     <h4>Total : {totalPrice()}</h4>
                  </div>
                  <div className='mt-2'>
                     {
                        !clientToken || !cart?.length ? ("") : (
                           <>
                              <DropIn
                                 options={{
                                    authorization: clientToken,
                                    paypal: {
                                       flow: 'vault',
                                    },
                                 }}
                                 onInstance={(instance) => setinstance(instance)}
                              />
                              <button className='btn btn-primary'
                                 onClick={handlePayment}>Make Payment</button>
                           </>
                        )
                     }
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
