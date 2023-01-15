import { useEffect } from "react";
import { useForm } from "react-formid";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useAppContext } from "./useAppContext";
import { useFile } from "./useFile";

export const useProfile = () => {
  const { apiServices, errorHandler, user, updateUser } = useAppContext();

  const {
    getFieldProps,
    inputs,
    setFieldValue,
    handleSubmit,
    errors,
    setInputs,
    handleChange,
  } = useForm({
    defaultValues: {
      id: "",
      department: "",
      surname: "",
      firstname: "",
      middlename: "",
      username: "",
      email: "",
      phoneno: "",
      address: "",
      image: "",
    },
  });

  const { handleImageChange, filePreview, base64String, fileRef, reset } =
    useFile();

  const {
    id,
    department,
    surname,
    firstname,
    middlename,
    username,
    email,
    phoneno,
    address,
    image,
  } = user;

  const { mutateAsync: updateProfile, isLoading: updateProfileLoading } =
    useMutation(apiServices.updateProfile, {
      onSuccess(data) {
        updateUser({ ...user, ...data?.data });
        toast.success("Profile has been updated successfully");
      },
      onError(err) {
        errorHandler(err);
      },
    });

  const isLoading = updateProfileLoading;

  useEffect(() => {
    setInputs({
      ...inputs,
      id,
      department,
      surname,
      firstname,
      middlename,
      username,
      email,
      phoneno,
      address,
      image,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    department,
    surname,
    firstname,
    middlename,
    username,
    email,
    phoneno,
    address,
    image,
  ]);

  return {
    getFieldProps,
    inputs,
    setFieldValue,
    handleSubmit,
    errors,
    setInputs,
    handleChange,
    isLoading,
    updateProfile,
    handleImageChange,
    filePreview,
    base64String,
    fileRef,
    reset,
  };
};
