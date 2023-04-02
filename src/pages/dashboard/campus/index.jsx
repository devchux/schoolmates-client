import React from "react";
import PageView from "../../../components/views/table-view";
import { useCampus } from "../../../hooks/useCampus";

const Campus = () => {
  const {
    campusList,
    isLoading,
    toggleCampusStatus,
    permission,
    deleteCampus,
  } = useCampus();

  return (
    <PageView
      canCreate={permission?.create}
      rowHasStatusToggle={permission?.statusToggle}
      rowHasUpdate={permission?.update}
      rowHasDelete={permission?.delete}
      isLoading={isLoading}
      onStatusToggle={toggleCampusStatus}
      onDelete={async (id) => await deleteCampus(id)}
      columns={[
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Email",
          accessor: "email",
        },
        {
          Header: "Status",
          accessor: "status",
        },
        {
          Header: "Address",
          accessor: "address",
        },
        {
          Header: "Phone Number",
          accessor: "phoneno",
        },
        {
          Header: "State",
          accessor: "state",
        },
      ]}
      data={campusList}
    />
  );
};

export default Campus;
