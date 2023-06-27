import React from "react";
import { useSortableTable } from "../useSortableTable";
import TableHead from "./TableHead";
import BillTableBody from "./BillTableBody";

const BillTable = ({
  setShowBillDetailModal,
  setBillDetail,
  caption,
  data,
  columns,
}) => {
  const [tableData, handleSorting] = useSortableTable(data, columns);

  return (
    <>
      <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-red-700">
                  Outflow details
                </h3>
              </div>
            </div>
          </div>
          <h2 className="text-black text-sm font-semibold px-7">Bills</h2>
          <div className="table-wrp block max-h-96  overflow-x-auto">
            <table className="table">
              <caption>{caption}</caption>
              <TableHead {...{ columns, handleSorting }} />
              <BillTableBody
                {...{
                  setShowBillDetailModal,
                  setBillDetail,
                  columns,
                  tableData,
                }}
              />
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default BillTable;
