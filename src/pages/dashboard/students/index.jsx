import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageView from "../../../components/views/table-view";
import { useStudent } from "../../../hooks/useStudent";

const Student = () => {
  const { state } = useLocation();
  const {
    students,
    isLoading,
    onDeleteStudent,
    setSession,
    sortedStudents,
    sorted,
    setSorted,
    indexStatus,
    setIndexStatus,
    studentDebtors,
    studentCreditors,
    permission,
    handleSortBy,
    sortBy,
    setAdmissionNumber,
    setSortBy,
    studentByClassAndSession,
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

      case "myStudents":
        return [
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

  const getSortButtonOptions = () => {
    let arr = [];

    if (permission?.read) {
      arr.push({
        title: "All",
        type: "button",
        onClick: () => setIndexStatus("all"),
        variant: setVariant("all"),
      });
    }
    if (permission?.readCreditors) {
      arr.push({
        title: "Creditors",
        type: "button",
        onClick: () => setIndexStatus("creditors"),
        variant: setVariant("creditors"),
      });
    }

    if (permission?.readDebtors) {
      arr.push({
        title: "Debtors",
        type: "button",
        onClick: () => setIndexStatus("debtors"),
        variant: setVariant("debtors"),
      });
    }

    if (permission?.myStudents) {
      arr.push({
        title: "My Students",
        type: "button",
        onClick: () => setIndexStatus("myStudents"),
        variant: setVariant("myStudents"),
      });
    }

    return arr.length ? arr : undefined;
  };

  const data = {
    all: sorted ? sortedStudents : students,
    creditors: studentCreditors,
    debtors: studentDebtors,
    myStudents: studentByClassAndSession,
  };

  useEffect(() => {
    if (state?.status) {
      setIndexStatus(state.status);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.status]);

  return (
    <PageView
      hasSelect={indexStatus === "all" && permission?.sortSession}
      selectOptions={[
        { value: "admission-number", title: "Admission Number" },
        { value: "session", title: "Session" },
      ]}
      isSessionSearch={sortBy === "session"}
      onSelectChange={handleSortBy}
      selectValue={sortBy}
      canCreate={permission?.create}
      rowHasUpdate={
        !["creditors", "debtors"].includes(indexStatus) && permission?.update
      }
      rowHasDelete={
        !["creditors", "debtors"].includes(indexStatus) && permission?.delete
      }
      hasSortOptions={permission?.sort}
      hasSearch={indexStatus === "all" && permission?.sortSession}
      groupedButtonOptions={getSortButtonOptions()}
      searchPlaceholder={
        sortBy === "session"
          ? "Sort by session (2021/2022)"
          : "Enter Admission Number"
      }
      onDelete={onDeleteStudent}
      onSearch={(value) =>
        sortBy === "session" ? setSession(value) : setAdmissionNumber(value)
      }
      onSearchClear={() => {
        setSorted(false);
        setSortBy("");
      }}
      isLoading={isLoading}
      columns={getColumns()}
      data={data[indexStatus]}
    />
  );
};

export default Student;
