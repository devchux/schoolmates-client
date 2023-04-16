import moment from "moment";
import { useState } from "react";
import Numeral from "react-numeral";
import { useQuery } from "react-query";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useReports = () => {
  const [enableIncomeQuery, setEnableIncomeQuery] = useState(false);
  const [enableExpensesQuery, setEnableExpensesQuery] = useState(false);
  const [enableDebtorsQuery, setEnableDebtorsQuery] = useState(false);
  const [enableCreditorsQuery, setEnableCreditorsQuery] = useState(false);
  const [enableInvoicesQuery, setEnableInvoicesQuery] = useState(false);
  const [openPrompt, setOpenPrompt] = useState(false);
  const [indexStatus, setIndexStatus] = useState("");
  const [inputData, setInputData] = useState({
    term: "",
    session: "",
  });

  const { term, session } = inputData;
  const { apiServices, errorHandler } = useAppContext();

  const togglePrompt = () => setOpenPrompt(!openPrompt);

  const { isLoading: incomeReportsLoading, data: incomeReports } = useQuery(
    [queryKeys.GET_ALL_INCOME_REPORTS, term, session],
    () => apiServices.getAllIncomeReports(term, session),
    {
      enabled: enableIncomeQuery,
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      onSuccess() {
        setIndexStatus("income");
        setEnableIncomeQuery(false);
        setOpenPrompt(false);
      },
      select: (data) => {
        const format = apiServices.formatData(data);

        return format?.map((item) => ({
          ...item,
          created_at: moment(item?.created_at).format("LLL"),
          amount_paid: (
            <>
              &#8358;
              <Numeral value={item?.amount_paid || "0"} format="0,0.00" />
            </>
          ),
        }));
      },
    }
  );

  //New call

  const { isLoading: invoiceReportsLoading, data: invoiceReports } = useQuery(
    [queryKeys.GET_ALL_INVOICE_REPORTS, term, session],
    () => apiServices.getAllInvoiceReports(term, session),
    {
      enabled: enableInvoicesQuery,
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      onSuccess() {
        setEnableInvoicesQuery(false);
        setOpenPrompt(false);
        setIndexStatus("invoice");
      },
      select: (data) => {
        const format = apiServices.formatData(data);

        return format?.map((item) => ({
          ...item,
          created_at: moment(item?.created_at).format("LLL"),
          amount_paid: (
            <>
              &#8358;
              <Numeral value={item.amount_paid || "0"} format="0,0.00" />
            </>
          ),
        }));
      },
    }
  );

  const { isLoading: incomeDebtorsLoading, data: incomeDebtors } = useQuery(
    [queryKeys.GET_DEBTORS, term, session],
    () => apiServices.getDebtors(term, session),
    {
      enabled: enableDebtorsQuery,
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      onSuccess() {
        setEnableDebtorsQuery(false);
        setOpenPrompt(false);
        setIndexStatus("debtors");
      },
      select: (data) => {
        const format = apiServices.formatData(data);

        return format?.map((item) => ({
          ...item,
          created_at: moment(item?.created_at).format("LLL"),
          amount_paid: (
            <>
              &#8358;
              <Numeral value={item.amount_paid || "0"} format="0,0.00" />
            </>
          ),
        }));
      },
    }
  );

  const { isLoading: incomeCreditorLoading, data: incomeCreditors } = useQuery(
    [queryKeys.GET_CREDITORS, term, session],
    () => apiServices.getCreditors(term, session),
    {
      enabled: enableCreditorsQuery,
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      onSuccess() {
        setEnableCreditorsQuery(false);
        setOpenPrompt(false);
        setIndexStatus("creditors");
      },
      select: (data) => {
        const format = apiServices.formatData(data);

        return format?.map((item) => ({
          ...item,
          created_at: moment(item?.created_at).format("LLL"),
          amount_paid: (
            <>
              &#8358;
              <Numeral value={item?.amount_paid || "0"} format="0,0.00" />
            </>
          ),
        }));
      },
    }
  );

  const { isLoading: expensesReportsLoading, data: expensesReports } = useQuery(
    [queryKeys.GET_ALL_EXPENSES_REPORTS, term, session],
    () => apiServices.getAllExpenseReports(term, session),
    {
      enabled: enableExpensesQuery,
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      onSuccess() {
        setEnableExpensesQuery(false);
        setOpenPrompt(false);
        setIndexStatus("expense");
      },
      select: (data) =>
        apiServices.formatData(data)?.map((item) => ({
          ...item,
          created_at: moment(item?.created_at).format("LLL"),
          updated_at: moment(item?.updated_at).format("LLL"),
          amount: (
            <>
              &#8358;
              <Numeral value={item.amount || "0"} format="0,0.00" />
            </>
          ),
        })),
    }
  );

  const isLoading =
    incomeReportsLoading ||
    expensesReportsLoading ||
    incomeDebtorsLoading ||
    incomeCreditorLoading ||
    invoiceReportsLoading;

  return {
    setEnableIncomeQuery,
    setEnableExpensesQuery,
    setEnableDebtorsQuery,
    setEnableCreditorsQuery,
    setEnableInvoicesQuery,
    incomeReports,
    isLoading,
    setInputData,
    expensesReports,
    openPrompt,
    togglePrompt,
    indexStatus,
    incomeDebtors,
    incomeCreditors,
    invoiceReports,
    setIndexStatus,
  };
};
