import React from "react";
import PageView from "../../../components/views/table-view";
import { useClasses } from "../../../hooks/useClasses";

const Classes = () => {
  const { classes, isLoading } = useClasses();

  return (
    <PageView
      rowHasUpdate
      isLoading={isLoading}
      columns={[
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "Class Name",
          accessor: "class_name",
        },
      ]}
      data={classes}
    />
  );
};

export default Classes;
