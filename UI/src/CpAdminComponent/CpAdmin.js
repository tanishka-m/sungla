import './CpAdmin.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {apiUrlUser} from '../apiUrl';
import {useNavigate} from 'react-router-dom';

function CpAdmin() {
  const navigate=useNavigate();
  const [output,setOutput]=useState();
  const [opass,setOPass]=useState();
  const [npass,setNPass]=useState();
  const [cnpass,setCnPass]=useState();   

  const handleSubmit =()=>{
      axios.get(apiUrlUser+"fetch?email="+localStorage.getItem('email')+"&password="+opass).then((response)=>{
          if(npass==cnpass)
          {
              let updateDetail= {"condition_obj":{"email":localStorage.getItem('email')},"content_obj":{"password":npass}};
              axios.patch(apiUrlUser+"update",updateDetail).then((response)=>{
                  setOutput("Password change Successfully");
                  setOPass("");
                  setNPass("");
                  setCnPass("");
              }).catch((error)=>{
                  setOutput("Password not change Successfully")
                  setOPass("");
                  setNPass("");
                  setCnPass("");
              });
          }
          else
          {
              setOutput("new password and confrim password are not matched");
              setNPass("");
              setCnPass("");
          }    
      });

  }
return (
    <>
    <section class="banner_main">
            <div id="banner1" >
               <div class="container">
                  <div class="text">
                     <h1>Change Password Here!!!</h1>
                     <span style={{"color":"red"}}>{output}</span>
                     <form>
                  <div class="form-group">
                  <label for="Old Password">Old Password:</label>
                  <input type="password" class="form-control" value={opass} onChange={e=>setOPass(e.target.value)}/>
                  </div>
                  <br />
                  
                  <div class="form-group">
                  <label for="New Password">New Password:</label>
                  <input type="password" class="form-control" value={npass} onChange={e=>setNPass(e.target.value)}/>
                  </div>
                  <br />
                  
                  <div class="form-group">
                  <label for="Cn Pass">Confirm Password:</label>
                  <input type="password" class="form-control" value={cnpass} onChange={e=>setCnPass(e.target.value)}/>
                  </div>
                  <br/>
                <button type="button" class="btn btn-primary" onClick={handleSubmit}>Change Password</button>
              </form>
                  </div>
               </div>
            </div>
         </section>
   
                 


    </>
  );
} 

export default CpAdmin;
