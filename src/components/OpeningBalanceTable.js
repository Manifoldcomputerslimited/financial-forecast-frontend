import TableHead from "./TableHead";
import { useSortableTable } from "../useSortableTable";
import OpeningBalanceTableBody from "./OpeningBalanceTableBody";

const OpeningBalanceTable = ({ caption, data, columns }) => {
  const [tableData, handleSorting] = useSortableTable(data, columns);

  return (
    <>
      <table className="table">
        <caption>{caption}</caption>
        <TableHead {...{ columns, handleSorting }} />
        <OpeningBalanceTableBody {...{ columns, tableData }} />
      </table>
    </>
  );
};

export default OpeningBalanceTable;
