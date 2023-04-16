import React from "react";
import PageView from "../../../components/views/table-view";
import { useGrading } from "../../../hooks/useGrading";

const Grading = () => {
  const { isLoading, grading, deleteGrading } = useGrading();

  return (
    <PageView
      rowHasUpdate
      rowHasDelete
      onDelete={deleteGrading}
      isLoading={isLoading}
      columns={[
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "From",
          accessor: "score_from",
        },
        {
          Header: "To",
          accessor: "score_to",
        },
        {
          Header: "Remark",
          accessor: "remark",
        },
      ]}
      data={grading}
    />
  );
};

export default Grading;
