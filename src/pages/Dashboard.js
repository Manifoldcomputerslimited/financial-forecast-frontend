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
  let [code, setCode] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let isZohoAuthenticated = useSelector(
    (state) => state.auth.isZohoAuthenticated
  );

  let isGeneratingReport = useSelector(
    (state) => state.forecast.isGeneratingReport
  );
  let { forecastNumber, forecastPeriod } = useSelector(
    (state) => state.forecast.forecastInfo
  );
  let { openingBalance, totalCashInflow, totalCashOutflow, closingBalance } =
    useSelector((state) => state.forecast.report);
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
                <InvoiceTable />

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
