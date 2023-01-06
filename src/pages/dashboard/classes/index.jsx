import React from "react";
import PageSheet from "../../../components/common/page-sheet";
import CustomTable from "../../../components/tables/table";
import { useClasses } from "../../../hooks/useClasses";

const Classes = () => {
  const { classes, isLoading } = useClasses();

  return (
    <PageSheet>
      <div>
        <CustomTable
          centered
          isLoading={isLoading}
          columns={[
            {
              Header: "s/n",
              accessor: "serial_no",
            },
            {
              Header: "Class Name",
              accessor: "class_name",
            },
          ]}
          data={classes}
        />
      </div>
    </PageSheet>
  );
};

export default Classes;
