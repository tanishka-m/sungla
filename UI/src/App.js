// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Banner from './BannerComponent/Banner';
import Nav from './NavComponent/Nav';
import Footer from './FooterComponent/Footer';
import Home from './HomeComponent/Home';
import About from './AboutComponent/About';
import Contact from './ContactComponent/Contact';
import Service from './ServiceComponent/Service';
import Register from './RegisterComponent/Register';
import Login from './LoginComponent/Login';
import UserHome from './UserComponent/UserHome';
import AdminHome from './AdminComponent/AdminHome';
import Logout from './LogoutComponent/Logout';
import ManageUser from './ManageUserComponent/ManageUser';
import EpAdmin from './EpAdminComponent/EpAdmin';
import CpAdmin from './CpAdminComponent/CpAdmin';
import AddCategory from './AddCategoryComponent/AddCategory';
import AddSubCategory from './AddSubCategoryComponent/AddSubCategory';
import ViewCategory from './ViewCategoryComponent/ViewCategory';
import ViewSubCategory from './ViewSubCategoryComponent/ViewSubCategory';
import VerifyUser from './VerifyUserComponent/VerifyUser';
import AddProduct from './AddProductComponent/AddProduct';
import EpUser from './EpUserComponent/EpUser';
import CpUser from './CpUserComponent/CpUser';
import ViewProduct from './ViewProductComponent/ViewProduct';
import AddCart from './AddCartComponent/AddCart';
import CartPage from './AddCartComponent/CartPage';
import { Toaster } from "react-hot-toast";
import Orders from './AddCartComponent/Orders';
import AdminOrders from './AdminComponent/AdminOrders';

function App() {
  return (
    <>
      <Toaster />
      <Nav />

      <Banner />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserHome />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/manageuser" element={<ManageUser />} />
        <Route path="/epadmin" element={<EpAdmin />} ></Route>
        <Route path="/cpadmin" element={<CpAdmin />} ></Route>
        <Route path="/addcategory" element={<AddCategory />} ></Route>
        <Route path="/addsubcategory" element={<AddSubCategory />} ></Route>
        <Route path="/addproduct" element={<AddProduct />} ></Route>
        <Route path="/viewcategory" element={<ViewCategory />} ></Route>
        <Route path="/viewsc/:catnm" element={<ViewSubCategory />} ></Route>
        <Route path="/verify/:email" element={<VerifyUser />} ></Route>
        <Route path="/epuser" element={<EpUser />} ></Route>
        <Route path="/cpuser" element={<CpUser />} ></Route>
        <Route path="/viewp/:subcatnm" element={<ViewProduct />} ></Route>
        <Route path="/addcart/:_id" element={<AddCart />} ></Route>
        <Route path="/cart" element={<CartPage />} ></Route>
        <Route path="/orders" element={<Orders />} ></Route>
        <Route path="/adminorders" element={<AdminOrders />} ></Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
