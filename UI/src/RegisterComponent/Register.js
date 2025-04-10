import './Register.css';
import { useState } from 'react';
import axios from 'axios';
import { apiUrlUser } from '../apiUrl';

function Register() {
    const [output, setOutput] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [mobile, setMobile] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [gender, setGender] = useState();

    const handleSubmit = () => {
        //to prevent login by filling few fields
        const userDetail = {
            "name": name, "email": email, "password": password, "mobile": mobile, "address": address
            , "city": city, "gender": gender
        };
        if (name == "") {
            setOutput("name is required");
        }
        else if (email == "") {
            setOutput("email is required");
        }
        else if (password == "") {
            setOutput("password is required");
        } else if (password.length < 5) {
            setOutput("Password must > 5 char");
        } else{
            //write web service using axios tool;
            //axios.post("base url","object contain details to send")
            //http://locolhost:3001/user --base url
            axios.post(apiUrlUser + "save", userDetail).then((response) => { //if 200 status return
                setOutput("user Register Succesfully");
                setName("");
                setEmail("");
                setPassword("");
                setMobile("");
                setAddress("");
                setGender("");
                setCity("");
            }).catch((error) => { //if 500 status return
                //console.log("error");
                setOutput("user is not Register Succesfully");
            })
        }
    }

    return (
        <>
            <div class="container-xxl py-5">
                <div class="container">
                    <div class="row g-5">
                        <div class="col-lg-12 wow fadeInUp" data-wow-delay="0.1s">
                            <h1 class="text-secondary text-uppercase">Register Here!!!!!!!</h1>
                            <span style={{ "color": "red" }}>{output}</span>
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
                                    <label for="pwd">Password:</label>
                                    <input type="password" class="form-control" value={password} onChange={e => setPassword(e.target.value)} />
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
                                    Male <input type="radio" name="gender" value="male" onChange={e => setGender(e.target.value)} />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    Female <input type="radio" name="gender" value="female" onChange={e => setGender(e.target.value)} />
                                </div>
                                <button type="button" class="btn btn-register" onClick={handleSubmit}>Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;