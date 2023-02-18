import { useState } from "react";
import { useQuery } from "react-query";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useAccounts = () => {
  const [indexStatus, setIndexStatus] = useState("fee-history");
  const { permission, apiServices } = useAppContext("accounts");

  const { isLoading: feeHistoryLoading, data: feeHistory } = useQuery(
    [queryKeys.GET_FEE_HISTORY],
    apiServices.getStudentFeeHistory,
    {
      enabled: permission?.feeHistory,
    }
  );

  const isLoading = feeHistoryLoading;

  return { indexStatus, setIndexStatus, feeHistory, isLoading };
};
