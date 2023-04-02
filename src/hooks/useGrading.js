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
export const useTransferFund = () => {
  const { apiServices } = useAppContext();

  const { mutate: PostTransferFund, isLoading: postTransferLoading } = useMutation(
    apiServices.PostTransferFund,
    {
      onSuccess() {
        toast.success("Transfer was successful");
      },
      onError: apiServices.errorHandler,
    }
  );

  const isLoading =  postTransferLoading;

  return {
    PostTransferFund,
    isLoading,
  };
};
