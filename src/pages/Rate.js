import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { getExchangeRates } from '../redux/slices/forecast';

const Rate = () => {
  const dispatch = useDispatch();
  const isExchangeRateListLoading = useSelector(
    (state) => state.forecast.isExchangeRateListLoading
  );
  const rates = useSelector((state) => state.forecast.rates);

  useEffect(() => {
    dispatch(getExchangeRates());
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
              Exchange Rates
            </a>
          </div>
        </nav>

        <div>
          <div className="w-full px-4 pt-12">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden ">
                  <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-pink-700">
                    <thead className="bg-gray-100 dark:bg-pink-700 sticky">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-white uppercase dark:text-white"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-white uppercase dark:text-white"
                        >
                          Rate
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-white uppercase dark:text-white"
                        >
                          Date
                        </th>
                        {/* <th scope="col" className="p-4">
                          <span className="sr-only">Edit</span>
                        </th> */}
                      </tr>
                    </thead>
                    {!isExchangeRateListLoading && (
                      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {rates.map((rate, i) => (
                          <tr
                            key={rate.id}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {i + 1}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                              {rate.rate}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {dayjs(rate.createdAt).format('DD-MMM-YYYY')}
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

export default Rate;
