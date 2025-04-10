import {useState,useEffect} from 'react';
import axios from 'axios';
import {apiUrlProduct} from '../apiUrl';
import ProductCart from './productCart';


function UserHome() {
   const [pDetails,setProductDetails]=useState([]);

   useEffect(()=>{
      axios.get(apiUrlProduct+"fetch").then((response)=>{
         setProductDetails(response.data);
      }).catch((error)=>{
        console.log(error);
      })
  },[])

   return (
      <>
         <section class="banner_main">
            <div id="banner1" >
               <div class="container">
                  <div class="text">
                     <h1 className='text-3xl my-5'>List Products</h1>
                     <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5'>
                        {
                           pDetails.map((row,key)=>(
                             <ProductCart key={key} data={row}/>
                            ))
                        }
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}

export default UserHome;

