import React from "react";
import PageView from "../../../components/views/table-view";
import { useAccounts } from "../../../hooks/useAccounts";

const ChartAccount = () => {
  const {  chartaccountLoading , chartaccountList, permission } = useAccounts();

  return (
    <PageView
      canCreate={permission?.create}
      isLoading={chartaccountLoading}
      columns={[
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: " Account Name",
          accessor: "name",
        },
        {
          Header: "Account Type",
          accessor: "acct_type",
        },
        
      ]}
      data={chartaccountList}
    />
  );
};

export default ChartAccount;
