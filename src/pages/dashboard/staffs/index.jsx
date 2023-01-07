import React from "react";
import PageView from "../../../components/views/table-view";
import { useStaff } from "../../../hooks/useStaff";

const Staff = () => {
  const { staffs, isLoading, onDeleteStaff } = useStaff();

  return (
    <PageView
      rowHasUpdate
      rowHasDelete
      onDelete={onDeleteStaff}
      isLoading={isLoading}
      columns={[
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "First Name",
          accessor: "firstname",
        },
        {
          Header: "Surname",
          accessor: "surname",
        },
        {
          Header: "Middle Name",
          accessor: "middlename",
        },
        {
          Header: "Username",
          accessor: "username",
        },
        {
          Header: "Status",
          accessor: "status",
        },
        {
          Header: "Phone Number",
          accessor: "phoneno",
        },
        {
          Header: "Email",
          accessor: "email",
        },
        {
          Header: "Address",
          accessor: "address",
        },
        {
          Header: "Department",
          accessor: "department",
        },
        {
          Header: "Role",
          accessor: "designation_name",
        },
      ]}
      data={staffs}
    />
  );
};

export default Staff;
