import './ViewCategory.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {apiUrlCategory} from '../apiUrl';
import {Link,useNavigate} from 'react-router-dom';

function ViewCategory() {
    const [cDetails,setCategoryDetails]=useState([]);

    useEffect(()=>{
        axios.get(apiUrlCategory+"fetch").then((response)=>{
              setCategoryDetails(response.data);
        }).catch((error)=>{
          console.log(error);
        })
    })
  return (
    <>
    <section class="banner_main">
            <div id="banner1" >
               <div class="container">
                  <div class="text">
                     <h1 >View Category Component</h1>
                     <br/>
                     <div id="main">
                        {
                          cDetails.map((row)=>(
                            <div class="items">
                            <Link to={`/viewsc/${row.catnm}`}>
                            <img id="cat" src={`./assets/uploads/caticons/${row.caticonnm}`}/>
                            <b>{row.catnm}</b>
                            </Link>
                            </div>
                          ))
                        }
                     </div>
                  </div>
               </div>
            </div>
         </section>
    </>
  );
} 

export default ViewCategory;
