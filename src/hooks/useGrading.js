import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useAppContext } from "./useAppContext";

export const useGrading = () => {
  const { apiServices } = useAppContext();

  const { mutate: postGrading, isLoading: postGradingLoading } = useMutation(
    apiServices.postGrading,
    {
      onSuccess() {
        toast.success("Grade has been uploaded");
      },
      onError: apiServices.errorHandler,
    }
  );

  const isLoading = postGradingLoading;

  return {
    postGrading,
    isLoading,
  };
};
