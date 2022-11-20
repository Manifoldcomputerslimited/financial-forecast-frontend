import Sidebar from '../components/Sidebar';

const Rate = () => {
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
            <div class="overflow-x-auto shadow-md sm:rounded-lg">
              <div class="inline-block min-w-full align-middle">
                <div class="overflow-hidden ">
                  <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-pink-700">
                    <thead class="bg-gray-100 dark:bg-pink-700 sticky">
                      <tr>
                        <th
                          scope="col"
                          class="py-3 px-6 text-xs font-medium tracking-wider text-left text-white uppercase dark:text-white"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          class="py-3 px-6 text-xs font-medium tracking-wider text-left text-white uppercase dark:text-white"
                        >
                          Rate
                        </th>
                        <th
                          scope="col"
                          class="py-3 px-6 text-xs font-medium tracking-wider text-left text-white uppercase dark:text-white"
                        >
                          Date
                        </th>
                        {/* <th scope="col" class="p-4">
                          <span class="sr-only">Edit</span>
                        </th> */}
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          1
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          440
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          04-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          2
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          441.39
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          05-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          3
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          441.21
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          06-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          4
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          441.21
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          07-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          5
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          441.21
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          09-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          1
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          440
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          04-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          1
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          440
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          04-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          1
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          440
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          04-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          1
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          440
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          04-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          1
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          440
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          04-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          1
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          440
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          04-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          1
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          440
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          04-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          1
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          440
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          04-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          1
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          440
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          04-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          1
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          440
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          04-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          1
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          440
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          04-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          1
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          440
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          04-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          1
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          440
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          04-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          1
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          440
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          04-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          1
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          440
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          04-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          1
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          440
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          04-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          1
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          440
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          04-11-2022
                        </td>
                        {/* <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            href="#"
                            class="text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td> */}
                      </tr>
                    </tbody>
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
