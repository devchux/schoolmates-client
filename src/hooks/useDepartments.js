import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";
import { useParams } from "react-router-dom";

export const useDepartments = () => {
  const { apiServices, errorHandler, permission } =
    useAppContext("departments");
  const { id } = useParams();

  const {
    isLoading: departmentsListLoading,
    data: departmentsList,
    refetch: refetchDepartmentList,
  } = useQuery(
    [queryKeys.GET_ALL_DEPARTMENTS],
    apiServices.getAllDepartmentList,
    {
      enabled: permission?.read,
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      select: apiServices.formatData,
    }
  );

  const { isLoading: departmentDataLoading, data: departmentData } = useQuery(
    [queryKeys.GET_ALL_DEPARTMENTS, id],
    () => apiServices.getDepartment(id),
    {
      enabled: !!id,
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      select: apiServices.formatSingleData,
    }
  );

  const { mutate: createDepartment, isLoading: createDepartmentLoading } =
    useMutation(apiServices.createDepartment, {
      onSuccess() {
        toast.success("Department has been created");
      },
      onError: apiServices.errorHandler,
    });

  const { mutate: deleteDepartment, isLoading: deleteDepartmentLoading } =
    useMutation(apiServices.deleteDepartment, {
      onSuccess() {
        toast.success("Department has been deleted");
        refetchDepartmentList();
      },
      onError: apiServices.errorHandler,
    });

  const { mutate: updateDepartment, isLoading: updateDepartmentLoading } =
    useMutation(apiServices.updateDepartment, {
      onSuccess() {
        toast.success("Department has been updated");
      },
      onError: apiServices.errorHandler,
    });

  const isLoading =
    departmentsListLoading ||
    createDepartmentLoading ||
    updateDepartmentLoading ||
    departmentDataLoading ||
    deleteDepartmentLoading;

  return {
    isLoading,
    departmentsList,
    permission,
    createDepartment,
    updateDepartment,
    departmentData,
    deleteDepartment,
    isEdit: !!id,
  };
};
