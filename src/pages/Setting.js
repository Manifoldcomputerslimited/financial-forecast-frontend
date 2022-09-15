import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/Sidebar";
import { withAuth } from "../hoc/withAuth";
import { changePassword } from '../redux/slices/auth'
import { exchangeRate, updateExchangeRate, generateReport } from "../redux/slices/forecast";

const Setting = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const isChangePasswordLoading = useSelector(state => state.auth.isChangePasswordLoading)
    const { latest, id } = useSelector(state => state.forecast.rate);
    const [latestRate, setLatestRate] = useState(latest);
    let { forecastNumber, forecastPeriod } = useSelector(state => state.forecast.forecastInfo);
    const isUpdateExchangeRateLoading = useSelector(state => state.forecast.isUpdateExchangeRateLoading)
    let { selectedPeriod } = useSelector(state => state.forecast.forecastDropdown)



    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const changeCurrentPasswordHandler = (e) => setCurrentPassword(e.target.value)

    const changeNewPasswordHandler = (e) => setNewPassword(e.target.value)


    const exchangeRateHandler = (e) => setLatestRate(e.target.value);

    const updateExchangeRateHandler = async (e) => {
        e.preventDefault();
        console.log('latest rate', latestRate)
        console.log('forecast number', forecastNumber);
        console.log('forecast period ', forecastPeriod);
        dispatch(updateExchangeRate({ id, latestRate, forecastNumber, forecastPeriod }))

    }

    const changePasswordHandler = async (e) => {
        e.preventDefault();

        if (!validator.isStrongPassword(newPassword, {
            minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            toast.error("Password must be more than 5 characters including number, symbol, upper and lowercase", { autoClose: 5000 })
            return;
        }

        dispatch(changePassword({ currentPassword, newPassword })).then((res) => {
            if (!res.payload) return

            setCurrentPassword("")
            setNewPassword("")
            navigate('/setting');
        })
    }

    const toggleCurrentPasswordVisibility = (e) => {
        e.preventDefault();
        setShowCurrentPassword(!showCurrentPassword);
    }

    const toggleNewPasswordVisibility = (e) => {
        e.preventDefault();
        setShowNewPassword(!showNewPassword);
    }

    useEffect(() => {
        // Get exchange rate from backend
        // if local storage is empty then call the backend to fetch exchange rate
        console.log('rate is', latestRate);
        console.log('new', latest);
        // if (!latestRate) {
        dispatch(exchangeRate({ forecastNumber, forecastPeriod }));
        if (latestRate != latest) {
            dispatch(generateReport({ id: selectedPeriod, forecastNumber, forecastPeriod }))
        }
        setLatestRate(latest)

        // }

    }, [latest]);

    console.log(latest)
    console.log('latestRest', latestRate);
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
                {/* Navbar */}
                <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                    <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                        {/* Brand */}
                        <a
                            className="text-black text-sm uppercase hidden lg:inline-block font-semibold"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                        >
                            Settings
                        </a>
                    </div>
                </nav>
                {/* End Navbar */}
                {/* Header */}

                {!isUpdateExchangeRateLoading && (
                    <div>
                        <div className="w-full px-4 pt-12">
                            <form className='space-y-6 py-6' onSubmit={updateExchangeRateHandler}>
                                <div className=" flex  w-full bg-white  m-auto  mb-6  justify-center items-center">
                                    <div className="w-full px-4">

                                        <div className="flex flex-col  bg-white  mb-6  justify-center items-center" >
                                            <div className="w-4/12 ">
                                                <h1 className="text-red-700 font-medium text-2xl mb-1">Exchange Rate</h1>
                                                <h1 className="text-md font-normal text-gray-600 mb-7">Input naira equivalent to dollar
                                                </h1>
                                            </div>
                                            <div className="relative w-4/12">
                                                <label
                                                    className="block text-gray-700"

                                                >
                                                    Exchange Rate
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200
                                            focus:bg-white focus:outline-none"
                                                    placeholder="Update exchange rate"
                                                    style={{ transition: "all .15s ease" }}
                                                    value={latestRate || ''}
                                                    onChange={exchangeRateHandler}
                                                />
                                            </div>
                                            <div className='pt-6'>
                                                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300">Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}


                <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-3">
                        <div className="border-t border-gray-200"></div>
                    </div>
                </div>

                <div className="w-full py-3">
                    <form className='space-y-6 py-6' onSubmit={changePasswordHandler}>

                        <div className="flex flex-col bg-white mb-6 justify-center items-center" >
                            <div className="w-4/12 ">
                                <h1 className="text-red-700 font-medium text-2xl mb-1">Change Password</h1>
                                <h1 className="text-md font-normal text-gray-600 mb-7">To change your passwod, please type in the current password
                                    and your new password.
                                </h1>
                            </div>
                            <div className="relative w-4/12">
                                <label className="block text-gray-700">Current Password</label>
                                <div className="absolute right-0 text-gray-600 flex items-center pr-5 pb-4 h-full cursor-pointer">
                                    <button onClick={toggleCurrentPasswordVisibility} >
                                        <FontAwesomeIcon
                                            icon={showCurrentPassword ? faEye : faEyeSlash}
                                            style={{ fontSize: 20, color: "grey" }}
                                        />
                                    </button>

                                </div>
                                <input
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    id="currentPassword"
                                    placeholder="Enter current password"
                                    style={{ transition: "all .15s ease" }}
                                    value={currentPassword}
                                    onChange={changeCurrentPasswordHandler}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200
                    focus:bg-white focus:outline-none"
                                />
                            </div>

                            <div className="relative w-4/12 mb-5 mt-2" >
                                <label
                                    className="block text-gray-700"
                                >
                                    New Password
                                </label>
                                <div className="absolute right-0 text-gray-600 flex items-center pr-5 pb-4 py-6 px-5  cursor-pointer">
                                    <button onClick={toggleNewPasswordVisibility} >
                                        <FontAwesomeIcon
                                            icon={showNewPassword ? faEye : faEyeSlash}
                                            style={{ fontSize: 20, color: "grey" }}
                                        />
                                    </button>

                                </div>
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200
                                    focus:bg-white focus:outline-none"
                                    placeholder="Enter new password"
                                    style={{ transition: "all .15s ease" }}
                                    value={newPassword}
                                    onChange={changeNewPasswordHandler}
                                    required
                                />
                                <div className="px-4 py-6  text-center w-6/6 sm:px-6">
                                    <button type="submit"
                                        disabled={isChangePasswordLoading}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                        {isChangePasswordLoading ? 'loading...' : 'Submit'}
                                    </button>
                                </div>
                            </div>

                        </div>


                    </form>
                </div>
            </div>
        </>
    );
}

export default withAuth(true)(Setting);