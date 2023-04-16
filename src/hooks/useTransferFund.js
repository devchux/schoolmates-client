import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useTransferFund = () => {
  const { apiServices, permission } = useAppContext("transfer");
  const { id } = useParams();

  const { mutate: postTransferFund, isLoading: postTransferLoading } =
    useMutation(apiServices.postTransferFund, {
      onSuccess() {
        toast.success("Transfer has been registered");
      },
      onError: apiServices.errorHandler,
    });

  const {
    isLoading: fundsLoading,
    data: funds,
    refetch: refetchFunds,
  } = useQuery([queryKeys.GET_FUNDS], apiServices.getFunds, {
    select: apiServices.formatData,
    onError: apiServices.errorHandler,
  });

  const { mutate: deleteTransferFund, isLoading: deleteTransferLoading } =
    useMutation(apiServices.deleteFund, {
      onSuccess() {
        toast.success("Transfer has been deleted");
        refetchFunds();
      },
      onError: apiServices.errorHandler,
    });

  const { mutate: updateTransferFund, isLoading: updateTransferLoading } =
    useMutation(apiServices.editFund, {
      onSuccess() {
        toast.success("Transfer has been updated");
      },
      onError: apiServices.errorHandler,
    });

  const { isLoading: fundLoading, data: fundData } = useQuery(
    [queryKeys.GET_FUNDS, id],
    () => apiServices.getFund(id),
    {
      enabled: !!id,
      select: (data) => ({
        ...data?.data[0]?.attributes,
        id: data?.data[0]?.id,
      }),
      onError: apiServices.errorHandler,
    }
  );

  const isLoading =
    postTransferLoading ||
    fundsLoading ||
    fundLoading ||
    updateTransferLoading ||
    deleteTransferLoading;

  return {
    postTransferFund,
    isLoading,
    apiServices,
    funds,
    permission,
    fundData,
    updateTransferFund,
    deleteTransferFund,
    isEdit: !!id,
  };
};
