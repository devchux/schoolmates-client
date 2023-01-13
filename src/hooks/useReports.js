import { useState } from "react";
import { useQuery } from "react-query";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useReports = () => {
  const [enableIncomeQuery, setEnableIncomeQuery] = useState(false);
  const [enableExpensesQuery, setEnableExpensesQuery] = useState(false);
  const [openPrompt, setOpenPrompt] = useState(false);
  const [indexStatus, setIndexStatus] = useState('');
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
        setEnableIncomeQuery(false);
        setOpenPrompt(false);
        setIndexStatus('income');
      },
      select: apiServices.formatData,
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
        setIndexStatus('expense');
      },
      select: apiServices.formatData,
    }
  );

  const isLoading = incomeReportsLoading || expensesReportsLoading;

  return {
    setEnableIncomeQuery,
    setEnableExpensesQuery,
    incomeReports,
    isLoading,
    setInputData,
    expensesReports,
    openPrompt,
    togglePrompt,
    indexStatus,
    setIndexStatus,
  };
};
