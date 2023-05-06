import React from "react";
import PageView from "../../../components/views/table-view";
import { usePreSchool } from "../../../hooks/usePreSchool";

const PreSchool = () => {
  const { permission, preSchools, isLoading } = usePreSchool();

  console.log("preSchools", preSchools);
  return (
    <PageView
      canCreate={permission?.create}
      isLoading={isLoading}
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
          Header: "Campus",
          accessor: "campus",
        },
      ]}
      data={preSchools}
    />
  );
};

export default PreSchool;
