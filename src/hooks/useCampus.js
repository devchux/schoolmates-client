import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import validator from "validator";
import { isValidPhoneNumber } from "react-phone-number-input";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";
import { useForm } from "react-formid";

export const useCampus = () => {
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
      email: {
        required: (val) => !!val || "Email address is required",
        isValid: (val) => validator.isEmail(val) || "Email address is invalid",
      },
      address: {
        required: (val) => !!val || "Address is required",
      },
      phoneNumber: {
        required: (val) => !!val || "Phone number is required",
        isValid: (val) =>
          (typeof val === "string" && isValidPhoneNumber(val)) ||
          "Phone number is invalid",
      },
      state: {
        required: (val) => !!val || "State is required",
      },
    },
  });

  const {
    isLoading: campusListLoading,
    data: campusList,
    refetch: refetchCampusList,
  } = useQuery([queryKeys.GET_ALL_CAMPUSES], apiServices.getAllCampuses, {
    retry: 3,
    onError(err) {
      errorHandler(err);
    },
    select: apiServices.formatData,
  });

  const { isLoading: getCampusLoading, data: campusData } = useQuery(
    [queryKeys.GET_CAMPUS, id],
    () => apiServices.getCampus(id),
    {
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      enabled: !!id,
    }
  );

  const { mutateAsync: addCampus, isLoading: addCampusLoading } = useMutation(
    apiServices.addCampus,
    {
      onSuccess() {
        toast.success("Campus has been added successfully");
        reset();
      },
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const { mutateAsync: updateCampus, isLoading: updateCampusLoading } =
    useMutation(apiServices.updateCampus, {
      onSuccess() {
        toast.success("Campus has been updated successfully");
      },
      onError(err) {
        errorHandler(err);
      },
    });

  const { mutateAsync: toggleCampusStatus } = useMutation(
    apiServices.toggleCampusStatus,
    {
      onSuccess() {
        refetchCampusList();
        toast.success("Campus status updated successfully");
      },
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const singleCampus = id ? campusList?.find((x) => x.id === id) : undefined;

  const handleUpdateCampus = async (data) =>
    await updateCampus({ ...data, id });

  const isLoading =
    addCampusLoading ||
    campusListLoading ||
    updateCampusLoading ||
    getCampusLoading;

  return {
    isLoading,
    campusList,
    addCampus,
    getFieldProps,
    inputs,
    setFieldValue,
    handleSubmit,
    errors,
    setInputs,
    updateCampus: handleUpdateCampus,
    campusData: campusData?.data?.attributes || singleCampus,
    toggleCampusStatus,
    isEdit: !!id,
  };
};
