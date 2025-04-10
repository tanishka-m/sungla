import './EpUser.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrlUser } from '../apiUrl';
import { useNavigate } from 'react-router-dom';

function EpUser() {
  const navigate=useNavigate();
  const [output, setOutput] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [gender, setGender] = useState();
  const [M, setM] = useState();
  const [F, setF] = useState();

  useEffect(() => {
    axios.get(apiUrlUser + "fetch?email=" + localStorage.getItem('email')).then((response) => {
      var userDetails = response.data.userList[0];
      setName(userDetails.name);
      setEmail(userDetails.email);
      setMobile(userDetails.mobile);
      setCity(userDetails.city);
      setAddress(userDetails.address);
      if (userDetails.gender == "male")
        setM("checked");
      else
        setF("checked");

    })
  }, []);


  const handleSubmit = () => {
    let updateDetail = {"condition_obj":{"email":email},"content_obj":{"name":name,"mobile":mobile,"city":city,"address":address,"gender":gender}};

    axios.patch(apiUrlUser+"update",updateDetail).then(()=>{
        setOutput("Profile Edited successfully");
        navigate("/epuser");
    }).catch((error)=>{
        console.log(error)
    })
  }
  return (
    <>
      <section class="banner_main">
        <div id="banner1" >
          <div class="container">
            <div class="text">
              <h1 >Edit Profile Here!!</h1>
              <span style={{"color":"red"}}>{output}</span>
              <form >
                <div class="form-group">
                  <label for="name">Name:</label>
                  <input type="text" class="form-control" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div class="form-group">
                  <label for="email">Email address:</label>
                  <input type="email" class="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div class="form-group">
                  <label for="mobile">Mobile:</label>
                  <input type="text" class="form-control" value={mobile} onChange={e => setMobile(e.target.value)} />
                </div>
                <div class="form-group">
                  <label for="address">Address:</label>
                  <textarea rows="5" cols="5" class="form-control" value={address} onChange={e => setAddress(e.target.value)}></textarea>
                </div>
                <div class="form-group">
                  <label for="address">City:</label>
                  <select class="form-control" value={city} onChange={e => setCity(e.target.value)}>
                    <option>Select City</option>
                    <option>Indore</option>
                    <option>Dewas</option>
                    <option>Ujjain</option>
                    <option>Dhar</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="gender">Gender:</label>
                  &nbsp;&nbsp;
                  Male <input type="radio" name="gender" value="male" checked={M} onChange={e => setGender(e.target.value)} />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Female <input type="radio" name="gender" value="female" checked={F} onChange={e => setGender(e.target.value)} />
                </div>
                <button type="button" class="btn btn-register" onClick={handleSubmit}>Edit Profile</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EpUser;

