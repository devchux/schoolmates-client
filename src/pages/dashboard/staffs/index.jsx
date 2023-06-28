import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageView from "../../../components/views/table-view";
import { useStaff } from "../../../hooks/useStaff";

const Staff = () => {
  const navigate = useNavigate();
  const [setSearchParams] = useSearchParams();
  const {
    isLoading,
    onDeleteStaff,
    toggleStaffStatus,
    allStaffsByAttendance,
    indexStatus,
    setIndexStatus,
    permission,
    staffLoginDetails,
    staffsData,
  } = useStaff();

  const dataMapper = {
    all: {
      columns: [
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
      ],
      data: staffsData?.data,
      pagination: staffsData?.pagination,
    },
    attendance: {
      columns: [
        {
          Header: "First Name",
          accessor: "staff.firstname",
        },
        {
          Header: "Last Name",
          accessor: "staff.surname",
        },
        {
          Header: "Username",
          accessor: "staff.username",
        },
        {
          Header: "Date In",
          accessor: "date_in",
        },
        {
          Header: "Date Out",
          accessor: "date_out",
        },
        {
          Header: "Time In",
          accessor: "time_in",
        },
        {
          Header: "Time Out",
          accessor: "time_out",
        },
      ],
      data: allStaffsByAttendance?.data,
      pagination: allStaffsByAttendance?.pagination,
    },
    loginDetails: {
      columns: [
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
          Header: "Role",
          accessor: "designation_name",
        },
        {
          Header: "Password",
          accessor: "pass_word",
        },
      ],
      data: staffLoginDetails?.data,
      pagination: staffLoginDetails?.pagination,
    },
  };

  const getSortButtonOptions = () => {
    const arr = [];

    if (permission?.read) {
      arr.push({
        title: "All",
        type: "button",
        variant: indexStatus !== "all" ? "outline" : null,
        onClick: () => {
          setIndexStatus("all");
          setSearchParams({});
        },
      });
    }

    if (permission?.readAttendance) {
      arr.push({
        title: "Attendance List",
        type: "button",
        variant: indexStatus !== "attendance" ? "outline" : null,
        onClick: () => {
          setIndexStatus("attendance");
          setSearchParams({});
        },
      });
    }

    if (permission?.staffLoginDetails) {
      arr.push({
        title: "Login Details",
        type: "button",
        variant: indexStatus !== "loginDetails" ? "outline" : null,
        onClick: () => setIndexStatus("loginDetails"),
      });
    }

    return arr.length ? arr : undefined;
  };

  return (
    <PageView
      pagination={dataMapper[indexStatus].pagination}
      rowHasAction={permission?.action && indexStatus === "all"}
      rowHasUpdate={indexStatus === "all" && permission?.update}
      rowHasDelete={indexStatus === "all" && permission?.delete}
      rowHasStatusToggle={indexStatus === "all" && permission?.statusToggle}
      hasSortOptions={permission?.sort}
      onStatusToggle={toggleStaffStatus}
      onDelete={onDeleteStaff}
      isLoading={isLoading}
      groupedButtonOptions={getSortButtonOptions()}
      columns={dataMapper[indexStatus].columns}
      data={dataMapper[indexStatus].data}
      action={[
        {
          title: "Attendance",
          onClick: (id) => navigate(`/app/staffs/attendance/${id}`),
        },
      ]}
    />
  );
};

export default Staff;
