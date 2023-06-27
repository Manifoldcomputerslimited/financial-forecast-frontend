import { useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { getBankAccounts } from "../redux/slices/forecast";
import { withAuth } from "../hoc/withAuth";
import OpeningBalanceTable from "../components/OpeningBalanceTable";

const OpeningBalance = () => {
  const dispatch = useDispatch();
  const isBankAccountsLoading = useSelector(
    (state) => state.forecast.isBankAccountsLoading
  );
  const bankAccounts = useSelector((state) => state.forecast.bankAccounts);

  const columns = [
    { label: "ID", accessor: "id", sortable: true, sortbyOrder: "asc" },
    { label: "Account Name", accessor: "accountName", sortable: true },
    { label: "Account Type", accessor: "accountType", sortable: false },
    { label: "Currency", accessor: "currency", sortable: true },
    { label: "Naira Balance", accessor: "nairaBalance", sortable: false },
    { label: "Dollar Balance", accessor: "dollarBalance", sortable: false },
    {
      label: "Balance",
      accessor: "balance",
      sortable: true,
    },
    {
      label: "Overdraft",
      accessor: "overdraftBalance",
      sortable: true,
    },
  ];

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
                  {!isBankAccountsLoading && (
                    <OpeningBalanceTable
                      caption="Opening bank account with overdrafts"
                      data={bankAccounts}
                      columns={columns}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(true)(OpeningBalance);
