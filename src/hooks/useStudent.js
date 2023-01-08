import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import validator from "validator";
import { isValidPhoneNumber } from "react-phone-number-input";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";
import { useForm } from "react-formid";
import { useFile } from "./useFile";

export const useStudent = () => {
  const { id } = useParams();
  const { apiServices, errorHandler } = useAppContext();

  const {
    handleImageChange,
    filePreview,
    base64String,
    reset: resetFile,
    fileRef,
  } = useFile();

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
      surname: "",
      firstname: "",
      middlename: "",
      admission_number: "",
      username: "",
      genotype: "",
      blood_group: "A+",
      gender: "female",
      dob: "",
      nationality: "",
      state: "",
      session_admitted: "",
      class: "",
      present_class: "",
      image: "",
      home_address: "",
      phone_number: "",
      email_address: "",
      file: null,
    },
    validation: {
      surname: { required: true },
      firstname: { required: true },
      middlename: { required: true },
      admission_number: { required: true },
      username: { required: true },
      genotype: { required: true },
      blood_group: { required: true },
      gender: { required: true },
      dob: { required: true },
      nationality: { required: true },
      state: { required: true },
      session_admitted: { required: true },
      class: { required: true },
      present_class: { required: true },
      home_address: { required: true },
      phone_number: {
        required: (val) => !!val || "Phone number is required",
        isValid: (val) =>
          (typeof val === "string" && isValidPhoneNumber(val)) ||
          "Phone number is invalid",
      },
      email_address: {
        required: (val) => !!val || "Email address is required",
        isValid: (val) => validator.isEmail(val) || "Email address is invalid",
      },
    },
  });

  const { isLoading: studentListLoading, data: students } = useQuery(
    [queryKeys.GET_ALL_STUDENTS],
    apiServices.getAllStudents,
    {
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      select: apiServices.formatData,
    }
  );

  const { mutateAsync: addStudent, isLoading: addStudentLoading } = useMutation(
    apiServices.addStudent,
    {
      onSuccess() {
        toast.success("Student has been added successfully");
        reset();
      },
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const { mutateAsync: updateStudent, isLoading: updateStudentLoading } =
    useMutation(apiServices.updateStudent, {
      onSuccess() {
        toast.success("Student has been updated successfully");
      },
      onError(err) {
        errorHandler(err);
      },
    });

  const { mutateAsync: deleteStudent } = useMutation(
    apiServices.deleteStudent,
    {
      onSuccess() {
        toast.success("Student has been deleted successfully");
      },
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const { isLoading: getCampusLoading, data: singleStudent } = useQuery(
    [queryKeys.GET_CAMPUS, id],
    () => apiServices.getStudent(id),
    {
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      enabled: !!id,
    }
  );

  const singleCampus = id ? students?.find((x) => x.id === id) : undefined;

  const handleUpdateStudent = async (data) =>
    await updateStudent({ ...data, id });

  const handleDeleteStudent = async (data) => await deleteStudent(data);

  const isLoading =
    studentListLoading ||
    addStudentLoading ||
    updateStudentLoading ||
    getCampusLoading;

  return {
    isLoading,
    students,
    getFieldProps,
    inputs,
    setFieldValue,
    handleSubmit,
    errors,
    setInputs,
    handleChange,
    isEdit: !!id,
    handleImageChange,
    filePreview,
    base64String,
    resetFile,
    fileRef,
    onUpdateStudent: handleUpdateStudent,
    addStudent,
    studentData: singleStudent?.data?.attributes || singleCampus,
    onDeleteStudent: handleDeleteStudent,
  };
};
