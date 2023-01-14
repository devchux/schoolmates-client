import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useReports = () => {
  const [enableIncomeQuery, setEnableIncomeQuery] = useState(false);
  const [enableExpensesQuery, setEnableExpensesQuery] = useState(false);
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
        setEnableIncomeQuery(false);
        setOpenPrompt(false);
        setIndexStatus("income");
      },
      select: (data) => {
        const format = apiServices.formatData(data);

        return format?.map((item) => ({
          ...item,
          created_at: moment(item?.created_at).format("LLL"),
          amount_paid: (
            <>&#8358;{apiServices.commaSeperatedNumber(item?.amount_paid)}</>
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
        data.data?.map((item) => ({
          ...item,
          created_at: moment(item?.created_at).format("LLL"),
          updated_at: moment(item?.updated_at).format("LLL"),
          amount: (
            <>&#8358;{apiServices.commaSeperatedNumber(item?.amount)}</>
          ),
        })),
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
