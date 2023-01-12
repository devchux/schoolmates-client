import React from "react";
import PageView from "../../../components/views/table-view";
import { useStudent } from "../../../hooks/useStudent";

const Student = () => {
  const {
    students,
    isLoading,
    onDeleteStudent,
    getStudentBySession,
    sortedStudents,
    sorted,
    setSorted,
    indexStatus,
    setIndexStatus,
    studentDebtors,
    studentCreditors,
  } = useStudent();

  const setVariant = (status) => {
    return indexStatus !== status ? "outline" : null;
  };

  const getColumns = () => {
    switch (indexStatus) {
      case "all":
        return [
          {
            Header: "",
            accessor: "image",
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
            Header: "Phone Number",
            accessor: "phone_number",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Admission Number",
            accessor: "admission_number",
          },
          {
            Header: "Class",
            accessor: "class",
          },
          {
            Header: "Present Class",
            accessor: "present_class",
          },
          {
            Header: "Session Admitted",
            accessor: "session_admitted",
          },
          {
            Header: "Email Address",
            accessor: "email_address",
          },
          {
            Header: "Home Address",
            accessor: "home_address",
          },
          {
            Header: "Gender",
            accessor: "gender",
          },
          {
            Header: "Blood Group",
            accessor: "blood_group",
          },
          {
            Header: "Genotype",
            accessor: "genotype",
          },
          {
            Header: "State",
            accessor: "state",
          },
          {
            Header: "Nationality",
            accessor: "nationality",
          },
        ];

      default:
        return [
          {
            Header: "id",
            accessor: "id",
          },
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
          {
            Header: "Term",
            accessor: "term",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Account Name",
            accessor: "account_name",
          },
          {
            Header: "Bank Name",
            accessor: "bank_name",
          },
          {
            Header: "Payment Method",
            accessor: "payment_method",
          },
          {
            Header: "Remark",
            accessor: "remark",
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
    <PageView
      rowHasUpdate
      rowHasDelete
      hasSortOptions
      hasSearch={indexStatus === 'all'}
      groupedButtonOptions={[
        {
          title: "All",
          type: "button",
          onClick: () => setIndexStatus("all"),
          variant: setVariant("all"),
        },
        {
          title: "Creditors",
          type: "button",
          onClick: () => setIndexStatus("creditors"),
          variant: setVariant("creditors"),
        },
        {
          title: "Debtors",
          type: "button",
          onClick: () => setIndexStatus("debtors"),
          variant: setVariant("debtors"),
        },
      ]}
      searchPlaceholder="Sort by session (2021/2022)"
      onDelete={onDeleteStudent}
      onSearch={async (session_admitted) =>
        await getStudentBySession({ session_admitted })
      }
      onSearchClear={() => setSorted(false)}
      isLoading={isLoading}
      columns={getColumns()}
      data={data[indexStatus]}
    />
  );
};

export default Student;
