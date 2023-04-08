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
