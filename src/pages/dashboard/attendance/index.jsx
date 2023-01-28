import React from "react";
import AuthInput from "../../../components/inputs/auth-input";
import CustomTable from "../../../components/tables/table";
import { useStudent } from "../../../hooks/useStudent";
import PageSheet from "../../../components/common/page-sheet";

const Attendance = () => {
  const [checkedRows, setCheckedRows] = React.useState([]); 
  const {
    students,
    isLoading,
    sortedStudents,
    sorted,
    indexStatus,
    studentDebtors,
    studentCreditors,
  } = useStudent();
  const getColumns = () => {
    switch (indexStatus) {
      case "all":
        return [
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
            Header: "Admission Number",
            accessor: "admission_number",
          },
        ];

      default:
        return [
          {
            Header: "Full Name",
            accessor: "student_fullname",
          },
          {
            Header: "Amount Due",
            accessor: "amount_due",
          },
          {
            Header: "Amount Paid",
            accessor: "amount_paid",
          },
          {
            Header: "Total Amount",
            accessor: "total_amount",
          },
          {
            Header: "Session",
            accessor: "session",
          },
        ];
    }
  };
  const data = {
    all: sorted ? sortedStudents : students,
    creditors: studentCreditors,
    debtors: studentDebtors,
  };

  return (
    <PageSheet>
      <AuthInput type="date"></AuthInput>
      <CustomTable
        hasCheckBox
        checkedRows={checkedRows}
        centered
        setCheckedRows={setCheckedRows}
        isLoading={isLoading}
        columns={getColumns()}
        data={data[indexStatus]}
      />
    </PageSheet>
  );
};

export default Attendance;
