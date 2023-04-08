import React from "react";
import PageView from "../../../components/views/table-view";
import { useTransferFund } from "../../../hooks/useTransferFund";

const TransferFund = () => {
  const { isLoading, funds, permission } = useTransferFund();

  console.log(funds);
  return (
    <PageView
      canCreate={permission?.create}
      // rowHasUpdate={permission?.update}
      // rowHasDelete={permission?.delete}
      // onDelete={onDeleteClass}
      isLoading={isLoading}
      columns={[
        {
          Header: "Campus",
          accessor: "campus",
        },
        {
          Header: "From",
          accessor: "from",
        },
        {
          Header: "To",
          accessor: "to",
        },
        {
          Header: "Account",
          accessor: "account",
        },
        {
          Header: "Memo",
          accessor: "memo",
        },
      ]}
      data={funds}
    />
  );
};

export default TransferFund;
