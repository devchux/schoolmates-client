import React from "react";
import CreateWrapper from "../../../components/common/create-wrapper";
import PageSheet from "../../../components/common/page-sheet";
import CustomTable from "../../../components/tables/table";
import { useCampus } from "../../../hooks/useCampus";

const Campus = () => {
  const { campusList, isLoading, disableCampus } = useCampus();

  return (
    <PageSheet>
      <CreateWrapper link="/app/campus/new" />
      <div>
        <CustomTable
          centered
          rowHasDisable
          rowHasUpdate
          isLoading={isLoading}
          onRowDisable={async (id) => await disableCampus(id)}
          onRowUpdate={(id) => console.log(id)}
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
      </div>
    </PageSheet>
  );
};

export default Campus;
