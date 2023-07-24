import React from "react";
import Chart from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getCharts } from "../redux/slices/zoho";
import { createPopper } from "@popperjs/core";

const LineChart = () => {
  const dispatch = useDispatch();
  const charts = useSelector((state) => state.zoho.charts);
  let isChartLoading = useSelector((state) => state.zoho.isChartLoading);
  let { forecastNumber, forecastPeriod } = useSelector(
    (state) => state.forecast.forecastInfo
  );

  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  React.useEffect(() => {
    dispatch(getCharts({forecastNumber, forecastPeriod}));
    if(isChartLoading == undefined) {
     isChartLoading = false;
    }


    var config = {
      type: "line",
      data: {
          labels: isChartLoading ? [] : charts.months,
        datasets: [
          {
            label: 'Inflow',
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: isChartLoading ? [] : charts.forecastNairaInflow,
            fill: false,
          },
          {
            label: 'Outflow',
            fill: false,
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: isChartLoading ? [] : charts.forecastNairaOutflow,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "black",
        },
        legend: {
          labels: {
            fontColor: "black",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "black",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "black",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "black",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded  bg-slate-300">
          <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h6 className="text-black mb-1 text-xs font-semibold">
                  Forecast Overview
                </h6>
                <h2 className="text-black text-xl font-semibold">
                  Sales Report
                </h2>
              </div>
            </div>
          </div>
          <div className="p-4 flex-auto">
            {/* Chart */}
            <div className="relative" style={{ height: "350px" }}>
              <canvas id="line-chart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LineChart;
