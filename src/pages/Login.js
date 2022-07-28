import { useState } from "react";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  }
  return (
    <div className="main">
      <div className="h-screen m-auto">
        <div className="bg-center inset-0 w-7/12 lg:block">
          <div className="ml-auto left-6 top-6 text-sm px-5 py-3">
            <img className="img" alt="manifold logo" src={logo} width="100px" height="40px" />
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
            <form action="#" method="GET" className='space-y-6 py-6'>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input type="email" name="" id="email" placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                  autoFocus required />
              </div>
              <div className="relative mb-5 mt-2">
                <label className="block text-gray-700">Password</label>
                <div class="absolute right-0 text-gray-600 flex items-center pr-5 pb-4 h-full cursor-pointer">
                  <button onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      style={{ fontSize: 20, color: "grey" }}
                    />
                  </button>

                </div>
                <input type={showPassword ? 'text' : 'password'} name="" id="password" placeholder="Enter Password" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200
                    focus:bg-white focus:outline-none" required />
              </div>
              <div className="text-right mt-2">
                <a className="text-sm font-semibold text-red-700 hover:text-red-500 focus:text-red-500">Forgot
                  Password?</a>
              </div>
              <button type="submit" className="w-full block bg-red-400 hover:bg-red-300 focus:bg-red-300 text-white font-semibold rounded-lg
                px-4 py-3 mt-6">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;