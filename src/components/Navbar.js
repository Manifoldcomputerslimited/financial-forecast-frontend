import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  downloadReport,
  generateReport,
  resynApplication,
} from '../redux/slices/forecast';
import DurationDropdown from './DurationDropdown.js';
import Moment from 'react-moment';
import moment from 'moment';

const Navbar = (props) => {
  const dispatch = useDispatch();
  let { selectedPeriod } = useSelector(
    (state) => state.forecast.forecastDropdown
  );
  let { forecastNumber, forecastPeriod } = useSelector(
    (state) => state.forecast.forecastInfo
  );
  let user = props.user;

  const downloadReportHandler = (e) => {
    e.preventDefault();
    let filename =
      `Forecast-${forecastNumber}-${forecastPeriod}` + moment().toISOString();
    dispatch(downloadReport({ forecastNumber, forecastPeriod, filename }));
  };

  const syncHandler = async (e) => {
    e.preventDefault();
    await dispatch(resynApplication());
    await dispatch(
      generateReport({ id: selectedPeriod, forecastNumber, forecastPeriod })
    );
  };

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>

          {/* Duration */}
          <ul className="flex-col md:flex-row list-none hidden md:flex">
            <button
              onClick={syncHandler}
              className="mr-2 justify-center  py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-white hover:text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-900"
            >
              Sync
            </button>
            <button
              onClick={downloadReportHandler}
              className="mr-2 justify-center  py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-900 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-900"
            >
              Download
            </button>
            {/* TODO:: enhance or delete this */}

            <DurationDropdown />
            <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2">
              Welcome, {user.firstName}
            </p>
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
};

export default Navbar;
