import Sidebar from "../components/Sidebar";

const Setting = () => {
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

                <div>
                    <div className="w-full px-4 pt-12">
                        <form action="#" method="POST">
                            <div className=" flex  w-full bg-white  m-auto  mb-6  justify-center items-center">
                                <div className="w-full px-4">

                                    <div className="flex flex-col  bg-white  mb-6  justify-center items-center" >
                                        <div className="w-4/12 ">
                                            <h1 className="text-red-700 font-medium text-2xl mb-1">Exchange Rate</h1>
                                            <h1 className="text-md font-normal text-gray-600 mb-7">Input naira equivalent to dollar
                                            </h1>
                                        </div>
                                        <label
                                            className="block w-1/3 text-left text-gray-700 text-xs font-bold mb-4"
                                            htmlFor="grid-password"
                                        >
                                            Exchange Rate
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow w-4/12 focus:outline-none focus:ring"
                                            placeholder="Update exchange rate"
                                            style={{ transition: "all .15s ease" }}
                                        />
                                        <div className='pt-6'>
                                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300">Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-3">
                        <div className="border-t border-gray-200"></div>
                    </div>
                </div>

                <div className="w-full py-3">
                    <form action="#" method="POST">

                        <div className="flex flex-col bg-white mb-6 justify-center items-center" >
                            <div className="w-4/12 ">
                                <h1 className="text-red-700 font-medium text-2xl mb-1">Change Password</h1>
                                <h1 className="text-md font-normal text-gray-600 mb-7">To change your passwod, please type in the current password
                                    and your new password.
                                </h1>
                            </div>
                            <label
                                className="block w-1/3 text-left text-gray-700 text-xs font-bold mb-4"
                                htmlFor="grid-password"
                            >
                                Current Password
                            </label>
                            <input
                                type="text"
                                className=" border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow w-4/12 focus:outline-none focus:ring"
                                placeholder="Enter current password"
                                style={{ transition: "all .15s ease" }}
                            />
                        </div>

                        <div className="flex flex-col  bg-white  mb-6  justify-center items-center" >
                            <label
                                className="block w-1/3 text-left text-gray-700 text-xs font-bold mb-4"
                                htmlFor="grid-password"
                            >
                                New Password
                            </label>
                            <input
                                type="text"
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow  w-4/12 focus:outline-none focus:ring w-full"
                                placeholder="Enter new password"
                                style={{ transition: "all .15s ease" }}
                            />
                            <div className="px-4 py-6  text-center w-6/12 sm:px-6">
                                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Setting;