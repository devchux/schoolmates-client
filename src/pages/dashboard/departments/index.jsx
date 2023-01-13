import React from "react";
import PageView from "../../../components/views/table-view";
import { useDepartments } from "../../../hooks/useDepartments";

const Departments = () => {
  const { departmentsListLoading, departmentsList } = useDepartments();

  console.log(departmentsList)

  return (
    <PageView
      canCreate={false}
      isLoading={departmentsListLoading}
      columns={[
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "Department Name",
          accessor: "department_name",
        },
        {
          Header: "Department Type",
          accessor: "department_type",
        },
        {
          Header: "Department Code",
          accessor: "department_code",
        },
        {
          Header: "Company Name",
          accessor: "company_name",
        },
        {
          Header: "Contact Address",
          accessor: "contact_address",
        },
        {
          Header: "Contact Person",
          accessor: "contact_person",
        },
        {
          Header: "Contact Phone",
          accessor: "contact_phone",
        },
        {
          Header: "Email Address",
          accessor: "email_address",
        },
      ]}
      data={departmentsList}
    />
  );
};

export default Departments;
