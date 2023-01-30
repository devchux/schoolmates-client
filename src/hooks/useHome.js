import { useQuery } from "react-query";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useHome = () => {
  const { apiServices, errorHandler, user, updateUser } = useAppContext();

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

  const { isLoading: schoolLoading } = useQuery(
    [queryKeys.GET_SCHOOL],
    apiServices.getSchool,
    {
      enabled: ["Teacher"].includes(user?.designation_name),
      retry: 3,
      onSuccess(data) {
        updateUser({
          ...user,
          school: { ...data },
        });
      },
      onError(err) {
        errorHandler(err);
      },
      select: (data) => data?.data[0].attributes,
    }
  );

  const { isLoading: academicPeriodLoading } = useQuery(
    [queryKeys.GET_ALL_GRADUATED_STUDENT],
    apiServices.getAcademicPeriod,
    {
      enabled: ["Teacher"].includes(user?.designation_name),
      retry: 3,
      onSuccess(data) {
        updateUser({
          ...user,
          term: data?.term,
          session: data?.session,
          period: data?.period,
        });
      },
      onError(err) {
        errorHandler(err);
      },
      select: (data) => data?.data[0],
    }
  );

  const { isLoading: classPopulationLoading } = useQuery(
    [queryKeys.GET_CLASS_POPULATION],
    apiServices.getClassPopulation,
    {
      enabled: ["Teacher"].includes(user?.designation_name),
      retry: 3,
      onSuccess(data) {
        updateUser({
          ...user,
          class_population: data,
        });
      },
      onError(err) {
        errorHandler(err);
      },
      select: (data) => data?.data,
    }
  );

  const isLoading =
    outstandingLoading ||
    expectedIncomeLoading ||
    discountLoading ||
    totalExpenseLoading ||
    accountBalanceLoading ||
    receivedIncomeLoading ||
    graduatedStudentLoading ||
    academicPeriodLoading ||
    schoolLoading ||
    classPopulationLoading;

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
