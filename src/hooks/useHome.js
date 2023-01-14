import { useQuery } from "react-query";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useHome = () => {
  const { apiServices, errorHandler } = useAppContext();

  const { isLoading: outstandingLoading, data: outstandingList } = useQuery(
    [queryKeys.GET_ALL_OUTSTANDING],
    apiServices.getAllOutstanding,
    {
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const { isLoading: expectedIncomeLoading, data: expectedIncomeList } =
    useQuery(
      [queryKeys.GET_ALL_EXPECTED_INCOME],
      apiServices.getAllExpectedIncome,
      {
        retry: 3,
        onError(err) {
          errorHandler(err);
        },
      }
    );

  const { isLoading: discountLoading, data: discountList } = useQuery(
    [queryKeys.GET_ALL_DISCOUNT],
    apiServices.getAllDiscounts,
    {
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
    }
  );
  const { isLoading: totalExpenseLoading, data: totalExpenseList } = useQuery(
    [queryKeys.GET_ALL_TOTAL_EXPENSES],
    apiServices.getAllExpenses,
    {
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
    }
  );
  const { isLoading: accountBalanceLoading, data: accountBalanceList } =
    useQuery(
      [queryKeys.GET_ALL_ACCOUNT_BALANCE],
      apiServices.getAllAccountBalances,
      {
        retry: 3,
        onError(err) {
          errorHandler(err);
        },
      }
    );

  const isLoading =
    outstandingLoading ||
    expectedIncomeLoading ||
    discountLoading ||
    totalExpenseLoading ||
    accountBalanceLoading;

  return {
    isLoading,
    outstandingList,
    expectedIncomeList,
    discountList,
    totalExpenseList,
    accountBalanceList,
  };
};
