import { useQuery } from "react-query";
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

  const isLoading = subjectsLoading;

  return { isLoading, subjects, permission };
};
