import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import validator from "validator";
import { isValidPhoneNumber } from "react-phone-number-input";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";
import { useForm } from "react-formid";
import { useFile } from "./useFile";
import { useState } from "react";

export const useStudent = () => {
  const [sortedStudents, setSortedStudents] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [indexStatus, setIndexStatus] = useState("all");
  const { id } = useParams();
  const { apiServices, errorHandler } = useAppContext();
  const navigate = useNavigate();

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
    reset: resetForm,
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

  const reset = () => {
    resetFile();
    resetForm();
  };

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

  const { isLoading: studentDebtorsListLoading, data: studentDebtors } =
    useQuery(
      [queryKeys.GET_ALL_STUDENTS_DEBTORS],
      apiServices.getAllStudentDebtors,
      {
        retry: 3,
        onError(err) {
          errorHandler(err);
        },
        select: (data) => {
          return apiServices.formatData(data)?.map((data) => ({
            ...data,
            amount_due: (
              <>&#8358;{apiServices.commaSeperatedNumber(data.amount_due)}</>
            ),
            amount_paid: (
              <>&#8358;{apiServices.commaSeperatedNumber(data.amount_paid)}</>
            ),
            total_amount: (
              <>&#8358;{apiServices.commaSeperatedNumber(data.total_amount)}</>
            ),
          }));
        },
      }
    );

  const { isLoading: studentCreditorsListLoading, data: studentCreditors } =
    useQuery(
      [queryKeys.GET_ALL_STUDENTS_CREDITORS],
      apiServices.getAllStudentCreditors,
      {
        retry: 3,
        onError(err) {
          errorHandler(err);
        },
        select: (data) => {
          return apiServices.formatData(data)?.map((data) => ({
            ...data,
            amount_due: (
              <>&#8358;{apiServices.commaSeperatedNumber(data.amount_due)}</>
            ),
            amount_paid: (
              <>&#8358;{apiServices.commaSeperatedNumber(data.amount_paid)}</>
            ),
            total_amount: (
              <>&#8358;{apiServices.commaSeperatedNumber(data.total_amount)}</>
            ),
          }));
        },
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

  const {
    mutateAsync: getStudentBySession,
    isLoading: getStudentBySessionLoading,
  } = useMutation(apiServices.getStudentBySession, {
    onError(err) {
      errorHandler(err);
    },
    onSuccess(data) {
      setSortedStudents(apiServices.formatData(data));
      setIndexStatus("all");
      setSorted(true);
    },
  });

  const { mutateAsync: withdrawStudent, isLoading: withdrawStudentLoading } =
    useMutation(apiServices.withdrawStudent, {
      onSuccess() {
        toast.success("Student has been deleted successfully");
        navigate("/app/students");
      },
      onError(err) {
        errorHandler(err);
      },
    });

  const { isLoading: getCampusLoading, data: singleStudent } = useQuery(
    [queryKeys.GET_CAMPUS, id],
    () => apiServices.getStudent(id),
    {
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      enabled: !!id,
      select: apiServices.formatSingleData,
    }
  );

  const formatSingleStudent = id
    ? students?.find((x) => x.id === id)
    : undefined;

  const handleUpdateStudent = async (data) => await updateStudent(data);

  const handleDeleteStudent = async (data) => await deleteStudent(data);

  const isLoading =
    studentListLoading ||
    addStudentLoading ||
    updateStudentLoading ||
    getCampusLoading ||
    getStudentBySessionLoading ||
    withdrawStudentLoading ||
    studentDebtorsListLoading ||
    studentCreditorsListLoading;

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
    addStudent,
    getStudentBySession,
    sortedStudents,
    withdrawStudent,
    sorted,
    setSorted,
    indexStatus,
    setIndexStatus,
    studentDebtors,
    studentCreditors,
    onDeleteStudent: handleDeleteStudent,
    onUpdateStudent: handleUpdateStudent,
    studentData: singleStudent || formatSingleStudent,
  };
};
