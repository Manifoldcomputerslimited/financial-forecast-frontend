import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { generateReport } from "../redux/slices/forecast";


const DurationDropdown = () => {
  const dispatch = useDispatch();
  let { durations, selectedPeriod } = useSelector(state => state.forecast.forecastDropdown)


  const updateSelectedPeriod = (e) => {
  
    // call opening balance
    dispatch(generateReport(
      {
        id: e.target.value,
        forecastNumber: durations[e.target.value].forecastNumber,
        forecastPeriod: durations[e.target.value].forecastPeriod
      }));
  }

  return (
    <>
      <select
        id="duration"
        className="bg-gray-50 mr-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={selectedPeriod}
        onChange={updateSelectedPeriod}
      >
        {durations.map(({ forecastNumber, label }, index) => <option key={index} value={index}>{label}</option>)}
      </select>
    </>
  );
};

export default DurationDropdown;
