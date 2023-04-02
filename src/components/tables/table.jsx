import React, { useState } from "react";
import { useTable } from "react-table";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Spinner,
  Table,
} from "reactstrap";
import Button from "../buttons/button";
import Prompt from "../modals/prompt";

const CustomTable = ({
  columns,
  data,
  onCellClick = () => null,
  isLoading = false,
  centered = false,
  rowHasDelete = false,
  rowHasUpdate = false,
  rowHasStatusToggle = false,
  onRowDelete = () => null,
  onRowStatusToggle = () => null,
  onRowUpdate = () => null,
  hasCheckBox = false,
  checkedRows = [],
  setCheckedRows = () => null,
  rowHasAction = false,
  action = [],
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [actionDropdown, setActionDropdown] = useState(false);
  const [actionId, setActionId] = useState("");
  const [modalStatus, setModalStatus] = useState("disable");
  const [row, setRow] = useState({});

  const toggleModal = () => setModalOpen(!modalOpen);

  const toggleAction = (id) => {
    setActionDropdown(!actionDropdown);
    setActionId(actionId ? "" : id);
  };

  const openModal = (row, status) => {
    setRow(row);
    setModalStatus(status);
    setModalOpen(true);
  };

  const onModalContinue = () => {
    setModalOpen(false);
    switch (modalStatus) {
      case "delete":
        return onRowDelete(row?.original?.id);

      default:
        return onRowStatusToggle({
          id: row?.original?.id,
          status: row?.original?.status === "disabled" ? "active" : "disabled",
        });
    }
  };

  const displayStatus = (render) => {
    switch (render) {
      case "disabled":
        return <p className="text-danger">Inactive</p>;

      case "withdrawn":
        return <p className="text-danger">Withdrawn</p>;

      default:
        return <p className="text-success">Active</p>;
    }
  };

  const checkAllBoxes = () => {
    if (checkedRows.length === data.length) {
      setCheckedRows([]);
    } else {
      const dataIds = data.map((x) => x.id);
      setCheckedRows(dataIds);
    }
  };

  const checkSingleRow = (id) => {
    if (checkedRows.includes(id)) {
      const filter = checkedRows.filter((r) => r !== id);
      setCheckedRows(filter);
    } else {
      setCheckedRows([...checkedRows, id]);
    }
  };

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
                  {hasCheckBox && (
                    <th>
                      <Input
                        type="checkbox"
                        checked={checkedRows.length === memoisedData.length}
                        onChange={checkAllBoxes}
                      />
                    </th>
                  )}
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                  {rowHasUpdate && <th>Update</th>}
                  {rowHasStatusToggle && <th>Disable</th>}
                  {rowHasDelete && <th>Delete</th>}
                  {rowHasAction && <th>Action</th>}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {hasCheckBox && (
                      <td>
                        <Input
                          type="checkbox"
                          checked={checkedRows.includes(row.original.id)}
                          onChange={() => checkSingleRow(row.original.id)}
                        />
                      </td>
                    )}
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          onClick={() => onCellClick(cell)}
                        >
                          {cell.column.id === "status"
                            ? displayStatus(cell.value)
                            : cell.render("Cell")}
                        </td>
                      );
                    })}
                    {rowHasUpdate && (
                      <td>
                        <Button
                          className="d-block mx-auto"
                          onClick={() => onRowUpdate(row.original.id)}
                        >
                          Update
                        </Button>
                      </td>
                    )}
                    {rowHasStatusToggle && (
                      <td>
                        <Button
                          variant={
                            row.original.status === "disabled"
                              ? "dark"
                              : "warning"
                          }
                          className="d-block mx-auto"
                          onClick={() => openModal(row, "disable")}
                        >
                          {row.original.status === "disabled"
                            ? "Enable"
                            : "Disable"}
                        </Button>
                      </td>
                    )}
                    {rowHasDelete && (
                      <td>
                        <Button
                          variant="danger"
                          className="d-block mx-auto"
                          onClick={() => openModal(row, "delete")}
                        >
                          Delete
                        </Button>
                      </td>
                    )}
                    {rowHasAction && (
                      <td>
                        <Dropdown
                          isOpen={
                            actionDropdown && row.original.id === actionId
                          }
                          toggle={() => toggleAction(row.original.id)}
                        >
                          <DropdownToggle tag="div">
                            <Button
                              variant="dark"
                              className="d-block mx-auto"
                              onClick={() => toggleAction(row.original.id)}
                            >
                              Action
                            </Button>
                          </DropdownToggle>
                          <DropdownMenu>
                            {action?.map(({ onClick, title }, key) => (
                              <DropdownItem
                                onClick={() => onClick(row.original.id)}
                                className="px-5 py-3"
                                key={key}
                              >
                                {title}
                              </DropdownItem>
                            ))}
                          </DropdownMenu>
                        </Dropdown>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Prompt
            hasGroupedButtons
            groupedButtonProps={[
              { title: "Cancel", onClick: toggleModal, variant: "outline" },
              { title: "Proceed", onClick: onModalContinue },
            ]}
            isOpen={modalOpen}
            toggle={toggleModal}
          >
            <p style={{ fontSize: "1.6rem" }}>
              Are you sure you want continue?
            </p>
          </Prompt>
        </div>
      ) : null}
      {!memoisedData.length && !isLoading ? (
        <p className="text-center">No data to display.</p>
      ) : null}
    </div>
  );
};

export default CustomTable;
