import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash
} from "@fortawesome/free-solid-svg-icons";

import { signup } from '../redux/slices/auth'

const Register = () => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    });


    const registerUser = (data) => {
        dispatch(signup({
            data,
            inviteToken: id
        }))
    }



    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    return (
        <div className="main">
            <div className="h-screen m-auto">
                <div className="bg-center inset-0 w-7/12 lg:block">
                    <div className="ml-auto left-6 top-6 text-sm px-5 py-3">
                        <a href="/login">
                            <img className="img" alt="manifold logo" src={logo} width="100px" height="40px" />
                        </a>
                    </div>
                </div>
                <div hidden role="hidden" className="fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block">
                </div>
                <div className="relative h-screen m-auto lg:w-6/12">
                    <div className="m-auto py-12 px-6 sm:p-20 xl:w-10/12">
                        <div className="space-y-4">
                            <h1 className="text-red-700 font-medium text-2xl mb-1">Update Account Information</h1>
                            <h1 className="text-md font-normal text-gray-600 mb-7">Complete your registration by filling out the form below.
                            </h1>
                        </div>

                        <form className='space-y-6 py-6' onSubmit={handleSubmit(registerUser)}>
                            <div>
                                <label className="block text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    placeholder="Enter First Name"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                                    {...register("firstName", { required: "first name is required *" })}
                                />
                                {errors.firstName && <p className="text-xs mt-1 text-red-700">{errors.firstName.message}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    placeholder="Enter Last Name"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                                    {...register("lastName", { required: "last name is required *" })}
                                />
                                {errors.lastName && <p className="text-xs mt-1 text-red-700">{errors.lastName.message}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter Email Address"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                                    {...register("email", { required: "email name is required *", pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
                                />
                                {(errors.email && errors.email.type) === "pattern" && (
                                    <p className="text-xs mt-1 text-red-700">enter valid email</p>
                                )}
                                {errors.email && <p className="text-xs mt-1 text-red-700">{errors.email.message}</p>}
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
                                    {...register("password", { required: "password is required *" })}
                                />
                                {errors.password && <p className="text-xs mt-1 text-red-700">{errors.password.message}</p>}
                            </div>
                            <div className="text-right mt-2">
                                <br></br>
                            </div>
                            <button
                                type="submit"
                                className="w-full block bg-red-400 hover:bg-red-300 focus:bg-red-300 text-white font-semibold rounded-lg
                px-4 py-3 mt-6" >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;