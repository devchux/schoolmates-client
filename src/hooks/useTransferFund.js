import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useTransferFund = () => {
  const { apiServices, permission } = useAppContext('transfer');

  const { mutate: PostTransferFund, isLoading: postTransferLoading } =
    useMutation(apiServices.PostTransferFund, {
      onSuccess() {
        toast.success("Transfer has been registered");
      },
      onError: apiServices.errorHandler,
    });

    const { isLoading: fundsLoading, data: funds } = useQuery(
      [queryKeys.GET_FUNDS],
      apiServices.getFunds,
      {
        select: apiServices.formatData,
        onError: apiServices.errorHandler,
      }
    );

  const isLoading = postTransferLoading || fundsLoading;

  return {
    PostTransferFund,
    isLoading,
    apiServices,
    funds,
    permission,
  };
};
