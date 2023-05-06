import { useMutation, useQuery } from "react-query";
import { useAppContext } from "./useAppContext";
import { toast } from "react-toastify";
import queryKeys from "../utils/queryKeys";

export const usePreSchool = () => {
  const { apiServices, permission } = useAppContext("pre-school");

  const { data: preSchools, isLoading: preSchoolsLoading } = useQuery(
    [queryKeys.GET_ALL_PRE_SCHOOLS],
    apiServices.getPreSchools,
    {
      enabled: permission?.read || false,
      select: apiServices.formatData,
      onError: apiServices.errorHandler,
    }
  );

  const { mutateAsync: createPreSchool, isLoading: createPreSchoolLoading } =
    useMutation(apiServices.postPreSchool, {
      onError: apiServices.errorHandler,
      onSuccess() {
        toast.success("Pre School has been created successfully");
      },
    });

  const isLoading = createPreSchoolLoading || preSchoolsLoading;

  return {
    createPreSchool,
    isLoading,
    preSchools,
    permission,
  };
};
