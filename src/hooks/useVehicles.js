import { useState } from "react";
import { useForm } from "react-formid";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useVehicles = () => {
  const [indexStatus, setIndexStatus] = useState("all");
  const { id } = useParams();
  const { apiServices, errorHandler } = useAppContext();

  const {
    getFieldProps,
    inputs,
    setFieldValue,
    handleSubmit,
    errors,
    setInputs,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneno: "+234",
      address: "",
      state: "",
    },
    validation: {
      name: {
        required: (val) => !!val || "Campus name is required",
      },
    },
  });

  const { isLoading: vehiclesListLoading, data: vehiclesList } = useQuery(
    [queryKeys.GET_ALL_VEHICLES],
    apiServices.getAllVehicles,
    {
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
        reset();
      },
      onError(err) {
        errorHandler(err);
      },
    }
  );

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
    vehicleLogsListLoading;

  return {
    getFieldProps,
    inputs,
    setFieldValue,
    handleSubmit,
    errors,
    setInputs,
    isLoading,
    addVehicle,
    handleUpdateVehicle,
    handleDeleteVehicle,
    vehiclesList,
    vehicleLogsList,
    indexStatus,
    setIndexStatus,
    isEdit: !!id,
  };
};
