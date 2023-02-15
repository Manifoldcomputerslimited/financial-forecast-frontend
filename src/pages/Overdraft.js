import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Form from '../components/Form';
import Edit from '../components/Edit';
import Delete from '../components/Delete';
import { getOverdrafts } from '../redux/slices/zoho';
import CurrencyFormat from 'react-currency-format';

const Overdraft = () => {
  const dispatch = useDispatch();
  const isOverdraftLoading = useSelector(
    (state) => state.zoho.isOverdraftLoading
  );
  const overdrafts = useSelector((state) => state.zoho.overdrafts);

  useEffect(() => {
    dispatch(getOverdrafts());
  }, [dispatch]);

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        {/* Navbar */}
        <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
          <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
            {/* Brand */}
            <a
              className="text-black text-sm uppercase hidden lg:inline-block font-semibold"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              Overdraft
            </a>

            <Form />
          </div>
        </nav>

        <div className="w-full px-9 pt-12 ">
          {/* Projects table */}
          <table className="items-center w-full  border-separate border ">
            <thead className="bg-white border-blueGray-100 sticky top-0">
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  AccountName
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Account Type
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Account Number
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Bank Name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Currency
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Amount
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Action
                </th>
              </tr>
            </thead>
            {!isOverdraftLoading && (
              <tbody>
                {overdrafts.map((overdraft, i) => (
                  <tr>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {overdraft.accountName}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {overdraft.accountType}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {overdraft.accountNumber}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {overdraft.bankName}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {overdraft.currency}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-black">
                      {overdraft.currency != 'USD' ? (
                        <span className="font-semibold text-sm text-black">
                          &#8358;
                        </span>
                      ) : (
                        <span className="font-semibold text-sm text-black">
                          &#36;
                        </span>
                      )}
                      <CurrencyFormat
                        value={`${parseFloat(overdraft.amount)}`}
                        displayType={'text'}
                        thousandSeparator={true}
                        decimalScale={2}
                      />
                    </td>
                    <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex justify-start space-x-5">
                        <Edit overdraft={overdraft} />
                        <Delete overdraft={overdraft} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
};
export default Overdraft;
