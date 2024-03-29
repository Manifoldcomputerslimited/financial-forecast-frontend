import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrashAlt,
    faRedo
} from "@fortawesome/free-solid-svg-icons";
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { inviteUser } from '../redux/slices/auth'

import Sidebar from "../components/Sidebar.js";
import { withAuth } from "../hoc/withAuth";
import { getUsers, updateAdminStatus, deleteUser } from '../redux/slices/user'


const User = () => {
    const dispatch = useDispatch();
    const isInviteUserLoading = useSelector((state) => state.auth.inviteUserLoading);
    const isUserLoading = useSelector((state) => state.user.isUserLoading);
    const users = useSelector((state) => state.user.users);
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('')
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    // const [toggle, setToggle] = useState(true);
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        defaultValues: {
            email: ''
        }
    });

    const toggleClass = ' transform translate-x-5 bg-white';

    const outterToggleClass = ' bg-red-600'

    // Allows admin to invite user to the applicaiton and also re-invite a user
    // if the email fails


    const onDeleteUser = async () => {
        await dispatch(deleteUser({ email }))
        setShowDeleteModal(false)

        await dispatch(getUsers());

    }

    const onReInviteUser = async () => {
        await dispatch(inviteUser({ email: email })).then((res) => {
            if (!res.payload) return

            // TODO:: should redirect to login page
            reset({
                email: ""
            })

            setShowModal(false)
            setShowInviteModal(false)

        })

        await dispatch(getUsers());
    }

    const deleteModal = (user) => {
        setShowDeleteModal(true)
        setEmail(user.email)
    }

    const inviteModal = (user) => {
        setShowInviteModal(true)
        setEmail(user.email)
    }

    const updateUserStaus = async (user) => {
        await dispatch(updateAdminStatus({ user }))

        dispatch(getUsers());
    }

    const onSubmit = async (data) => {
        let email = (!data || !data.email) ? email : data.email

        await dispatch(inviteUser({ email: email })).then((res) => {
            if (!res.payload) return

            // TODO:: should redirect to login page
            reset({
                email: ""
            })

            setShowModal(false)
            setShowInviteModal(false)

        })

        await dispatch(getUsers());
    }

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch]);

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
                            Users
                        </a>

                        {/* User */}
                        <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <button onClick={() => setShowModal(true)}
                                    className="bg-red-500 text-white active:bg-red-600 text-xs font-bold px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    style={{ transition: "all .15s ease" }}
                                >
                                    Add 
                                </button>
                            </div>
                        </ul>
                    </div>
                </nav>
                {/* End Navbar */}

                {/* Modal */}
                {showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-around mt-5 rounded-t">
                                        <div className="flex-initial w-64 justify-center">
                                            <h3 className="text-red-700 font-medium text-lg mb-1 ">
                                                Invite User
                                            </h3>
                                        </div>
                                        <button
                                            onClick={() => setShowModal(false)}
                                            type="button"
                                            className=" rounded-md p-1 inline-flex items-center justify-center text-red-400 hover:text-red-500 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                                            <span className="sr-only">Close menu</span>

                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>

                                    </div>
                                    {/*body*/}
                                    <form className='space-y-6 py-6' onSubmit={handleSubmit(onSubmit)}>
                                        <div className="relative px-8 flex-auto">
                                            <div className="relative w-12/12">
                                                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                    Enter the email address to invite a user
                                                </p>

                                                <label className="block text-gray-700">Email address</label>

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
                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-center p-6 mt-5 rounded-b">

                                            <button
                                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mb-1"
                                                type="submit"
                                                disabled={isInviteUserLoading}
                                            >
                                                {isInviteUserLoading ? 'loading...' : 'Invite'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
               ) : null} 

                {showInviteModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                                    {/*body*/}
                                    {/* <form className='space-y-6 py-6' onSubmit={handleSubmit(onSubmit)}> */}
                                    <div className="relative px-8 flex-auto">
                                        <div className="relative w-12/12">
                                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                Do you want to reinvite user?
                                            </p>
                                        </div>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-center p-6 mt-5 rounded-b">
                                        <button
                                            onClick={() => setShowInviteModal(false)}
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-1 mr-2"

                                        >
                                            No
                                        </button>
                                        <button
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mb-1"
                                            onClick={onReInviteUser}
                                        >
                                            {isInviteUserLoading ? 're-inviting...' : 'Yes'}
                                        </button>
                                    </div>
                                    {/* </form> */}
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}


                {showDeleteModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                                    {/*body*/}
                                    {/* <form className='space-y-6 py-6' onSubmit={handleSubmit(onSubmit)}> */}
                                    <div className="relative px-8 flex-auto">
                                        <div className="relative w-12/12">
                                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                Are you sure you want to delete user?
                                            </p>
                                        </div>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-center p-6 mt-5 rounded-b">
                                        <button
                                            onClick={() => setShowDeleteModal(false)}
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-1 mr-2"
                                            type="submit"
                                        >
                                            No
                                        </button>
                                        <button
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mb-1"
                                            type="submit"
                                            onClick={onDeleteUser}
                                        >
                                            Yes
                                        </button>
                                    </div>
                                    {/* </form> */}
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
                {/* End Modal */}

                {/* Header */}
                <div className="w-full min-h-screen px-4 pt-12">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-red-700">
                                        User list
                                    </h3>
                                </div>

                            </div>
                        </div>

                        <div className="block w-full max-h-screen overflow-x-auto ">
                            {/* Projects table */}
                            <table className="items-center w-full  border-separate border ">
                                <thead className="bg-white border-blueGray-100 sticky top-0">
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Name
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Email
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Admin
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Status
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Date
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                {(!isUserLoading) && (
                                    <tbody className=''>
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                    {(user.firstName ? user.firstName : '') + ' ' + (user.lastName ? user.lastName : '')}
                                                </th>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {user.email}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <div
                                                        className={"md:w-10 md:h-5 w-10 h-5 flex items-center rounded-full p-1 cursor-pointer" + (!user.role ? ' bg-white border-2 border-red-500' : outterToggleClass)}
                                                        onClick={() => updateUserStaus({ role: !user.role, email: user.email })}
                                                    >
                                                        {/* Switch */}
                                                        <div
                                                            className={"md:w-3 md:h-3 h-5 w-5 rounded-full" + (!user.role ? ' bg-red-600 ' : toggleClass)}>
                                                        </div>

                                                    </div>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {user.status ? 'completed' : 'invited'}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {dayjs(user.inviteDate).format('DD-MMM-YYYY')}
                                                </td>
                                                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <div className="flex justify-start space-x-5">

                                                        <div className="has-tooltip" onClick={() => inviteModal({ email: user.email })}>
                                                            <span className="tooltip rounded shadow-lg p-2 bg-gray-100 text-green-700 -mt-8">reinvite user</span>
                                                            <FontAwesomeIcon
                                                                icon={faRedo}
                                                                style={{ fontSize: 17, color: "green" }}
                                                            />

                                                        </div>
                                                        <div className="has-tooltip" onClick={() => deleteModal({ email: user.id })}>
                                                            <span className="tooltip rounded shadow-lg p-2 bg-gray-100 text-red-500 -mt-8">delete user</span>
                                                            <FontAwesomeIcon
                                                                icon={faTrashAlt}
                                                                style={{ fontSize: 17, color: "red" }}
                                                            />
                                                        </div>
                                                    </div>


                                                </td>
                                            </tr>
                                        ))}


                                    </tbody>
                                )}
                            </table>

                        </div>
                    </div>
                </div>



                <footer className="block py-4">
                    <div className="container mx-auto px-4">
                        <hr className="mb-4 border-b-1 border-blueGray-200" />
                        <div className="flex flex-wrap items-center md:justify-between justify-center">
                            <div className="w-full md:w-4/12 px-4">
                                <div className="text-sm text-blueGray-500 font-semibold py-1">
                                    Copyright © {new Date().getFullYear()}{" "}
                                    <a
                                        href="#"
                                        className="text-blueGray-500 hover:text-blueGray-700 text-sm font-semibold py-1"
                                    >
                                        Manifold Computers
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

        </>
    );
}

export default withAuth(true)(User);