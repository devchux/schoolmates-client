import { useForm } from "react-formid";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useAppContext } from "./useAppContext";

export const useChangePassword = () => {
  const { apiServices, errorHandler } = useAppContext();

  const { inputs, handleChange, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    validation: {
      old_password: {
        required: true,
      },
      new_password: {
        required: true,
      },
      confirm_password: {
        required: true,
        shouldMatch: (val, { new_password }) =>
          val === new_password || "Passwords do not match",
      },
    },
  });

  const { mutateAsync: changePassword, isLoading: changePasswordLoading } = useMutation(
    apiServices.changePassword,
    {
      onSuccess() {
        toast.success("Password has been changed successfully");
        reset();
      },
      onError(err) {
        errorHandler(err);
      },
    }
  );

  return {
    inputs,
    handleChange,
    handleSubmit,
    errors,
    changePasswordLoading,
    changePassword,
  };
};
