import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFile,
	faUserPlus,
	faCog,
	faSignOut,
	faBars,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import DurationDropdown from "./DurationDropdown.js";

const Sidebar = () => {
	const [collapseShow, setCollapseShow] = React.useState("hidden");
	return (
		<>
			<nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
				<div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
					{/* Toggler */}
					<button
						className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
						type="button"
						onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
					>
						<FontAwesomeIcon
							icon={faBars}
							style={{ fontSize: 15, color: "red", paddingRight: 5 }}
						/>
					</button>
					{/* Brand */}
					<a className="text-red-500 hover:text-red-600 text-md   py-3 font-bold block">
						Manifold Computers
					</a>
					{/* Duration */}
					<ul className="md:hidden items-center flex flex-wrap list-none">
						<li className="inline-block relative">
							{/* <NotificationDropdown /> */}
						</li>
						<li className="inline-block relative">
							<DurationDropdown />
						</li>
					</ul>
					{/* Collapse */}
					<div
						className={
							"md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
							collapseShow
						}
					>
						{/* Collapse header */}
						<div className="md:min-w-full md:hidden block  pb-4 mb-4 border-b border-solid border-blueGray-200">
							<div className="flex flex-wrap">
								<div className="w-6/12">
									<a className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm  font-bold p-4 px-0">
										Manifold Computers
									</a>
								</div>
								<div className="w-6/12 flex justify-end">
									<button
										type="button"
										className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
										onClick={() => setCollapseShow("hidden")}
									>
										<FontAwesomeIcon
											icon={faTimes}
											style={{ fontSize: 20, color: "red", paddingRight: 5 }}
										/>
									</button>
								</div>
							</div>
						</div>
						{/* Form */}
						{/* <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form> */}
						{/* Navigation */}
						<ul className="md:flex-col md:min-w-full flex flex-col list-none">
							<li className="items-center">
								<a className="text-red-600 hover:text-red-600 text-sm  py-3 font-bold block">
									<FontAwesomeIcon
										icon={faFile}
										style={{ fontSize: 13, color: "red", paddingRight: 15 }}
									/>
									Dashboard
								</a>
							</li>

							<li className="items-center">
								<a className="text-blueGray-700 hover:text-red-600 text-sm   py-3 font-bold block">
									<FontAwesomeIcon
										icon={faUserPlus}
										style={{ fontSize: 13, color: "black", paddingRight: 10 }}
									/>
									User Management
								</a>
							</li>

							<li className="items-center">
								<a className="text-blueGray-700 hover:text-red-600 text-sm  py-3 font-bold block">
									<FontAwesomeIcon
										icon={faCog}
										style={{ fontSize: 13, color: "black", paddingRight: 13 }}
									/>
									Setting
								</a>
							</li>
							<li className="items-center">
								<a className="text-blueGray-700 hover:text-red-600 text-sm   py-3 font-bold block">
									<FontAwesomeIcon
										icon={faSignOut}
										style={{ fontSize: 13, color: "black", paddingRight: 13 }}
									/>
									Logout
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};
export default Sidebar;
