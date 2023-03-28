import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useSubject = () => {
  const { apiServices, permission } = useAppContext("subjects");

  const { isLoading: subjectsLoading, data: subjects } = useQuery(
    [queryKeys.GET_SUBJECTS],
    apiServices.getAllSubjects,
    {
      select: apiServices.formatData,
      onError: apiServices.errorHandler,
    }
  );

  const { isLoading: addSubjectLoading, mutate: addSubject } = useMutation(
    apiServices.addSubject,
    {
      onSuccess() {
        toast.success("Subject has been created successfully");
      },
      onError: apiServices.errorHandler,
    }
  );

  const isLoading = subjectsLoading || addSubjectLoading;

  return { isLoading, subjects, permission, addSubject };
};
