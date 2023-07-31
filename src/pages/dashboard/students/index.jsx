import React, { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PageView from "../../../components/views/table-view";
import { useAcademicSession } from "../../../hooks/useAcademicSession";
import { useClasses } from "../../../hooks/useClasses";
import { useStudent } from "../../../hooks/useStudent";
import {
  getActionOptions,
  getColumns,
  getSortButtonOptions,
  getStudentColumns,
  searchPlaceholder,
} from "./constant";

const Student = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [_, setSearchParams] = useSearchParams();
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
    studentLoginDetailsStudents,
    communicationList,
  } = useStudent();

  const { classes } = useClasses();

  const { data: sessions } = useAcademicSession();

  const data = {
    all: sorted ? sortedStudents : students?.data,
    creditors: studentCreditors,
    debtors: studentDebtors,
    myStudents: studentByClassAndSession,
    alumni: graduatedStudents,
    loginDetails: studentLoginDetailsStudents?.data,
    communication: communicationList,
  };

  const pagination = {
    all: !sorted && students?.pagination,
    loginDetails: studentLoginDetailsStudents?.pagination,
  };

  const searchByClass = (value) => {
    const findClass = classes?.find((each) => each?.class_name === value) || {};
    console.log({ findClass })
    setClasses({
      present_class: findClass?.class_name,
      sub_class: findClass?.sub_class,
    });
  };

  const getSelectSearchOptions = () => {
    if (sortBy === "class")
      return (classes || []).map((x) => ({
        value: x?.class_name,
        title: x?.class_name,
      }));
    if (sortBy === "session")
      return (sessions || [])?.map((session) => ({
        value: session?.academic_session,
        title: session?.academic_session,
      }));
  };

  const onSearch = (value) => {
    const search = {
      session: setSession,
      "admission-number": setAdmissionNumber,
      class: searchByClass,
    };

    return search[sortBy || "admission-number"](value);
  };

  useEffect(() => {
    if (state?.status) {
      setIndexStatus(state.status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.status]);

  console.log({sortedStudents})

  return (
    <PageView
      selectValue={sortBy}
      isLoading={isLoading}
      onSearchClear={() => {
        setSorted(false);
        setSortBy("");
      }}
      action={getActionOptions({ permission, navigate })}
      data={data[indexStatus]}
      pagination={pagination[indexStatus]}
      onDelete={onDeleteStudent}
      onSelectChange={handleSortBy}
      canCreate={permission?.create}
      hasSortOptions={permission?.sort}
      rowHasAction={permission?.action && indexStatus === "all"}
      searchIsSelect={sortBy === "class" || sortBy === "session"}
      columns={
        user?.designation_name === "Student"
          ? getStudentColumns({ indexStatus })
          : getColumns({ indexStatus })
      }
      groupedButtonOptions={getSortButtonOptions({
        permission,
        user,
        indexStatus,
        setIndexStatus: (index) => {
          setIndexStatus(index)
          setSearchParams({})
        },
      })}
      hasSelect={indexStatus === "all" && permission?.sortSession}
      hasSearch={indexStatus === "all" && permission?.sortSession}
      searchSelectOptions={getSelectSearchOptions()}
      selectOptions={[
        { value: "admission-number", title: "Admission Number" },
        { value: "session", title: "Session" },
        { value: "class", title: "Class" },
      ]}
      onSearch={onSearch}
      rowHasUpdate={["all"].includes(indexStatus) && permission?.update}
      rowHasDelete={["all"].includes(indexStatus) && permission?.delete}
      searchPlaceholder={searchPlaceholder[sortBy] || "Enter Admission Number"}
    />
  );
};

export default Student;
