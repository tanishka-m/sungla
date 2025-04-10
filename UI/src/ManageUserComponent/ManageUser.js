import './ManageUser.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrlUser } from '../apiUrl';
import {useNavigate} from "react-router-dom";

function ManageUser() {
   const navigate = useNavigate();
   const [userDetail, setuserDetail] = useState([]);

   useEffect(() => {
      axios.get(apiUrlUser + "fetch?role=" + "user").then((response) => {
         setuserDetail(response.data.userList);
      })
   })

   const changeStatus=(_id,s)=>{
      if(s=='verify'){
         alert("in verify");
         let updateDetail={"condition_obj":{"_id":_id},"content_obj":{"status":1}}
         axios.patch(apiUrlUser+"update",updateDetail).then((response)=>{
            navigate("/manageuser");
         }).catch((error)=>{
            console.log(error);
         })
      }
      else if(s=='block'){
         alert("in block");
         let updateDetail={"condition_obj":{"_id":_id},"content_obj":{"status":0}}
         axios.patch(apiUrlUser+"update",updateDetail).then((response)=>{
            navigate("/manageuser");
         }).catch((error)=>{
            console.log(error);
         })
      }
      else{
         let deleteDetail={"data":{"_id":_id}};
         axios.delete(apiUrlUser+"delete",deleteDetail).then((response)=>{
            navigate("/manageuser");
         }).catch((error)=>{
            console.log(error);
         })
      }
   }

   return (
      <>
         <section class="banner_main">
            <div id="banner1" >
               <div class="container">
                  <div class="text">
                     <h1 >Manage User Details Here!!!</h1><br />
                     <br />
                     <table border="3px" cellSpacing="10" cellPadding="10" class="table table-bordered">
                        <tr>
                           <th>RegId</th>
                           <th>Name</th>
                           <th>Email</th>
                           <th>Mobile</th>
                           <th>Address</th>
                           <th>City</th>
                           <th>Info</th>
                           <th>Status</th>
                           <th>Action</th>
                        </tr>
                        {
                           userDetail.map((row) => (
                              <tr>
                                 <td>{row._id}</td>
                                 <td>{row.name}</td>
                                 <td>{row.email}</td>
                                 <td>{row.mobile}</td>
                                 <td>{row.address}</td>
                                 <td>{row.city}</td>
                                 <td>{row.info}</td>
                                 <td>
                                    {
                                       row.status==0 && <a style={{"color":"green"}} onClick={()=>{changeStatus(row._id,'verify')}}>Verify</a>
                                    }
                                    {
                                       row.status==1 && <a style={{"color":"orange"}} onClick={()=>{changeStatus(row._id,'block')}}>Block</a>
                                    }
                                 </td>
                                 <td><a style={{"color":"red"}} onClick={()=>{changeStatus(row._id,'delete')}}>Delete</a></td>
                              </tr>
                           ))
                        }
                     </table>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}

export default ManageUser;