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
  //NEW CALL
  const { isLoading: chartaccountLoading, data: chartaccount } = useQuery(
    [queryKeys.GET_CHART_ACCOUNTS],
    apiServices.getChartAccount,
    {
      enabled: permission?.myChartAccount,
      select: apiServices.formatData,
    }
  );
  const { isLoading: paymentLoading, data: payment } = useQuery(
    [queryKeys.GET_PAYMENT],
    apiServices.getPayment,
    {
      enabled: permission?.myPayment,
      select: apiServices.formatData,
    }
  );

  const isLoading =
    feeHistoryLoading ||
    previousInvoiceLoading ||
    invoiceLoading ||
    chartaccountLoading ||
    paymentLoading;

  return {
    indexStatus,
    setIndexStatus,
    feeHistory,
    isLoading,
    previousInvoice,
    permission,
    invoice,
    chartaccount,
    payment,
  };
};
