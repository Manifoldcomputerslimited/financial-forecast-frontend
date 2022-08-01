import React from "react";
import './index.css';
import logo from "../../image/logo.png";
import { NavLink } from "react-router-dom";

export const  Forgotpassword = () => {
    let activeStyle = {
		color: "red",
		fontSize: "17px"
	};

	let activeClassName = "red";
    return (
        <div className="h-screen m-auto">
        <div className="bg-center inset-0 w-7/12 lg:block">


            <div className="ml-auto left-6 top-6 text-sm px-5 py-3">
                <img alt="manifold logo" className="logo" src={logo}/>
            
            </div>

        </div>
       
        <div className="h-screen m-auto">
            <div className="bg-center inset-0 w-7/12 lg:block">


                <div className="ml-auto left-6 top-6 text-sm px-5 py-3">
            
        
                </div>

            </div>
            <div hidden role="hidden" className="fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block"></div>

            <div className="relative h-screen m-auto lg:w-6/12">
                <div className="m-auto py-12 px-6 sm:p-20 xl:w-10/12">
                    <div className="space-y-4">
                        <h1 className="text-red-700 font-medium text-2xl mb-1">Forgot Password?</h1>
                        <h1 className="text-md font-normal text-gray-600 mb-7">Please type in the email address linked to your account to reset your password.
                        </h1>
                    </div>

                    <form className='space-y-6 py-6'>
                        <div>
                            <label className="block text-gray-700">Email Address</label>
                            <input type="email" name="" id="" placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none" autoFocus required />
                        </div>


                        <div className="text-right mt-2">
                            <span className="text-sm font-semibold text-black-700">Remember password? </span>
                            
                                <NavLink className="text-sm font-semibold text-red-700 hover:text-red-500 focus:text-red-500"
                                to="/login"
                                style={({ isActive }) =>
                                  isActive ? activeStyle : undefined
                                }>
                                    Back to Sign-in

                                    </NavLink>
                            

                        </div>

                        <button type="submit" className="w-full block bg-red-400 hover:bg-red-300 focus:bg-red-300 text-white font-semibold rounded-lg
                     px-4 py-3 mt-6">Reset</button>
                    </form>

                </div>

            </div>

        </div>
    </div>
    )
}

