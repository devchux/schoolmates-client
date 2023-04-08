import React from "react";
import PageView from "../../../components/views/table-view";
import { useTransferFund } from "../../../hooks/useTransferFund";

const TransferFund = () => {
  const { isLoading, funds, permission, deleteTransferFund } = useTransferFund();

  return (
    <PageView
      canCreate={permission?.create}
      rowHasUpdate={permission?.update}
      rowHasDelete={permission?.delete}
      onDelete={deleteTransferFund}
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
          Header: "Amount",
          accessor: "amount",
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
