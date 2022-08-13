import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import { reset } from '../redux/slices/auth'

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isResetPasswordLoading = useSelector(state => state.auth.isResetPasswordLoading)
    const { id } = useParams()
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            newPassword: '',
            confirmNewPassword: ''
        }
    });


    const resetPassword = (data) => {
        if (data.newPassword !== data.confirmNewPassword) {
            toast.error("Password mismatch", { autoClose: 2000 })
            return;
        }
        dispatch(reset({
            password: data.newPassword,
            token: id
        })).then((res) => {
            if (!res.payload) return

            // TODO:: should redirect to login page
            navigate('/login');
        })
    }

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    const toggleNewPasswordVisibility = (e) => {
        e.preventDefault();
        setShowNewPassword(!showNewPassword);
    }

    // useEffect(() => {

    //     if (!isResetPasswordLoading) {
    //         navigate('/login');
    //     }

    // }, [isResetPasswordLoading]);

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
                            <h1 className="text-red-700 font-medium text-2xl mb-1">Reset Password</h1>
                            <h1 className="text-md font-normal text-gray-600 mb-7">Reset your passwod by filling out the form below.
                            </h1>
                        </div>

                        <form className='space-y-6 py-6' onSubmit={handleSubmit(resetPassword)}>

                            <div className="relative mb-5 mt-2">
                                <label className="block text-gray-700">New Password</label>
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
                                    id="newPassword"
                                    placeholder="Enter New Password"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200
                    focus:bg-white focus:outline-none"
                                    {...register("newPassword", { required: "new password is required *" })}
                                />
                                {errors.newPassword && <p className="text-xs mt-1 text-red-700">{errors.newPassword.message}</p>}
                            </div>
                            <div className="relative mb-5 mt-2">
                                <label className="block text-gray-700">Confirm New Password</label>
                                <div className="absolute right-0 text-gray-600 flex items-center pr-5 pb-4 h-full cursor-pointer">
                                    <button onClick={toggleNewPasswordVisibility}>
                                        <FontAwesomeIcon
                                            icon={showNewPassword ? faEye : faEyeSlash}
                                            style={{ fontSize: 20, color: "grey" }}
                                        />
                                    </button>
                                </div>
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    id="confirmNewPassword"
                                    placeholder="Confirm New Password"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200
                    focus:bg-white focus:outline-none"
                                    {...register("confirmNewPassword", { required: "confirm new password is required *" })}
                                />
                                {errors.confirmNewPassword && <p className="text-xs mt-1 text-red-700">{errors.confirmNewPassword.message}</p>}
                            </div>
                            <div className="text-right mt-2">
                                <br></br>
                            </div>
                            <button
                                type="submit"
                                className="w-full block bg-red-400 hover:bg-red-300 focus:bg-red-300 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                                disabled={isResetPasswordLoading} >
                                {isResetPasswordLoading ? 'loading...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;