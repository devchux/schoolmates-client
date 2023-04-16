import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useAppContext } from "./useAppContext";
import queryKeys from "../utils/queryKeys";
import { useParams } from "react-router-dom";

export const useGrading = () => {
  const { apiServices } = useAppContext();
  const { id } = useParams();

  const { mutate: postGrading, isLoading: postGradingLoading } = useMutation(
    apiServices.postGrading,
    {
      onSuccess() {
        toast.success("Grade has been uploaded");
      },
      onError: apiServices.errorHandler,
    }
  );

  const { mutate: updateGrading, isLoading: updateGradingLoading } =
    useMutation(apiServices.updateGrading, {
      onSuccess() {
        toast.success("Grade has been updated");
      },
      onError: apiServices.errorHandler,
    });

  const { mutate: deleteGrading, isLoading: deleteGradingLoading } =
    useMutation(apiServices.deleteGrading, {
      onSuccess() {
        toast.success("Grade has been deleted");
      },
      onError: apiServices.errorHandler,
    });

  const { data: grading, isLoading: gradingLoading } = useQuery(
    [queryKeys.GET_GRADING],
    apiServices.getGrading,
    {
      select: apiServices.formatData,
      onError(err) {
        apiServices.errorHandler(err);
      },
    }
  );

  const { data: singleGrading, isLoading: singleGradingLoading } = useQuery(
    [queryKeys.GET_GRADING, id],
    () => apiServices.getSingleGrading(id),
    {
      enabled: !!id,
      select: apiServices.formatSingleData,
      onError(err) {
        apiServices.errorHandler(err);
      },
    }
  );

  const isLoading =
    postGradingLoading ||
    gradingLoading ||
    singleGradingLoading ||
    updateGradingLoading || deleteGradingLoading;

  return {
    postGrading,
    isLoading,
    grading,
    singleGrading,
    updateGrading,
    deleteGrading,
    isEdit: !!id,
  };
};
