import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate, useSearchParams } from "react-router-dom";


import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";

import { zoho } from '../redux/slices/zoho'

import {
	faWallet,
	faGem,
	faAnchor,
	faReceipt,
	faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = (props) => {
	let [searchParams, setSearchParams] = useSearchParams(props);
	// grant user access to zoho
	let [zohoGrant, setZohoGrant] = useState(true);
	let [isLoading, setIsLoading] = useState(true);
	let [code, setCode] = useState("");
	const dispatch = useDispatch();
	const zohoLoading = useSelector(state => state.zoho.isLoading);
	let zohoAuthenticated = localStorage.getItem('zohoAuthenticated') ? localStorage.getItem('zohoAuthenticated') : false

	useEffect(() => {

		if (searchParams.get('error') === 'access_denied') {
			setZohoGrant(false);
		}

		if (!zohoAuthenticated && searchParams.get('code')) {
			setCode(searchParams.get('code'));
			dispatch(zoho({ code: searchParams.get('code') }));
		}

		console.log(localStorage.getItem('zohoToken'));
		// check if zoho is authenticated using the access token
		if (localStorage.getItem('zohoToken')) {
			zohoAuthenticated = true;
		}
		setIsLoading(false);

	}, [searchParams]);
	return (

		<>
			{(zohoGrant && isLoading) && (
				<Navigate to="/" replace={true} />
			)}

			{(!zohoGrant && !isLoading) && (
				<Navigate to="/login" replace={true} />
			)}

			{(zohoAuthenticated) && (
				<>
					<Sidebar />
					<div className="relative md:ml-64 bg-blueGray-100">
						<Navbar />

						{/* Header */}
						<div className="relative bg-pink-600 md:pt-32 pb-32 pt-12">
							<div className="px-4 md:px-10 mx-auto w-full">
								<div>
									{/* Card stats */}
									<div className="flex flex-wrap">
										<div className="w-full lg:w-6/12 xl:w-3/12 px-4">
											<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
												<div className="flex-auto p-4">
													<div className="flex flex-wrap">
														<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
															<h5 className="text-red-700 font-bold text-xs">
																Capital
															</h5>
															<span className="font-semibold text-md text-blueGray-700">
																<span className="font-semibold text-sm text-red-700">
																	&#8358;
																</span>{" "}
																350,897
															</span>
														</div>
														<div className="relative w-auto pl-4 flex-initial">
															<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
																<FontAwesomeIcon
																	icon={faWallet}
																	style={{ fontSize: 20, color: "white" }}
																/>
																{/* <FontAwesomeIcon icon={solid("user-secret")} /> */}
															</div>
														</div>
													</div>
													<p className="text-sm text-blueGray-400 mt-4">
														<span className="font-semibold">
															<span className="text-sm text-red-700">&#36;</span>{" "}
															131,830
														</span>
													</p>
												</div>
											</div>
										</div>
										<div className="w-full lg:w-6/12 xl:w-3/12 px-4">
											<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
												<div className="flex-auto p-4">
													<div className="flex flex-wrap">
														<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
															<h5 className="text-red-700 font-bold text-xs">
																Total Cash Inflow
															</h5>
															<span className="font-semibold text-md text-blueGray-700">
																<span className="font-semibold text-sm text-red-700">
																	&#8358;
																</span>{" "}
																133,350,897
															</span>
														</div>
														<div className="relative w-auto pl-4 flex-initial">
															<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-800">
																<FontAwesomeIcon
																	icon={faGem}
																	style={{ fontSize: 20, color: "white" }}
																/>
															</div>
														</div>
													</div>
													<p className="text-sm text-blueGray-400 mt-4">
														<span className="font-semibold mr-2">
															<span className="text-sm text-red-700">&#36;</span>{" "}
															131,830
														</span>
														<span className="whitespace-nowrap">for 4 months</span>
													</p>
												</div>
											</div>
										</div>
										<div className="w-full lg:w-6/12 xl:w-3/12 px-4">
											<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
												<div className="flex-auto p-4">
													<div className="flex flex-wrap">
														<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
															<h5 className="text-red-700 font-bold text-xs">
																Total Cash Outflow
															</h5>
															<span className="font-semibold text-md text-blueGray-700">
																<span className="font-semibold text-sm text-red-700">
																	&#8358;
																</span>{" "}
																133,350,897
															</span>
														</div>
														<div className="relative w-auto pl-4 flex-initial">
															<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-green-700">
																<FontAwesomeIcon
																	icon={faReceipt}
																	style={{ fontSize: 20, color: "white" }}
																/>
															</div>
														</div>
													</div>
													<p className="text-sm text-blueGray-400 mt-4">
														<span className="font-semibold mr-2">
															<span className="text-sm text-red-700">&#36;</span>{" "}
															131,830
														</span>
														<span className="whitespace-nowrap">for 4 months</span>
													</p>
												</div>
											</div>
										</div>
										<div className="w-full lg:w-6/12 xl:w-3/12 px-4">
											<div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
												<div className="flex-auto p-4">
													<div className="flex flex-wrap">
														<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
															<h5 className="text-red-700 font-bold text-xs">
																Total Bills
															</h5>
															<span className="font-semibold text-md text-blueGray-700">
																<span className="font-semibold text-sm text-red-700">
																	&#8358;
																</span>{" "}
																133,350,897
															</span>
														</div>
														<div className="relative w-auto pl-4 flex-initial">
															<div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-yellow-600">
																<FontAwesomeIcon
																	icon={faFileInvoice}
																	style={{ fontSize: 20, color: "white" }}
																/>
															</div>
														</div>
													</div>
													<p className="text-sm text-blueGray-400 mt-4">
														<span className="font-semibold mr-2">
															<span className="text-sm text-red-700">&#36;</span>{" "}
															131,830
														</span>
														<span className="whitespace-nowrap">for 4 months</span>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="px-4 md:px-10 mx-auto w-full -m-24">
							<div className="flex flex-wrap">
								<LineChart />
								<BarChart />
							</div>
							<div className="flex flex-wrap mt-4">
								<div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
									<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
										<div className="rounded-t mb-0 px-4 py-3 border-0">
											<div className="flex flex-wrap items-center">
												<div className="relative w-full px-4 max-w-full flex-grow flex-1">
													<h3 className="font-semibold text-base text-red-700">
														Inflow details
													</h3>
												</div>
												{/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
												<button
													className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
													type="button"
													style={{ transition: "all .15s ease" }}
												>
													See all
												</button>
											</div> */}
											</div>
										</div>
										<div className="table-wrp block max-h-96  overflow-x-auto">
											{/* Projects table */}
											<table className="items-center w-full bg-transparent border-collapse">
												<thead className="bg-white border-blueGray-100 sticky top-0">
													<tr>
														<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
															#
														</th>
														<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
															Name
														</th>
														<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
															Email
														</th>
														<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
															Balance Due
														</th>
														<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
															Balance Due
														</th>
														<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
															Balance Due
														</th>
														<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
															Balance Due
														</th>
													</tr>
												</thead>
												<tbody className="">
													<tr>
														<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
															1
														</th>
														<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
															/argon/
														</th>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															4,569
														</td>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															340
														</td>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															<i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
															46,53%
														</td>
													</tr>
													<tr>
														<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
															2
														</th>
														<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
															/argon/
														</th>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															4,569
														</td>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															340
														</td>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															<i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
															46,53%
														</td>
													</tr>
													<tr>
														<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
															3
														</th>
														<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
															/argon/
														</th>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															4,569
														</td>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															340
														</td>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															<i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
															46,53%
														</td>
													</tr>
													<tr>
														<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
															4
														</th>
														<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
															/argon/index.html
														</th>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															3,985
														</td>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															319
														</td>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															<i className="fas fa-arrow-down text-orange-500 mr-4"></i>
															46,53%
														</td>
													</tr>
													<tr>
														<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
															5
														</th>
														<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
															/argon/charts.html
														</th>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															3,513
														</td>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															294
														</td>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															<i className="fas fa-arrow-down text-orange-500 mr-4"></i>
															36,49%
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>

								<div className="w-full xl:w-6/12 px-4">
									<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
										<div className="rounded-t mb-0 px-4 py-3 border-0">
											<div className="flex flex-wrap items-center">
												<div className="relative w-full px-4 max-w-full flex-grow flex-1">
													<h3 className="font-semibold text-base text-red-700">
														Outflow details
													</h3>
												</div>
												{/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
												<button
													className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
													type="button"
													style={{ transition: "all .15s ease" }}
												>
													See all
												</button>
											</div> */}
											</div>
										</div>
										<div className="table-wrp block max-h-96  overflow-x-auto">
											{/* Projects table */}
											<table className="w-full">
												<thead className="bg-white border-blueGray-100 sticky top-0">
													<tr>
														<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
															ID
														</th>
														<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
															Name
														</th>
														<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
															Amount
														</th>
													</tr>
												</thead>
												<tbody className="border-blueGray-100 ">
													<tr>
														<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
															1
														</th>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															Abiodun Manasseh
														</td>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															<div className="flex items-center">
																<span className="mr-2">60%</span>
															</div>
														</td>
													</tr>
													<tr>
														<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
															1
														</th>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															Abiodun Manasseh
														</td>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															<div className="flex items-center">
																<span className="mr-2">60%</span>
															</div>
														</td>
													</tr>
													<tr>
														<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
															1
														</th>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															Abiodun Manasseh
														</td>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															<div className="flex items-center">
																<span className="mr-2">60%</span>
															</div>
														</td>
													</tr>
													<tr>
														<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
															1
														</th>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															Abiodun Manasseh
														</td>
														<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
															<div className="flex items-center">
																<span className="mr-2">60%</span>
															</div>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
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
					</div>
				</>
			)}

		</>
	);
};

export default Dashboard;