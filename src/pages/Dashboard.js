import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyFormat from 'react-currency-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navigate, useSearchParams, useNavigate } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';

import { zoho } from '../redux/slices/zoho';
import { logout, getUser } from '../redux/slices/auth';
import { generateReport } from '../redux/slices/forecast';

import {
  faWallet,
  faGem,
  faReceipt,
  faFileInvoice,
} from '@fortawesome/free-solid-svg-icons';
import { withAuth } from '../hoc/withAuth';
import InvoiceTable from '../components/InvoiceTable';
import BillTable from '../components/BillTable';
import SaleTable from '../components/SaleTable';
import PurchaseTable from '../components/PurchaseTable';

const Dashboard = (props) => {
  let [searchParams, setSearchParams] = useSearchParams(props);
  // grant user access to zoho
  let [zohoGrant, setZohoGrant] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [showDetailModal, setShowDetailModal] = useState(false);
  let [invoiceDetail, setInvoiceDetail] = useState('');
  let [code, setCode] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const zohoLoading = useSelector((state) => state.zoho.isLoading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let isZohoAuthenticated = useSelector(
    (state) => state.auth.isZohoAuthenticated
  );
  let isDownloadingReport = useSelector(
    (state) => state.forecast.isDownloadingReport
  );
  let isGeneratingReport = useSelector(
    (state) => state.forecast.isGeneratingReport
  );
  let { forecastNumber, forecastPeriod } = useSelector(
    (state) => state.forecast.forecastInfo
  );
  let { openingBalance, totalCashInflow, totalCashOutflow, closingBalance } =
    useSelector((state) => state.forecast.report);
  let invoices = useSelector((state) => state.forecast.invoices);
  let bills = useSelector((state) => state.forecast.bills);
  let user = useSelector((state) => state.auth.user);
  let zohoAuthenticated = localStorage.getItem('zohoAuthenticated')
    ? localStorage.getItem('zohoAuthenticated')
    : false;
  let { selectedPeriod } = useSelector(
    (state) => state.forecast.forecastDropdown
  );

  useEffect(() => {
    dispatch(getUser());
    if (searchParams.get('error') === 'access_denied') {
      navigate('/login');
      dispatch(logout());
      return;
    }

    if (!zohoAuthenticated && searchParams.get('code')) {
      setZohoGrant(true);
      setCode(searchParams.get('code'));
      dispatch(zoho({ code: searchParams.get('code') }));

      return;
    }

    if (!zohoAuthenticated && isAuthenticated) {
      dispatch(zoho({ code: '' }));
    }
    if (localStorage.getItem('zohoAccessToken')) {
      if (zohoAuthenticated && isAuthenticated && !isLoading) {
        dispatch(
          generateReport({ id: selectedPeriod, forecastNumber, forecastPeriod })
        );
      }
    }

    setIsLoading(false);
    setZohoGrant(true);
  }, [zohoGrant, searchParams, localStorage.getItem('zohoAccessToken')]);

  return (
    <>
      {isZohoAuthenticated && isLoading && isGeneratingReport && (
        // <p>isZohoAuthenticated {{isZohoAuthenticated}}, isLoading {{isLoading}}</p>
        <Navigate to="/" replace={true} />
      )}

      {isLoading && (
        <>
          <div className="grid h-screen place-items-center">
            <InfinitySpin width="200" color="red" />
          </div>
        </>
      )}

      {isGeneratingReport && (
        <>
          <div className="grid h-screen place-items-center">
            <div>
              <h1>Please wait while we generate your report...</h1>
              <div className="flex items-center justify-center">
                <InfinitySpin width="200" color="red" />
              </div>
            </div>
          </div>
        </>
      )}

      {!zohoGrant && !isAuthenticated && !isLoading && (
        <Navigate to="/login" replace={true} />
      )}

      {zohoAuthenticated && !isGeneratingReport && (
        <>
          <Sidebar />
          <div className="relative md:ml-64 bg-blueGray-100">
            <Navbar user={user} />

            {showDetailModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="fixed w-auto my-6 mx-auto max-w-xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-around mt-5 rounded-t">
                        <div className="flex-initial w-64 justify-center">
                          <h3 className="text-red-700 font-medium text-lg mb-1 ">
                            Invoice Detail
                          </h3>
                        </div>
                        <button
                          onClick={() => setShowDetailModal(false)}
                          type="button"
                          className=" rounded-md p-1 inline-flex items-center justify-center text-red-400 hover:text-red-500 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
                        >
                          <span className="sr-only">Close menu</span>

                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative px-8 flex-auto">
                        <div className="relative w-12/12">
                          <p className="my-4 text-slate-500 text-lg leading-relaxed">
                            Invoice detail for {invoiceDetail.invoiceId}
                          </p>

                          <div className="mb-4 md:flex md:justify-between">
                            <div className="w-full">
                              <label className="block text-gray-700">
                                Customer Name
                              </label>

                              <input
                                type="text"
                                name="email"
                                value={invoiceDetail.customerName}
                                style={{ transition: 'all .15s ease' }}
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="mb-4 md:flex md:justify-between">
                            <div className="w-full">
                              <label className="block text-gray-700">
                                Reference Number
                              </label>

                              <input
                                type="text"
                                name="email"
                                value={invoiceDetail.refrenceNumber}
                                style={{ transition: 'all .15s ease' }}
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="mb-4 md:flex md:justify-between">
                            <div className="mb-4 md:mr-2 md:mb-0">
                              <label className="block text-gray-700">
                                Invoice Number
                              </label>

                              <input
                                type="text"
                                name="email"
                                value={invoiceDetail.invoiceNumber}
                                style={{ transition: 'all .15s ease' }}
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                              />
                            </div>
                            <div className="mb-4 md:mr-2 md:mb-0">
                              <label className="block text-gray-700">
                                Status
                              </label>

                              <input
                                type="text"
                                name="email"
                                value={invoiceDetail.status}
                                style={{ transition: 'all .15s ease' }}
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="mb-4 md:flex md:justify-between">
                            <div className="mb-4 md:mr-2 md:mb-0">
                              <label className="block text-gray-700">
                                Balance
                              </label>

                              <input
                                type="text"
                                name="email"
                                value={invoiceDetail.balance}
                                style={{ transition: 'all .15s ease' }}
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                              />
                            </div>
                            <div className="mb-4 md:mr-2 md:mb-0">
                              <label className="block text-gray-700">
                                Exchange Rate
                              </label>

                              <input
                                type="text"
                                name="email"
                                value={invoiceDetail.exchangeRate}
                                style={{ transition: 'all .15s ease' }}
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="mb-4 md:flex md:justify-between">
                            <div className="mb-4 md:mr-2 md:mb-0">
                              <label className="block text-gray-700">
                                Date created
                              </label>

                              <input
                                type="text"
                                name="email"
                                value={invoiceDetail.date}
                                style={{ transition: 'all .15s ease' }}
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                              />
                            </div>
                            <div className="mb-4 md:mr-2 md:mb-0">
                              <label className="block text-gray-700">
                                Due Date
                              </label>

                              <input
                                type="text"
                                name="email"
                                value={invoiceDetail.dueDate}
                                style={{ transition: 'all .15s ease' }}
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-center p-6 mt-5 rounded-b"></div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}

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
                                Opening Balance
                              </h5>
                              <span className="font-semibold text-md text-blueGray-700">
                                <span className="font-semibold text-sm text-red-700">
                                  &#8358;
                                </span>{' '}
                                <CurrencyFormat
                                  value={parseFloat(openingBalance.naira)}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  decimalScale={2}
                                />
                              </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                              <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                                <FontAwesomeIcon
                                  icon={faWallet}
                                  style={{ fontSize: 20, color: 'white' }}
                                />
                                {/* <FontAwesomeIcon icon={solid("user-secret")} /> */}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-blueGray-400 mt-4">
                            <span className="font-semibold">
                              <span className="text-sm text-red-700">
                                &#36;
                              </span>{' '}
                              <CurrencyFormat
                                value={parseFloat(openingBalance.dollar)}
                                displayType={'text'}
                                thousandSeparator={true}
                                decimalScale={2}
                              />
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
                                </span>{' '}
                                <CurrencyFormat
                                  value={parseFloat(totalCashInflow.naira)}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  decimalScale={2}
                                />
                              </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                              <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-800">
                                <FontAwesomeIcon
                                  icon={faGem}
                                  style={{ fontSize: 20, color: 'white' }}
                                />
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-blueGray-400 mt-4">
                            <span className="font-semibold mr-2">
                              <span className="text-sm text-red-700">
                                &#36;
                              </span>{' '}
                              <CurrencyFormat
                                value={parseFloat(totalCashInflow.dollar)}
                                displayType={'text'}
                                thousandSeparator={true}
                                decimalScale={2}
                              />
                            </span>
                            <span className="whitespace-nowrap">
                              for {forecastNumber} {forecastPeriod}
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
                                Total Cash Outflow
                              </h5>
                              <span className="font-semibold text-md text-blueGray-700">
                                <span className="font-semibold text-sm text-red-700">
                                  &#8358;
                                </span>{' '}
                                <CurrencyFormat
                                  value={parseFloat(totalCashOutflow.naira)}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  decimalScale={2}
                                />
                              </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                              <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-green-700">
                                <FontAwesomeIcon
                                  icon={faReceipt}
                                  style={{ fontSize: 20, color: 'white' }}
                                />
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-blueGray-400 mt-4">
                            <span className="font-semibold mr-2">
                              <span className="text-sm text-red-700">
                                &#36;
                              </span>{' '}
                              <CurrencyFormat
                                value={parseFloat(totalCashOutflow.dollar)}
                                displayType={'text'}
                                thousandSeparator={true}
                                decimalScale={2}
                              />
                            </span>
                            <span className="whitespace-nowrap">
                              for {forecastNumber} {forecastPeriod}
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
                                Closing Balance
                              </h5>
                              <span className="font-semibold text-md text-blueGray-700">
                                <span className="font-semibold text-sm text-red-700">
                                  &#8358;
                                </span>{' '}
                                <CurrencyFormat
                                  value={parseFloat(closingBalance.naira)}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  decimalScale={2}
                                />
                              </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                              <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-yellow-600">
                                <FontAwesomeIcon
                                  icon={faFileInvoice}
                                  style={{ fontSize: 20, color: 'white' }}
                                />
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-blueGray-400 mt-4">
                            <span className="font-semibold mr-2">
                              <span className="text-sm text-red-700">
                                &#36;
                              </span>{' '}
                              <CurrencyFormat
                                value={parseFloat(closingBalance.dollar)}
                                displayType={'text'}
                                thousandSeparator={true}
                                decimalScale={2}
                              />
                            </span>
                            <span className="whitespace-nowrap">
                              for {forecastNumber} {forecastPeriod}
                            </span>
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
                <InvoiceTable
                  setShowDetailModal={setShowDetailModal}
                  setInvoiceDetail={setInvoiceDetail}
                />

                <BillTable />
              </div>

              <div className="flex flex-wrap mt-4">
                <SaleTable />

                <PurchaseTable />
              </div>

              <footer className="block py-4">
                <div className="container mx-auto px-4">
                  <hr className="mb-4 border-b-1 border-blueGray-200" />
                  <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4">
                      <div className="text-sm text-blueGray-500 font-semibold py-1">
                        Copyright © {new Date().getFullYear()}{' '}
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

export default withAuth(true)(Dashboard);
