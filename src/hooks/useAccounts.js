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
      select: apiServices.formatData,
    }
  );

  const { isLoading: previousInvoiceLoading, data: previousInvoice } = useQuery(
    [queryKeys.GET_PREVIOUS_INVOICE],
    apiServices.getStudentPreviousInvoice,
    {
      enabled: permission?.previousInvoice,
      select: apiServices.formatData,
    }
  );

  const { isLoading: invoiceLoading, data: invoice } = useQuery(
    [queryKeys.GET_INVOICE],
    apiServices.getStudentInvoice,
    {
      enabled: permission?.myInvoice,
      select: apiServices.formatData,
    }
  );

  const isLoading =
    feeHistoryLoading || previousInvoiceLoading || invoiceLoading;

  return {
    indexStatus,
    setIndexStatus,
    feeHistory,
    isLoading,
    previousInvoice,
    permission,
    invoice,
  };
};
