import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Logout(){
    const navigate = useNavigate();
    useEffect(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('password');
        localStorage.removeItem('email');
        localStorage.removeItem('city');
        localStorage.removeItem('address');
        localStorage.removeItem('gender');
        localStorage.removeItem('_id');
        localStorage.removeItem('mobile');
        localStorage.removeItem('status');
        localStorage.removeItem('info');
        localStorage.removeItem('role');

        navigate("/login");
    });
    return(
        <>
        </>
    );

    
}

export default Logout;