import './ViewProduct.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrlProduct, apiUrlCategory, apiUrlSubCategory } from '../apiUrl';
import { Link, useParams } from 'react-router-dom';

function ViewProduct() {
  const params = useParams()
  const [pDetails, setProductDetails] = useState([]);

  useEffect(() => {
    axios.get(apiUrlProduct + "fetch?subcatnm=" + params.subcatnm).then((response) => {
      setProductDetails(response.data);
    }).catch((error) => {
      console.log(error)
    })
  })

  return (
    <>
      <section class="banner_main">
        <div id="banner1" >
          <div class="container">
            <div class="text">
                <h1 class="display-5 mb-0">View Product List &gt;&gt; {params.subcatnm}</h1>
                {
                   pDetails.map((row)=>(
                    <center>
                    <table id="ptable" border="1">
                    <tr>
                      <td rowspan="3">
                        <center>
                        <img id='vp' src={`../assets/uploads/picons/${row.piconnm}`} />
                        </center>
                      </td>
                      <td><b>Title :</b> {row.title} </td>
                    </tr>
                    <tr>
                      <td><b>Description :</b> {row.description}</td>
                    </tr>  
                    <tr>
                      <td>
                      <b>Price :</b> {row.price}
                      <br/>
                      { 
                        <Link to={`/addcart/${row._id}`} ><button class="btn btn-success">Add cart</button></Link> 
                      }
                      </td>
                    </tr>
                    </table>
                    <br/><br/>
                    </center>
                      ))
                    }
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ViewProduct;

/*
<div class="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
<div class="container">
    <div class="row g-5">
        <div class="col-lg-12">
            <div class="section-title mb-4">
                <h1 class="display-5 mb-0">View Product List &gt;&gt; {params.subcatnm}</h1>
                {
                   pDetails.map((row)=>(
                    <center>
                    <table id="ptable" border="1">
                    <tr>
                      <td rowspan="3">
                        <center>
                        <img src={`../assets/uploads/picons/${row.piconnm}`} height="100" width="150" />
                        </center>
                      </td>
                      <td><b>Title : {row.title} </b></td>
                    </tr>
                    <tr>
                      <td><b>Description : {row.description}</b></td>
                    </tr>  
                    <tr>
                      <td>
                      <b>price : {row.price}</b>
                      <br/>
                     
                      { 
                        <Link to={`/addcart/${row._id}`} ><button>add cart</button></Link> 
                      }
                      </td>
                    </tr>
                    </table>
                    <br/><br/>
                    </center>

                      ))
                    }
            </div>
            <br />
        </div>
    </div>
</div>
</div>
*/
