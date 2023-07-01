import { useState } from "react";
import validator from "validator";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useMutation, useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { roleMap } from "../utils/constants";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";
import { useForm } from "react-formid";
import { useFile } from "./useFile";
import ProfileImage from "../components/common/profile-image";

export const useStaff = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");
  const [indexStatus, setIndexStatus] = useState("all");
  const { id } = useParams();

  const {
    handleImageChange,
    filePreview,
    base64String,
    reset: resetFile,
    fileRef,
  } = useFile();
  const { apiServices, errorHandler, permission } = useAppContext("staffs");

  const {
    getFieldProps,
    inputs,
    setFieldValue,
    handleSubmit,
    errors,
    setInputs,
    handleChange,
    reset: resetForm,
  } = useForm({
    defaultValues: {
      designation_id: "1",
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

  const reset = () => {
    resetFile();
    resetForm();
  };

  const { isLoading: designationLoading, data: designations } = useQuery(
    ["GET_DESIGNATIONS_STAFF"],
    apiServices.getDesignation,
    {
      enabled: permission?.read || permission?.staffLoginDetails,
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const {
    isLoading: staffListLoading,
    refetch: refetchStaffList,
    data: staffsData,
  } = useQuery(
    [queryKeys.GET_ALL_STAFFS, page],
    () => apiServices.getAllStaffs(page),
    {
      enabled: permission?.read || false,
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      select: (data) => {
        const f = apiServices.formatData(data).map((staff) => {
          const { designation_name } =
            designations?.data?.find((item) => item.id === staff.designation_id)
              ?.attributes || {};

          return {
            ...staff,
            designation_name: roleMap[designation_name],
            image: (
              <ProfileImage src={staff?.image} wrapperClassName="mx-auto" />
            ),
          };
        });
        return { ...data, data: f };
      },
    }
  );

  const staffs = staffsData?.data ?? [];

  const { isLoading: allStaffsByAttendanceLoading, data: allStaffsByAttendance } = useQuery(
    [queryKeys.GET_ALL_STAFFS_BY_ATTENDANCE, page],
    () => apiServices.getStaffAttendance(page),
    {
      enabled: permission?.readAttendance || false,
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      select: (data) => {
        const f = apiServices.formatData(data)?.map((x) => ({
          ...x,
          staff: staffs?.find(({ id }) => id === x?.staff_id),
        }))

        return {...data, data: f}
      },
    }
  );

  const { mutate: addStaffAttendance, isLoading: addStaffAttendanceLoading } =
    useMutation(apiServices.addStaffAttendance, {
      onSuccess() {
        refetchStaffList();
        toast.success("Staff attendance updated successfully");
      },
      onError(err) {
        errorHandler(err);
      },
    });

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

  const { mutateAsync: deleteStaff, isLoading: deleteStaffLoading } =
    useMutation(apiServices.deleteStaff, {
      onSuccess() {
        toast.success("Staff has been deleted successfully");
        refetchStaffList();
      },
      onError(err) {
        errorHandler(err);
      },
    });

  const { mutateAsync: disableStaff, isLoading: disableStaffLoading } =
    useMutation(apiServices.disableStaff, {
      onSuccess() {
        toast.success("Staff has been disabled");
      },
      onError(err) {
        errorHandler(err);
      },
    });

  const { mutateAsync: assignClass, isLoading: assignClassLoading } =
    useMutation(apiServices.assignClass, {
      onSuccess() {
        toast.success("Class has been assigned to staff");
      },
      onError(err) {
        errorHandler(err);
      },
    });

  const { isLoading: singleStaffLoading, data: singleStaff } = useQuery(
    [queryKeys.GET_STAFF, id],
    () => apiServices.getStaff(id),
    {
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      enabled: !!id,
      select: apiServices.formatSingleData,
    }
  );

  const { isLoading: staffLoginDetailsLoading, data: staffLoginDetails } =
    useQuery(
      [queryKeys.GET_STAFF_LOGIN_DETAILS, page],
      () => apiServices.getStaffLoginDetails(page),
      {
        retry: 3,
        enabled: permission?.staffLoginDetails,
        select: (data) => {
          const f = apiServices.formatData(data)?.map((staff) => {
            const { designation_name } = designations?.data?.find(
              (item) => item.id === staff.designation_id
            )?.attributes ?? { designation_name: "" };
            return {
              ...staff,
              designation_name: roleMap[designation_name],
            };
          });

          return {...data, data: f }
        },
        onError(err) {
          errorHandler(err);
        },
      }
    );

  const handleUpdateStaff = async (data) => await updateStaff({ ...data, id });

  const handleDeleteStaff = async (data) => await deleteStaff(data);

  const isLoading =
    staffListLoading ||
    addStaffLoading ||
    updateStaffLoading ||
    singleStaffLoading ||
    designationLoading ||
    allStaffsByAttendanceLoading ||
    staffLoginDetailsLoading ||
    deleteStaffLoading ||
    disableStaffLoading ||
    addStaffAttendanceLoading ||
    assignClassLoading;

  return {
    isLoading,
    staffs,
    designations,
    isEdit: !!id,
    onUpdateStaff: handleUpdateStaff,
    addStaff,
    staffData: singleStaff,
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
    allStaffsByAttendance,
    indexStatus,
    setIndexStatus,
    permission,
    staffLoginDetails,
    disableStaff,
    addStaffAttendance,
    apiServices,
    assignClass,
    staffsData,
  };
};
