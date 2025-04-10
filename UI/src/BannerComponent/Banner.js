import './Banner.css';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function Banner() {
   const [BannerContent, setBannerContent] = useState();

   const handleMessage = () => {
      toast.success("Please Login to explore the Products");
   }

   useEffect(() => {
      setInterval(() => {
         if (localStorage.getItem('role') == 'admin') {
            setBannerContent();
         } else if (localStorage.getItem('role') == 'user') {
            setBannerContent();
         } else {
            setBannerContent(
               <section class="banner_main">
                  <div id="banner1" class="carousel slide" data-ride="carousel"> 
                     <div class="carousel-inner">
                        <div class="carousel-item active">
                           <div class="container">
                              <div class="carousel-caption">
                                 <div class="text-bg">
                                    <h1> <span class="blu">Welcome <br /></span>To Our Sunglasses</h1>
                                    <figure><img src="./assets/images/banner_img.png" alt="#" /></figure>
                                    <a class="read_more" onClick={handleMessage}>Shop Now</a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="carousel-item">
                           <div class="container">
                              <div class="carousel-caption">
                                 <div class="text-bg">
                                    <h1> <span class="blu">Welcome <br /></span>To Our Sunglasses</h1>
                                    <figure><img src="./assets/images/banner_img.png" alt="#" /></figure>
                                    <a class="read_more" onClick={handleMessage}>Shop Now</a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="carousel-item">
                           <div class="container">
                              <div class="carousel-caption">
                                 <div class="text-bg">
                                    <h1> <span class="blu">Welcome <br /></span>To Our Sunglasses</h1>
                                    <figure><img src="./assets/images/banner_img.png" alt="#" /></figure>
                                    <a class="read_more" onClick={handleMessage}>Shop Now</a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <a class="carousel-control-prev" href="#banner1" role="button" data-slide="prev">
                        <i class="fa fa-arrow-left" aria-hidden="true"></i>
                     </a>
                     <a class="carousel-control-next" href="#banner1" role="button" data-slide="next">
                        <i class="fa fa-arrow-right" aria-hidden="true"></i>
                     </a>
                  </div>
               </section>

            )
         }
      }, 2)
   }, []);
   return (
      <>
         {
            BannerContent
         }
      </>
   )
}

export default Banner;

