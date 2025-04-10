import { Navigate,useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from 'axios';
import { apiUrlUser } from "../apiUrl";

function VerifyUser() {
   const params=useParams();
   //alert(params.email);
   useEffect(()=>{
      axios.get(apiUrlUser+"fetch?email="+params.email).then((response)=>{
         //alert(response.data.userList[0]);
         if(response.data.userList[0].__v==0){
            const updateDetails={"condition_obj":{"email":params.email},
            "content_obj":{"status":1,"__v":1}};
            axios.patch(apiUrlUser+"update",updateDetails).then((response)=>{
                console.log("User Verified")
            }).catch((error)=>{
               console.log(error);
            })
         }
      }).catch((error)=>{
         console.log(error);
      })
   },[])

   return (
      <>
      {
        <Navigate to="/login"/>
      }
      </>
   )
}

export default VerifyUser;