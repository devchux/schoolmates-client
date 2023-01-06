import React from "react";
import CreateWrapper from "../../../components/common/create-wrapper";
import PageSheet from "../../../components/common/page-sheet";
import CustomTable from "../../../components/tables/table";
import { useCampus } from "../../../hooks/useCampus";

const Campus = () => {
  const { campusList, isLoading } = useCampus();

  console.log(campusList);

  return (
    <PageSheet>
      <CreateWrapper link="/app/campus/new" />
      <div>
        <CustomTable
          centered
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
              Header: "Email",
              accessor: "email",
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
