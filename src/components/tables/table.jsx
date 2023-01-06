import React from "react";
import { useTable } from "react-table";
import { Spinner, Table } from "reactstrap";

const CustomTable = ({
  columns,
  data,
  onCellClick = () => null,
  isLoading = false,
  centered = false,
}) => {
  const memoisedData = React.useMemo(() => data || [], [data]);

  const memoisedColumns = React.useMemo(() => columns, [columns]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: memoisedColumns, data: memoisedData });

  return (
    <div className="custom-table-wrapper">
      {isLoading && (
        <div className="d-flex align-items-center justify-content-center w-full">
          <Spinner /> <p className="ms-2">Loading...</p>
        </div>
      )}
      {memoisedData.length && !isLoading ? (
        <div>
          <Table
            {...getTableProps()}
            className={`custom-table ${centered ? "centered" : ""}`}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          onClick={() => onCellClick(cell)}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : null}
      {!memoisedData.length && !isLoading ? (
        <p className="text-center">No data to display.</p>
      ) : null}
    </div>
  );
};

export default CustomTable;
