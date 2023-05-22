import CurrencyFormat from "react-currency-format";

const OpeningBalanceTableBody = ({ tableData, columns }) => {
  return (
    <tbody>
      {tableData.map((data) => {
        return (
          <tr key={data.id}>
            {columns.map(({ accessor }) => {
              const tData = data[accessor] ? data[accessor] : "——";
              if (accessor == "balance") {
                return (
                  <td className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black">
                    {data.currency != "USD" ? (
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

              if (accessor == "overdraftBalance") {
                return (
                  <td className="py-4 px-6 text-sm font-medium text-black whitespace-nowrap dark:text-black">
                    {data.currency != "USD" ? (
                      <span className="font-semibold text-sm text-black">
                        &#8358;
                      </span>
                    ) : (
                      <span className="font-semibold text-sm text-black">
                        &#36;
                      </span>
                    )}{" "}
                    <CurrencyFormat
                      value={parseFloat(data.overdraftBalance)}
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
  );
};

export default OpeningBalanceTableBody;
