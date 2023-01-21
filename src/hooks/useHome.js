import { useQuery } from "react-query";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useHome = () => {
  const { apiServices, errorHandler, user } = useAppContext();

  const { isLoading: outstandingLoading, data: outstanding } = useQuery(
    [queryKeys.GET_ALL_OUTSTANDING],
    apiServices.getAllOutstanding,
    {
      enabled: ["Superadmin"].includes(user?.designation_name),
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const { isLoading: expectedIncomeLoading, data: expectedIncome } = useQuery(
    [queryKeys.GET_ALL_EXPECTED_INCOME],
    apiServices.getAllExpectedIncome,
    {
      enabled: ["Superadmin"].includes(user?.designation_name),
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const { isLoading: discountLoading, data: discount } = useQuery(
    [queryKeys.GET_ALL_DISCOUNT],
    apiServices.getAllDiscounts,
    {
      enabled: ["Superadmin"].includes(user?.designation_name),
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
    }
  );
  const { isLoading: totalExpenseLoading, data: totalExpense } = useQuery(
    [queryKeys.GET_ALL_TOTAL_EXPENSES],
    apiServices.getAllExpenses,
    {
      enabled: ["Superadmin"].includes(user?.designation_name),
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
    }
  );
  const { isLoading: accountBalanceLoading, data: accountBalance } = useQuery(
    [queryKeys.GET_ALL_ACCOUNT_BALANCE],
    apiServices.getAllAccountBalances,
    {
      enabled: ["Superadmin"].includes(user?.designation_name),
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const { isLoading: receivedIncomeLoading, data: receivedIncome } = useQuery(
    [queryKeys.GET_ALL_RECEIVED_INCOME],
    apiServices.getAllReceivedIncome,
    {
      enabled: ["Superadmin"].includes(user?.designation_name),
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const { isLoading: graduatedStudentLoading, data: graduatedStudent } =
    useQuery(
      [queryKeys.GET_ALL_GRADUATED_STUDENT],
      apiServices.getAllGraduatedStudent,
      {
        enabled: ["Superadmin"].includes(user?.designation_name),
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
    accountBalanceLoading ||
    receivedIncomeLoading ||
    graduatedStudentLoading;

  return {
    isLoading,
    outstanding,
    expectedIncome,
    graduatedStudent,
    discount,
    totalExpense,
    accountBalance,
    receivedIncome,
  };
};
