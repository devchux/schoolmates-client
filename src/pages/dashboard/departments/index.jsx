import React from "react";
import PageView from "../../../components/views/table-view";
import { useDepartments } from "../../../hooks/useDepartments";

const Departments = () => {
  const { isLoading, departmentsList } = useDepartments();

  return (
    <PageView
      canCreate={false}
      isLoading={isLoading}
      columns={[
        {
          Header: "ID",
          accessor: "id",
        },
        {
          Header: "Department ID",
          accessor: "department_id",
        },
        {
          Header: "Department Name",
          accessor: "department_name",
        },
      ]}
      data={departmentsList}
    />
  );
};

export default Departments;
