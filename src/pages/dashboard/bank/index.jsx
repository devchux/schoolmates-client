import React from "react";
import { useQuery } from "react-query";
import PageView from "../../../components/views/table-view";
import { useAppContext } from "../../../hooks/useAppContext";
import queryKeys from "../../../utils/queryKeys";

const BankList = () => {
  const { apiServices, permission } = useAppContext();

  const { data: Bank, isLoading: bankLoading } = useQuery(
    [queryKeys.GET_BANK_LIST],
    apiServices.getBankList,
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
      isLoading={bankLoading}
      columns={[
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "Bank Name",
          accessor: "bank_name",
        },
        {
          Header: "Account Name",
          accessor: "account_name",
        },
        {
          Header: "Opening Balance",
          accessor: "opening_balance",
        },
      ]}
      data={Bank}
    />
  );
};

export default BankList;
