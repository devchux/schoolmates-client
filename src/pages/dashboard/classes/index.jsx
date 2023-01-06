import React from "react";
import PageSheet from "../../../components/common/page-sheet";
import CustomTable from "../../../components/tables/table";
import { useClasses } from "../../../hooks/useClasses";

const Classes = () => {
  const { classes, isLoading } = useClasses();
  console.log(classes);
  return (
    <PageSheet>
      <div>
        <CustomTable
          isLoading={isLoading}
          columns={[
            {
              Header: "Column 1",
              accessor: "col1",
            },
            {
              Header: "Column 2",
              accessor: "col2",
            },
            {
              Header: "Column 3",
              accessor: "col3",
            },
            {
              Header: "Column 4",
              accessor: "col4",
            },
            {
              Header: "Column 5",
              accessor: "col5",
            },
          ]}
          data={[
            {
              col1: "Hello",
              col2: "World",
              col3: "World",
              col4: "World",
              col5: "World",
            },
            {
              col1: "react-table react-table react-table react-table react-table",
              col2: "rocks react-table react-table react-table react-table react-table",
              col3: "World react-table react-table react-table react-table react-table react-table react-table react-table react-table react-table react-table react-table",
              col4: "World react-table react-table react-table react-table react-table react-table",
              col5: "World",
            },
            {
              col1: "whatever",
              col2: "you want",
              col3: "World",
              col4: "World",
              col5: "World",
            },
          ]}
        />
      </div>
    </PageSheet>
  );
};

export default Classes;
