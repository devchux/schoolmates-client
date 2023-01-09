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
  } = useStudent();

  console.log(sortedStudents);

  return (
    <PageView
      rowHasUpdate
      rowHasDelete
      hasSortOptions
      hasSearch
      searchPlaceholder="Sort by session (2021/2022)"
      onDelete={onDeleteStudent}
      onSearch={async (session_admitted) =>
        await getStudentBySession({ session_admitted })
      }
      onSearchClear={() => setSorted(false)}
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
      ]}
      data={sorted ? sortedStudents : students}
    />
  );
};

export default Student;
