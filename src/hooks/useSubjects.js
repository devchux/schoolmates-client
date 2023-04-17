import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";
import { useParams } from "react-router-dom";

export const useSubject = () => {
  const { apiServices, permission } = useAppContext("subjects");
  const { id } = useParams();

  const {
    isLoading: subjectsLoading,
    data: subjects,
    refetch: refetchSubjects,
  } = useQuery([queryKeys.GET_SUBJECTS], apiServices.getAllSubjects, {
    select: apiServices.formatData,
    onError: apiServices.errorHandler,
  });

  const { isLoading: subjectDataLoading, data: subjectData } = useQuery(
    [queryKeys.GET_SUBJECTS, id],
    () => apiServices.getSubject(id),
    {
      enabled: !!id,
      select: apiServices.formatSingleData,
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

  const { isLoading: deleteSubjectLoading, mutate: deleteSubject } =
    useMutation(apiServices.deleteSubject, {
      onSuccess() {
        toast.success("Subject has been deleted successfully");
        refetchSubjects();
      },
      onError: apiServices.errorHandler,
    });

  const { isLoading: updateSubjectLoading, mutate: updateSubject } =
    useMutation(apiServices.updateSubject, {
      onSuccess() {
        toast.success("Subject has been updated successfully");
      },
      onError: apiServices.errorHandler,
    });

  const isLoading =
    subjectsLoading ||
    addSubjectLoading ||
    subjectDataLoading ||
    deleteSubjectLoading ||
    updateSubjectLoading;

  return {
    isLoading,
    subjects,
    permission,
    addSubject,
    subjectData,
    deleteSubject,
    updateSubject,
    isEdit: !!id,
  };
};
