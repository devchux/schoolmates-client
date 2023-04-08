import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "./useAppContext";

export const useVehicleMaintenance = () => {
  const { id } = useParams();
  const { apiServices } = useAppContext();

  const { mutate, isLoading } = useMutation(apiServices.postMaintenance, {
    onSuccess() {
      toast.success("Maintenance has been posted successfully");
    },
    onError: apiServices.errorHandler,
  });

  const postMaintenance = (data) => {
    mutate({
      ...data,
      id,
    });
  };

  return { postMaintenance, isLoading };
};
