import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useVehicles = () => {
  const [indexStatus, setIndexStatus] = useState("all");
  const { id } = useParams();
  const { apiServices, errorHandler, permission } = useAppContext("vehicles");

  const { isLoading: vehiclesListLoading, data: vehiclesList } = useQuery(
    [queryKeys.GET_ALL_VEHICLES],
    apiServices.getAllVehicles,
    {
      enabled: permission?.read || false,
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      select: apiServices.formatData,
    }
  );

  const { isLoading: vehicleLogsListLoading, data: vehicleLogsList } = useQuery(
    [queryKeys.GET_ALL_VEHICLE_LOGS],
    apiServices.getAllVehicleLogs,
    {
      enabled: permission?.readLogs || false,
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      select: apiServices.formatData,
    }
  );

  const { mutateAsync: addVehicle, isLoading: addVehicleLoading } = useMutation(
    apiServices.addVehicle,
    {
      onSuccess() {
        toast.success("Vehicle has been added successfully");
      },
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const { mutateAsync: addVehicleLogs, isLoading: addVehicleLogsLoading } =
    useMutation(apiServices.addVehicleLogs, {
      onSuccess() {
        toast.success("Vehicle Log has been added successfully");
      },
      onError(err) {
        errorHandler(err);
      },
    });

  const { mutateAsync: updateVehicle, isLoading: updateVehicleLoading } =
    useMutation(apiServices.updateVehicle, {
      onSuccess() {
        toast.success("Vehicle has been updated successfully");
      },
      onError(err) {
        errorHandler(err);
      },
    });

  const { mutateAsync: deleteVehicle } = useMutation(
    apiServices.deleteVehicle,
    {
      onSuccess() {
        toast.success("Vehicle has been deleted successfully");
      },
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const handleUpdateVehicle = async (data) => await updateVehicle(data);

  const handleDeleteVehicle = async (data) => await deleteVehicle(data);

  const isLoading =
    addVehicleLoading ||
    updateVehicleLoading ||
    vehiclesListLoading ||
    vehicleLogsListLoading ||
    addVehicleLogsLoading;

  return {
    isLoading,
    addVehicle,
    handleUpdateVehicle,
    handleDeleteVehicle,
    vehiclesList,
    vehicleLogsList,
    indexStatus,
    setIndexStatus,
    permission,
    addVehicleLogs,
    isEdit: !!id,
  };
};
