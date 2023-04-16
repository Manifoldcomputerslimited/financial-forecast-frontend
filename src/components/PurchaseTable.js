import React from 'react';
import { useSelector } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

const PurchaseTable = (props) => {
  let isGeneratingReport = useSelector(
    (state) => state.forecast.isGeneratingReport
  );
  let purchases = useSelector((state) => state.forecast.purchases);

  const updatePurchaseDetail = (purchase) => {
    props.setShowPurchaseDetailModal(true);
    props.setPurchaseDetail(purchase);
  };

  return (
    <>
      <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <h2 className="text-black text-sm font-semibold px-7">
            Purchase Orders
          </h2>
          <div className="table-wrp block max-h-96  overflow-x-auto">
            {/* Projects table */}
            <table className="w-full">
              <thead className="bg-white border-blueGray-100 sticky top-0">
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                    #
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  font-bold text-left">
                    Purchase ID
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  font-semibold text-left">
                    Vendor Name
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Naira Balance
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Dollar Balance
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Balance Due
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Delivery Date
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Currency
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Status
                  </th>
                </tr>
              </thead>
              {!isGeneratingReport && (
                <tbody className="border-blueGray-100 ">
                  {purchases.map((purchase, i) => (
                    <tr
                      key={purchase.id}
                      onClick={() => updatePurchaseDetail(purchase)}
                    >
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {i + 1}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {purchase.purchaseOrderNumber}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {purchase.vendorName}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {purchase.currencyCode == 'NGN' ? (
                          <>
                            <span className="font-semibold text-sm">
                              &#8358;
                            </span>{' '}
                            <CurrencyFormat
                              value={parseFloat(purchase.balance)}
                              displayType={'text'}
                              thousandSeparator={true}
                              decimalScale={2}
                            />
                          </>
                        ) : null}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {purchase.currencyCode == 'USD' ? (
                          <>
                            <span className="font-semibold text-sm">&#36;</span>{' '}
                            <CurrencyFormat
                              value={parseFloat(purchase.balance)}
                              displayType={'text'}
                              thousandSeparator={true}
                              decimalScale={2}
                            />
                          </>
                        ) : null}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {purchase.currencyCode != 'USD' ? (
                          <span className="font-semibold text-sm">&#8358;</span>
                        ) : (
                          <span className="font-semibold text-sm">&#36;</span>
                        )}{' '}
                        <CurrencyFormat
                          value={parseFloat(purchase.balance)}
                          displayType={'text'}
                          thousandSeparator={true}
                          decimalScale={2}
                        />
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                        {purchase.deliveryDate}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                        {purchase.currencyCode}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                        {purchase.status}
                      </td>
                    </tr>
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
export default PurchaseTable;
