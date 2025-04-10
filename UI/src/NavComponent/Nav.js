import './Nav.css';
import React, { useState, useEffect } from 'react';
import { Link,NavLink } from 'react-router-dom';
import Auth from '../AuthComponent/Auth';
import {useCart} from "../AddCartComponent/cart";


function Nav() {
  const [cart] = useCart()
  const [NavContent, setNavContent] = useState();

  useEffect(() => {

    setInterval(() => {
      if (localStorage.getItem('role') == 'admin') {
        setNavContent(
          <>
            <header>
              <div class="header">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                      <div class="full">
                        <div class="center-desk">
                          <div class="logo">
                            <a><Link to="index.html"><img src="./assets/images/logo.png" alt="#" /></Link></a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                      <nav class="navigation navbar navbar-expand-md navbar-dark ">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarsExample04">
                          <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                              <a class="nav-link" ><Link to='/admin'>AdminHome</Link></a>
                            </li>
                            <li class="nav-item active">
                              <a class="nav-link" ><Link to='/manageuser'>ManageUser</Link></a>
                            </li>
                            <li class="nav-item active">
                              <a class="nav-link" ><Link to='/adminorders'>Orders</Link></a>
                            </li>
                            <div class="nav-item dropdown">
                              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Profile Setting</a>
                              <div class="dropdown-menu fade-up m-0">
                                <a class="dropdown-item"><Link to="/epadmin">Edit Profile</Link></a>
                                <a class="dropdown-item"><Link to="/cpadmin">Change Password</Link></a>
                              </div>
                            </div>
                            <div class="nav-item dropdown">
                              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Manage Category</a>
                              <div class="dropdown-menu fade-up m-0">
                                <a class="dropdown-item"><Link to="/addcategory">Add Category</Link></a>
                                <a class="dropdown-item"><Link to="/addsubcategory">Add SubCategory</Link></a>
                              </div>
                            </div>
                            <li class="nav-item d_none">
                              <a class="nav-link"><Link to='/addproduct'>AddProduct</Link></a>
                            </li>
                            <li class="nav-item d_none">
                              <a class="nav-link"><Link to='/logout'>Logout</Link></a>
                            </li>

                            {/* <li class="nav-item d_none sea_icon">
                              <a class="nav-link" href="#"><i class="fa fa-shopping-bag" aria-hidden="true"></i><i class="fa fa-search" aria-hidden="true"></i></a>
                            </li> */}
                          </ul>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </header>
          </>
        )
      } else if (localStorage.getItem('role') == "user") {
        setNavContent(
          <>
            <header>
              <div class="header">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                      <div class="full">
                        <div class="center-desk">
                          <div class="logo">
                            <a><Link to="index.html"><img src="./assets/images/logo.png" alt="#" /></Link></a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                      <nav class="navigation navbar navbar-expand-md navbar-dark ">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarsExample04">
                          <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                              <a class="nav-link" ><Link to='/user'>UserHome</Link></a>
                            </li>
                            <li class="nav-item active">
                              <a class="nav-link" ><Link to='/viewcategory'>View Category</Link></a>
                            </li>
                            <li class="nav-item active">
                              <a class="nav-link" ><Link to='/orders'>Orders</Link></a>
                            </li>
                            <div class="nav-item dropdown">
                              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Profile Setting</a>
                              <div class="dropdown-menu fade-up m-0">
                                <a class="dropdown-item"><Link to="/epuser">Edit Profile</Link></a>
                                <a class="dropdown-item"><Link to="/cpuser">Change Password</Link></a>
                              </div>
                            </div>
                            <li class="nav-item d_none">
                              <a class="nav-link"><Link to='/logout'>Logout</Link></a>
                            </li>
                            <li class="nav-item d_none sea_icon">
                              <NavLink to='/cart'>
                              <div className='w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center relative' >
                                <img src='./assets/images/addtocart.png' alt="" className='w-6' />
                                <span className='absolute top-2/3 right-1/2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center'>{cart?.length}</span>
                              </div>
                              {/* {cart?.length} */}
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </header>
          </>
        )
      } else {
        setNavContent(
          <>
            <header>
              <div class="header">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                      <div class="full">
                        <div class="center-desk">
                          <div class="logo">
                            <a><Link to="index.html"><img src="./assets/images/logo.png" alt="#" /></Link></a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                      <nav class="navigation navbar navbar-expand-md navbar-dark ">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarsExample04">
                          <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                              <a class="nav-link" ><Link to='/'>Home</Link></a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link"><Link to='/about'>About</Link></a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link"><Link to='/services'>Services</Link></a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link"><Link to='/contact'>Contact Us</Link></a>
                            </li>
                            <li class="nav-item d_none login_btn">
                              <a class="nav-link"><Link to='/login'>Login</Link></a>
                            </li>
                            <li class="nav-item d_none">
                              <a class="nav-link"><Link to='/register'>Register</Link></a>
                            </li>
                            <li class="nav-item d_none sea_icon">
                              <a class="nav-link" href="#"><i class="fa fa-shopping-bag" aria-hidden="true"></i></a>
                            </li>
                          </ul>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </header>
          </>
        )
      }
    }, 2)
  }, [cart]);


  return (
    <>
      <Auth />
      {
        NavContent
      }
    </>
  )
}

export default Nav;