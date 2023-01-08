import { useState } from "react";
import validator from "validator";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { roleMap } from "../utils/constants";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";
import { useForm } from "react-formid";
import { useFile } from "./useFile";

export const useStaff = () => {
  const [staffs, setStaffs] = useState([]);
  const { id } = useParams();

  const {
    handleImageChange,
    filePreview,
    base64String,
    reset: resetFile,
    fileRef,
  } = useFile();
  const { apiServices, errorHandler } = useAppContext();

  const {
    getFieldProps,
    inputs,
    setFieldValue,
    handleSubmit,
    errors,
    setInputs,
    handleChange,
    reset,
  } = useForm({
    defaultValues: {
      designation: "1",
      department: "",
      surname: "",
      firstname: "",
      middlename: "",
      username: "",
      email: "",
      phoneno: "",
      address: "",
    },
    validation: {
      surname: { required: true },
      firstname: { required: true },
      middlename: { required: true },
      username: { required: true },
      address: { required: true },
      phoneno: {
        required: (val) => !!val || "Phone number is required",
        isValid: (val) =>
          (typeof val === "string" && isValidPhoneNumber(val)) ||
          "Phone number is invalid",
      },
      email: {
        required: (val) => !!val || "Email address is required",
        isValid: (val) => validator.isEmail(val) || "Email address is invalid",
      },
    },
  });

  const { isLoading: designationLoading, data: designations } = useQuery(
    ["GET_DESIGNATIONS_STAFF"],
    apiServices.getDesignation,
    {
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const { isLoading: staffListLoading, refetch: refetchStaffList } = useQuery(
    [queryKeys.GET_ALL_STAFFS],
    apiServices.getAllStaffs,
    {
      retry: 3,
      onSuccess(data) {
        const formatStaffs = data.map((staff) => {
          const { designation_name } =
            designations?.data?.find((item) => item.id === staff.designation_id)
              ?.attributes || {};

          return { ...staff, designation_name: roleMap[designation_name] };
        });
        setStaffs(formatStaffs);
      },
      onError(err) {
        errorHandler(err);
      },
      select: apiServices.formatData,
    }
  );

  const { mutateAsync: toggleStaffStatus } = useMutation(
    apiServices.toggleStaffStatus,
    {
      onSuccess() {
        refetchStaffList();
        toast.success("Staff status updated successfully");
      },
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const { mutateAsync: addStaff, isLoading: addStaffLoading } = useMutation(
    apiServices.addStaff,
    {
      onSuccess() {
        toast.success("Staff has been added successfully");
        reset();
      },
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const { mutateAsync: updateStaff, isLoading: updateStaffLoading } =
    useMutation(apiServices.updateStaff, {
      onSuccess() {
        toast.success("Staff has been updated successfully");
      },
      onError(err) {
        errorHandler(err);
      },
    });

  const { mutateAsync: deleteStaff } = useMutation(apiServices.deleteStaff, {
    onSuccess() {
      toast.success("Staff has been deleted successfully");
    },
    onError(err) {
      errorHandler(err);
    },
  });

  const { isLoading: getCampusLoading, data: singleStaff } = useQuery(
    [queryKeys.GET_CAMPUS, id],
    () => apiServices.getStaff(id),
    {
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      enabled: !!id,
    }
  );

  const singleCampus = id ? staffs?.find((x) => x.id === id) : undefined;

  const handleUpdateStaff = async (data) => await updateStaff({ ...data, id });

  const handleDeleteStaff = async (data) => await deleteStaff(data);

  const isLoading =
    staffListLoading ||
    addStaffLoading ||
    updateStaffLoading ||
    getCampusLoading ||
    designationLoading;

  return {
    isLoading,
    staffs,
    designations,
    isEdit: !!id,
    onUpdateStaff: handleUpdateStaff,
    addStaff,
    staffData: singleStaff?.data?.attributes || singleCampus,
    onDeleteStaff: handleDeleteStaff,
    getFieldProps,
    inputs,
    setFieldValue,
    handleSubmit,
    errors,
    setInputs,
    handleChange,
    handleImageChange,
    filePreview,
    base64String,
    resetFile,
    fileRef,
    toggleStaffStatus,
  };
};