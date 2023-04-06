import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useAppContext } from "./useAppContext";

export const useAcademicPeriod = () => {
  const [academicPeriodPrompt, setAcademicPeriodPrompt] = useState(false);
  const { apiServices } = useAppContext();

  const { mutate: postAcademicPeriod, isLoading } = useMutation(
    apiServices.postAcademicPeriod,
    {
      onSuccess() {
        toast.success("Academic Period has been posted successfully");
      },
      onError: apiServices.errorHandler,
    }
  );

  return { postAcademicPeriod, isLoading, academicPeriodPrompt, setAcademicPeriodPrompt };
};

export const useMaintenancePeriod = () => {
  const [maintenancePrompt, setMaintenancePrompt] = useState(false);
  const { apiServices } = useAppContext();

  const { mutate: postMaintenance, isLoading } = useMutation(
    apiServices.postMaintenance,
    {
      onSuccess() {
        toast.success("Maintenance has been posted successfully");
      },
      onError: apiServices.errorHandler,
    }
  );

  return { postMaintenance, isLoading, maintenancePrompt, setMaintenancePrompt };
};



