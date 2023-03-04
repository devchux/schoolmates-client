import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageView from "../../../components/views/table-view";
import { useClasses } from "../../../hooks/useClasses";
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
    user,
    graduatedStudents,
    setClasses,
  } = useStudent();

  const { classes } = useClasses();

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
      case "alumni":
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

  const getStudentColumns = () => {
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
            Header: "Class",
            accessor: "class",
          },
          {
            Header: "Present Class",
            accessor: "present_class",
          },
          {
            Header: "Gender",
            accessor: "gender",
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
            Header: "Class",
            accessor: "class",
          },
          {
            Header: "Present Class",
            accessor: "present_class",
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
        title:
          user?.designation_name === "Student" ? "My Class" : "My Students",
        type: "button",
        onClick: () => setIndexStatus("myStudents"),
        variant: setVariant("myStudents"),
      });
    }

    if (permission?.alumni) {
      arr.push({
        title: "Alumni",
        type: "button",
        onClick: () => setIndexStatus("alumni"),
        variant: setVariant("alumni"),
      });
    }

    return arr.length ? arr : undefined;
  };

  const searchPlaceholder = {
    session: "Sort by session (2021/2022)",
    "admission-number": "Enter Admission Number",
    class: "Select Class",
  };

  const data = {
    all: sorted ? sortedStudents : students,
    creditors: studentCreditors,
    debtors: studentDebtors,
    myStudents: studentByClassAndSession,
    alumni: graduatedStudents,
  };

  const searchByClass = (value) => {
    const findClass = classes?.find((each) => each?.class_name === value) || {};
    setClasses({
      present_class: findClass?.class_name,
      sub_class: findClass?.sub_class,
    });
  };

  const onSearch = (value) => {
    const search = {
      session: setSession,
      "admission-number": setAdmissionNumber,
      class: searchByClass,
    };

    return search[sortBy](value);
  };

  useEffect(() => {
    if (state?.status) {
      setIndexStatus(state.status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.status]);

  return (
    <PageView
      selectValue={sortBy}
      isLoading={isLoading}
      onSearchClear={() => {
        setSorted(false);
        setSortBy("");
      }}
      data={data[indexStatus]}
      onDelete={onDeleteStudent}
      onSelectChange={handleSortBy}
      canCreate={permission?.create}
      hasSortOptions={permission?.sort}
      searchIsSelect={sortBy === "class"}
      columns={
        user?.designation_name === "Student"
          ? getStudentColumns()
          : getColumns()
      }
      isSessionSearch={sortBy === "session"}
      groupedButtonOptions={getSortButtonOptions()}
      hasSelect={indexStatus === "all" && permission?.sortSession}
      hasSearch={indexStatus === "all" && permission?.sortSession}
      searchSelectOptions={(classes || []).map((x) => ({
        value: x?.class_name,
        title: x?.class_name,
      }))}
      selectOptions={[
        { value: "admission-number", title: "Admission Number" },
        { value: "session", title: "Session" },
        { value: "class", title: "Class" },
      ]}
      onSearch={onSearch}
      rowHasUpdate={
        !["creditors", "debtors"].includes(indexStatus) && permission?.update
      }
      rowHasDelete={
        !["creditors", "debtors"].includes(indexStatus) && permission?.delete
      }
      searchPlaceholder={searchPlaceholder[sortBy] || "Enter Admission Number"}
    />
  );
};

export default Student;
