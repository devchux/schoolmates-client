import React from "react";
import PageView from "../../../components/views/table-view";
import { useStaff } from "../../../hooks/useStaff";

const Staff = () => {
  const {
    staffs,
    isLoading,
    onDeleteStaff,
    toggleStaffStatus,
    allStaffsByAttendance,
    indexStatus,
    setIndexStatus,
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
      data: staffs,
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
      data: allStaffsByAttendance,
    },
  };

  return (
    <PageView
      rowHasUpdate={indexStatus === "all"}
      rowHasDelete={indexStatus === "all"}
      rowHasStatusToggle={indexStatus === "all"}
      hasSortOptions
      onStatusToggle={toggleStaffStatus}
      onDelete={onDeleteStaff}
      isLoading={isLoading}
      groupedButtonOptions={[
        {
          title: "All",
          type: "button",
          variant: indexStatus !== "all" ? "outline" : null,
          onClick: () => setIndexStatus("all"),
        },
        {
          title: "Attendance List",
          type: "button",
          variant: indexStatus !== "attendance" ? "outline" : null,
          onClick: () => setIndexStatus("attendance"),
        },
      ]}
      columns={dataMapper[indexStatus].columns}
      data={dataMapper[indexStatus].data}
    />
  );
};

export default Staff;
