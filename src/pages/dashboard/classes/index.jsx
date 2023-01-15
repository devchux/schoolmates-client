import React from "react";
import PageView from "../../../components/views/table-view";
import { useClasses } from "../../../hooks/useClasses";

const Classes = () => {
  const { classes, isLoading, onDeleteClass, permission } = useClasses();

  return (
    <PageView
      canCreate={permission?.create}
      rowHasUpdate={permission?.update}
      rowHasDelete={permission?.delete}
      onDelete={onDeleteClass}
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
        {
          Header: "Sub Classes",
          accessor: "sub_class",
        },
      ]}
      data={classes}
    />
  );
};

export default Classes;
