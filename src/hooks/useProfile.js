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
      signature: "",
      signaturePreview: "",
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
    let updatedInputs = {
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
    };
    if (["Teacher", "Principal"].includes(user.designation_name)) {
      updatedInputs["signature"] = user.signature;
    }
    setInputs(updatedInputs);
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
    user,
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
    convertBase64: apiServices.convertBase64,
  };
};
