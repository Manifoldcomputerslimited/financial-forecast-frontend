import CurrencyFormat from "react-currency-format";

const BillTableBody = ({
  setShowBillDetailModal,
  setBillDetail,
  tableData,
  columns,
}) => {
  const updateBillDetail = (bill) => {
    setShowBillDetailModal(true);
    setBillDetail(bill);
  };

  return (
    <>
      <tbody>
        {tableData.map((data) => {
          return (
            <tr key={data.id} onClick={() => updateBillDetail(data)}>
              {columns.map(({ accessor }) => {
                const tData = data[accessor] ? data[accessor] : "——";
                if (accessor == "nairaBalance") {
                  return (
                    <td className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black">
                      {data.currencyCode != "USD" ? (
                        <>
                          <span className="font-semibold text-sm">&#8358;</span>{" "}
                          <CurrencyFormat
                            value={parseFloat(data.balance)}
                            displayType={"text"}
                            thousandSeparator={true}
                            decimalScale={2}
                          />
                        </>
                      ) : null}
                    </td>
                  );
                }

                if (accessor == "dollarBalance") {
                  return (
                    <td className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black">
                      {data.currencyCode != "NGN" ? (
                        <>
                          <span className="font-semibold text-sm">&#36;</span>{" "}
                          <CurrencyFormat
                            value={parseFloat(data.balance)}
                            displayType={"text"}
                            thousandSeparator={true}
                            decimalScale={2}
                          />
                        </>
                      ) : null}
                    </td>
                  );
                }

                if (accessor == "balance") {
                  return (
                    <td className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black">
                      {data.currencyCode != "USD" ? (
                        <span className="font-semibold text-sm text-black">
                          &#8358;
                        </span>
                      ) : (
                        <span className="font-semibold text-sm text-black">
                          &#36;
                        </span>
                      )}{" "}
                      <CurrencyFormat
                        value={parseFloat(data.balance)}
                        displayType={"text"}
                        thousandSeparator={true}
                        decimalScale={2}
                      />
                    </td>
                  );
                }
                return <td key={accessor}>{tData}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </>
  );
};

export default BillTableBody;
