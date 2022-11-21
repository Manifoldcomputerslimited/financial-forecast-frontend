import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

const InvoiceTable = (props) => {
  let isGeneratingReport = useSelector(
    (state) => state.forecast.isGeneratingReport
  );
  let invoices = useSelector((state) => state.forecast.invoices);

  const updateInvoiceDetail = (invoice) => {
    props.setShowDetailModal(true);
    props.setInvoiceDetail(invoice);
  };
  
  return (
    <>
      <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-red-700">
                  Inflow details
                </h3>
              </div>
            </div>
          </div>
          <h2 className="text-black text-sm font-semibold px-7">Invoices</h2>
          <div className="table-wrp block max-h-96  overflow-x-auto">
            {/* Projects table */}

            <table className="items-center w-full bg-transparent border-collapse">
              <thead className="bg-white border-blueGray-100 sticky top-0">
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                    #
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  font-bold text-left">
                    Invoice No.
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  font-semibold text-left">
                    Customer Name
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Balance Due
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Currency
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Status
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Due Date
                  </th>
                </tr>
              </thead>
              {!isGeneratingReport && (
                <tbody className="">
                  {invoices.map((invoice, i) => (
                    // <div>
                    <tr
                      key={invoice.id}
                      onClick={() => updateInvoiceDetail(invoice)}
                    >
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {i + 1}
                      </th>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {invoice.invoiceNumber}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {invoice.customerName}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <CurrencyFormat
                          value={parseFloat(invoice.balance)}
                          displayType={'text'}
                          thousandSeparator={true}
                          decimalScale={2}
                        />
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                        {invoice.currencyCode}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                        {invoice.status}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                        {invoice.dueDate}
                      </td>
                    </tr>
                    // </div>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default InvoiceTable;
