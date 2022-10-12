import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner'
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import { login } from '../redux/slices/auth'
import { NavLink, Navigate, useSearchParams } from "react-router-dom";

const Login = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const authLoading = useSelector(state => state.auth.isAuthLoading);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isZohoAuthenticated = useSelector(state => state.auth.isZohoAuthenticated);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams(props);

  const changeEmailHandler = (e) => setEmail(e.target.value);
  const changePasswordHandler = (e) => setPassword(e.target.value);



  const loginHandler = (e) => {
    e.preventDefault();
    console.log('logging in')
    dispatch(login({ email, password }))
  }

  const togglePasswordVisibility = (e) => {
    console.log(authLoading)
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
            {(isAuthenticated) && (!isZohoAuthenticated && !authLoading) && (
              window.location.replace(`https://accounts.zoho.com/oauth/v2/auth?scope=ZohoBooks.settings.READ,ZohoBooks.invoices.READ,ZohoBooks.salesorders.READ,ZohoBooks.purchaseorders.READ,ZohoBooks.bills.READ,ZohoBooks.banking.READ&client_id=${process.env.REACT_APP_ZOHO_CLIENT_ID}&state=testing&response_type=code&redirect_uri=${process.env.REACT_APP_BASE_URL}&access_type=offline&prompt=Consent`)
            )}
            {(isAuthenticated && isZohoAuthenticated) && (
              <Navigate to="/" replace={true} />
            )}
            <form className='space-y-6 py-6' onSubmit={loginHandler}>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                  value={email}
                  onChange={changeEmailHandler}
                  required />
              </div>
              <div className="relative mb-5 mt-2">
                <label className="block text-gray-700">Password</label>
                <div className="absolute right-0 text-gray-600 flex items-center pr-5 pb-4 h-full cursor-pointer">
                  <button onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      style={{ fontSize: 20, color: "grey" }}
                    />
                  </button>

                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200
                    focus:bg-white focus:outline-none"
                  value={password}
                  onChange={changePasswordHandler}
                  required />
              </div>
              <div className="text-right mt-2">
                <NavLink className="text-sm font-semibold text-red-700 hover:text-red-500 focus:text-red-500"
                  to="/forgot-password"
                >
                  Forgot Password?
                </NavLink>
              </div>
              <button
                type="submit"
                disabled={authLoading}
                className="w-full block bg-red-400 hover:bg-red-300 focus:bg-red-300 text-white font-semibold rounded-lg
                px-4 py-3 mt-6" >{authLoading ? 'loading...' : 'Login'} </button>
            </form>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default Login;