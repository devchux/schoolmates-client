import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useDepartments = () => {
  const { apiServices, errorHandler, permission } =
    useAppContext("departments");

  const { isLoading: departmentsListLoading, data: departmentsList } = useQuery(
    [queryKeys.GET_ALL_DEPARTMENTS],
    apiServices.getAllDepartmentList,
    {
      enabled: permission?.read || false,
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      select: apiServices.formatData,
    }
  );

  const { mutate: createDepartment, isLoading: createDepartmentLoading } =
    useMutation(apiServices.createDepartment, {
      onSuccess() {
        toast.success("Department has been created");
      },
      onError: apiServices.errorHandler,
    });

  const isLoading = departmentsListLoading || createDepartmentLoading;

  return {
    isLoading,
    departmentsList,
    permission,
    createDepartment,
  };
};
