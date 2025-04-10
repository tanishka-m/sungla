import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { apiUrlUser } from '../apiUrl';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [output, setOutput] = useState();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);


    const handleSubmit = () => {
        //to prevent login by filling few fields
        if (email == null) {
            setOutput("Email is required");
        } else if (password == null) {
            setOutput("Password is required");
        } else if (password.length < 5) {
            setOutput("Password must > 5 char");
        } else {
            const userDetail = { "email": email, "password": password };
            axios.post(apiUrlUser + "login", userDetail).then((response) => {
                //  setOutput("Login successfull")
                // setOutput(respone.data.token);

                const userDetail = response.data.userList;
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("_id", userDetail._id);
                localStorage.setItem("name", userDetail.name);
                localStorage.setItem("email", userDetail.email);
                localStorage.setItem("password", userDetail.password);
                localStorage.setItem("mobile", userDetail.mobile);
                localStorage.setItem("address", userDetail.address);
                localStorage.setItem("city", userDetail.city);
                localStorage.setItem("gender", userDetail.gender);
                localStorage.setItem("role", userDetail.role);
                localStorage.setItem("status", userDetail.status);
                localStorage.setItem("info", userDetail.info);

                /*if(userDetail.role=="admin")
               //  setOutput("login successfull as admin");
                navigate("/admin");
                else
               //  setOutput("login successfull as user");
                navigate("/user");
                */
                (userDetail.role == "admin") ? navigate("/admin") : navigate("/user");

            }).catch((error) => {
                setOutput("Invalid Credentials,please verify your account")
            });
        }
    }
    return (
        <>
            <div class="container-xxl py-5">
                <div class="container">
                    <div class="row g-5">
                        <div class="col-lg-12 wow fadeInUp" data-wow-delay="0.1s">
                            {/* <h1 class="text-secondary text-uppercase">Login Here!!!!!!!</h1> */}
                            <span style={{ "color": "red" }}>{output}</span>
                            <form >
                                <div class="form-group">
                                    <label for="email">Email address:</label>
                                    <input type="email" class="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div class="form-group">
                                    <label for="pwd">Password:</label>
                                    <input type="password" class="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                                </div>
                                <button type="button" class="btn btn-register" onClick={handleSubmit}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
