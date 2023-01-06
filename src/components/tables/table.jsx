import React, { useState } from "react";
import { useTable } from "react-table";
import { Modal, ModalBody, ModalFooter, Spinner, Table } from "reactstrap";
import Button from "../buttons/button";
import ButtonGroup from "../buttons/button-group";

const CustomTable = ({
  columns,
  data,
  onCellClick = () => null,
  isLoading = false,
  centered = false,
  rowHasDelete = false,
  rowHasUpdate = false,
  rowHasDisable = false,
  onRowDelete = () => null,
  onRowDisable = () => null,
  onRowUpdate = () => null,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("disable");
  const [id, setId] = useState("");

  const toggleModal = () => setModalOpen(!modalOpen);

  const openModal = (itemId, status) => {
    setId(itemId);
    setModalStatus(status);
    setModalOpen(true);
  };

  const onModalContinue = () => {
    setModalOpen(false);
    switch (modalStatus) {
      case "delete":
        return onRowDelete(id);

      default:
        return onRowDisable(id);
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
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                  {rowHasUpdate && <th>Update</th>}
                  {rowHasDisable && <th>Disable</th>}
                  {rowHasDelete && <th>Delete</th>}
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
                    {rowHasDisable && (
                      <td>
                        <Button
                          variant="dark"
                          className="d-block mx-auto"
                          disabled={row.original.status === 'disabled'}
                          onClick={() => openModal(row.original.id, "disable")}
                        >
                          Disable
                        </Button>
                      </td>
                    )}
                    {rowHasDelete && (
                      <td>
                        <Button
                          variant="danger"
                          className="d-block mx-auto"
                          onClick={() => openModal(row.original.id, "delete")}
                        >
                          Delete
                        </Button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Modal centered isOpen={modalOpen} toggle={toggleModal}>
            <ModalBody className="p-5">
              <p style={{ fontSize: "1.6rem" }}>
                Are you sure you want continue?
              </p>
            </ModalBody>
            <ModalFooter>
              <ButtonGroup
                options={[
                  { title: "Cancel", onClick: toggleModal, variant: "outline" },
                  { title: "Proceed", onClick: onModalContinue },
                ]}
              />
            </ModalFooter>
          </Modal>
        </div>
      ) : null}
      {!memoisedData.length && !isLoading ? (
        <p className="text-center">No data to display.</p>
      ) : null}
    </div>
  );
};

export default CustomTable;
