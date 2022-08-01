import React, {useState} from "react";
import './index.css';
import logo from "../../image/logo.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom"

library.add(faUser, faEnvelope, faLock, faEye, faEyeSlash);
import { NavLink } from "react-router-dom";


export const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  let activeStyle = {
		color: "red",
		fontSize: "17px"
	};

	let activeClassName = "red";
  const loginHandler = (e) => {
    e.preventDefault();
    setIsAuthenticated(true)
  }



  return (
    <div className="main">
      <div className="h-screen m-auto">
        <div className="bg-center inset-0 w-7/12 lg:block">


          <div className="ml-auto left-6 top-6 text-sm px-5 py-3">
            <img className="img" alt="manifold logo" src={logo} />

            {/* <Image src={logo} alt="manifold logo" width={100} height={40} /> */}
          </div>

        </div>
        <div hidden role="hidden" className="fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block">
        </div>
        <div className="relative h-screen m-auto lg:w-6/12">
          <div className="m-auto py-12 px-6 sm:p-20 xl:w-10/12">
            <div className="space-y-4">
              <h1 className="text-red-700 font-medium text-2xl mb-1">Login</h1>
              <h1 className="text-md font-normal text-gray-600 mb-7">To sign in, please type in the email address
                linked to your account and your password.
              </h1>
            </div>
            {isAuthenticated && (
              <Navigate to="/"/>
            )}
            <form  className='space-y-6 py-6' onSubmit={loginHandler}>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input type="email" name="" id="email" placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                  autoFocus required />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input type="password" name="" id="password" placeholder="Enter Password" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200
                    focus:bg-white focus:outline-none" required   /> 
                    
              </div>
              <div className="text-right mt-2">
                <NavLink className="text-sm font-semibold text-red-700 hover:text-red-500 focus:text-red-500"
                to="/forgot-password"
                style={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }>
                  Forgot
                  Password?
                  </NavLink>
              </div>
              <button type="submit" className="w-full block bg-red-400 hover:bg-red-300 focus:bg-red-300 text-white font-semibold rounded-lg
                px-4 py-3 mt-6">
                  <NavLink
                  to="/"
                  style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }>
                    Login
                    </NavLink>
                    </button>
            </form>
          </div>
        </div>
      </div>

    </div>



  );
};
