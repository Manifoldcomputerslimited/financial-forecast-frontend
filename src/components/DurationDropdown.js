import React from "react";
import { createPopper } from "@popperjs/core";


const DurationDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <select
        id="duration"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option defaultValue="day">1 Day</option>
        <option defaultValue="week">1 Week</option>
        <option value="month">1 Month</option>
        <option value="quarterly" selected>
          3 Months
        </option>
        <option value="halfayear">6 Months</option>
        <option value="yearly">12 Months</option>
      </select>
    </>
  );
};

export default DurationDropdown;
