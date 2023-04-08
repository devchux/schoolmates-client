import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useVehicleMaintenance = () => {
  const { id } = useParams();
  const { apiServices } = useAppContext();

  const { mutate, isLoading: postMaintenanceLoading } = useMutation(
    apiServices.postMaintenance,
    {
      onSuccess() {
        toast.success("Maintenance has been posted successfully");
      },
      onError: apiServices.errorHandler,
    }
  );

  const { isLoading: vehicleDataLoading, data: vehicleData } = useQuery(
    [queryKeys.GET_VEHICLE, id],
    () => apiServices.getVehicle(id),
    {
      enabled: !!id,
      retry: 3,
      onError(err) {
        apiServices.errorHandler(err);
      },
      select: apiServices.formatSingleData,
    }
  );

  const { isLoading: vehicleMaintenanceLoading, data: vehicleMaintenance } =
    useQuery(
      [queryKeys.GET_ALL_VEHICLE_MAINTENANCE],
      apiServices.getAllVehicleMaintenance,
      {
        retry: 3,
        onError(err) {
          apiServices.errorHandler(err);
        },
        select: apiServices.formatData,
      }
    );

  const postMaintenance = (data) => {
    mutate({
      ...data,
      id,
    });
  };

  const isLoading = postMaintenanceLoading || vehicleDataLoading || vehicleMaintenanceLoading;

  return { postMaintenance, isLoading, vehicleData, vehicleMaintenance, isEdit: !!id };
};
