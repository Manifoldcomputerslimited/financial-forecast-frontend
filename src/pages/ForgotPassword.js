import React from "react";
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { forgotPassword } from '../redux/slices/auth'

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        dispatch(forgotPassword({ email: data.email }))

        // if loading is false then close modal
        setShowModal(false)
    }


    return (
        <div className="h-screen m-auto">
            <div className="bg-center inset-0 w-7/12 lg:block">
                <div className="ml-auto left-6 top-6 text-sm px-5 py-3">
                    <a href="/login">
                        <img className="img" alt="manifold logo" src={logo} width="100px" height="40px" />
                    </a>
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

                        <form className='space-y-6 py-6' onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="block text-gray-700">Email Address</label>
                                <input
                                    type='text'
                                    name='email'
                                    placeholder="Enter email"
                                    style={{ transition: "all .15s ease" }}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                                    {...register("email", { required: 'email address is required*', pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}

                                />
                                {(errors.email && errors.email.type) === "pattern" && (
                                    <p className="text-xs mt-1 text-red-700">enter valid email</p>
                                )}
                                {errors.email && <p className="text-xs mt-1 text-red-700">{errors.email.message}</p>}
                            </div>
                            <div className="text-right mt-2">
                                <span className="text-sm font-semibold text-black-700">Remember password? </span>
                                {/* <a className="text-sm font-semibold text-red-700 hover:text-red-500 focus:text-red-500">Back to Sign-in</a> */}
                                <NavLink className="text-sm font-semibold text-red-700 hover:text-red-500 focus:text-red-500"
                                    to="/login"
                                >
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

export default ForgotPassword;