import React from "react";
import { useQuery } from "react-query";
import PageView from "../../../components/views/table-view";
import { useAppContext } from "../../../hooks/useAppContext";
import queryKeys from "../../../utils/queryKeys";

const FeeList = () => {
  const { apiServices, permission } = useAppContext();

  const { data: Fee, isLoading: feeLoading } = useQuery(
    [queryKeys.GET_FEE_LIST],
    apiServices.getFeeList,
    {
      onError(err) {
        apiServices.errorHandler(err);
      },
      select: apiServices.formatData,
    }
  );

  return (
    <PageView
      canCreate={permission?.create}
      isLoading={feeLoading}
      columns={[
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "Campus",
          accessor: "campus",
        },
        {
          Header: "Fee Type",
          accessor: "feetype",
        },
        {
            Header: "Term",
            accessor: "term",
          },
          {
            Header: "Fee Status",
            accessor: "fee_status",
          },
          {
            Header: "Category",
            accessor: "category",
          },
      ]}
      data={Fee}
    />
  );
};

export default FeeList;