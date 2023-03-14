import { useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { getBankAccounts } from '../redux/slices/forecast';

const OpeningBalance = () => {
  const dispatch = useDispatch();
  const isBankAccountsLoading = useSelector(
    (state) => state.forecast.isBankAccountsLoading
  );
  const bankAccounts = useSelector((state) => state.forecast.bankAccounts);

  useEffect(() => {
    dispatch(getBankAccounts());
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
              Opening Balance
            </a>
          </div>
        </nav>

        <div>
          <div className="w-full px-4 pt-12">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden ">
                  <table className="min-w-full divide-y divide-gray-200 table-fixed dark:gray-400">
                    <thead className="bg-gray-100 dark:bg-gray-400 sticky">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-black uppercase dark:text-black"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-black uppercase dark:text-black"
                        >
                          Account Name
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-black uppercase dark:text-black"
                        >
                          Account Type
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-black uppercase dark:text-black"
                        >
                          Currency
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-black uppercase dark:text-black"
                        >
                          Balance
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-black uppercase dark:text-black"
                        >
                          Overdraft
                        </th>
                      </tr>
                    </thead>
                    {!isBankAccountsLoading && (
                      <tbody className="bg-white divide-y divide-gray-300 dark:bg-gray-300 dark:divide-gray-300">
                        {bankAccounts.map((bankAccount, i) => (
                          <tr
                            key={bankAccount.id}
                            className="hover:bg-gray-100 dark:hover:bg-white-400"
                          >
                            <td className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black">
                              {i + 1}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black">
                              {bankAccount.accountName}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black">
                              {bankAccount.accountType}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black">
                              {bankAccount.currency}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black">
                              {bankAccount.currency != 'USD' ? (
                                <span className="font-semibold text-sm text-black">
                                  &#8358;
                                </span>
                              ) : (
                                <span className="font-semibold text-sm text-black">
                                  &#36;
                                </span>
                              )}{' '}
                              <CurrencyFormat
                                value={parseFloat(bankAccount.balance)}
                                displayType={'text'}
                                thousandSeparator={true}
                                decimalScale={2}
                              />
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black">
                              {bankAccount.currency != 'USD' ? (
                                <span className="font-semibold text-sm text-black">
                                  &#8358;
                                </span>
                              ) : (
                                <span className="font-semibold text-sm text-black">
                                  &#36;
                                </span>
                              )}{' '}
                              <CurrencyFormat
                                value={parseFloat(bankAccount.overdraftBalance)}
                                displayType={'text'}
                                thousandSeparator={true}
                                decimalScale={2}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpeningBalance;
