import './ViewSubCategory.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {apiUrlCategory,apiUrlSubCategory} from '../apiUrl';
import {Link,useParams} from 'react-router-dom';

function ViewSubCategory() {
  const params=useParams()
  const [scDetails,setSubCategoryDetails]=useState([]);

   useEffect(()=>{
      axios.get(apiUrlSubCategory+"fetch?catnm="+params.catnm).then((response)=>{
          setSubCategoryDetails(response.data);
      }).catch((error)=>{
          console.log(error)
      })
   }) 

  return (
    <>
    <section class="banner_main">
            <div id="banner1" >
               <div class="container">
                  <div class="text">
                  <h1>View SubCategory Here!!!!!!!!</h1>
                  <br/>
                    <div id="main">
                        {
                           scDetails.map((row)=>(
                                <div class="items">
                                <Link to ={`/viewp/${row.subcatnm}`}>    
                                    <img id="subcat" src={`../assets/uploads/subcaticons/${row.subcaticonnm}`} />
                                    <br/>
                                    <b style={{"font-size":"16px"}}>{row.subcatnm}</b>
                                </Link> 
                               </div>
                           ))
                          // scDetails.map((row)=>(
                          //   <p>{row.subcatnm}</p>
                          // ))
                        }
                    </div>    
                   
                  </div>
               </div>
            </div>
         </section>
    </>
  );
} 

export default ViewSubCategory;
