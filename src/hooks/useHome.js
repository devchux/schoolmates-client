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

  const isLoading = outstandingLoading || expectedIncomeLoading;

  return {
    isLoading,
    outstandingList,
    expectedIncomeList,
  };
};
