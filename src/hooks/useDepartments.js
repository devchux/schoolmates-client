import { useQuery } from "react-query";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useDepartments = () => {
  const { apiServices, errorHandler } = useAppContext();

  const { isLoading: departmentsListLoading, data: departmentsList } = useQuery(
    [queryKeys.GET_ALL_DEPARTMENTS],
    apiServices.getAllDepartmentList,
    {
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      select: apiServices.formatData,
    }
  );

  const isLoading = departmentsListLoading;

  return {
    isLoading,
    departmentsList,
  };
};
