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
import ProfileImage from "../components/common/profile-image";
import Numeral from "react-numeral";

export const useStudent = () => {
  const { apiServices, errorHandler, permission, user } =
    useAppContext("students");
  const [sortedStudents, setSortedStudents] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [indexStatus, setIndexStatus] = useState("all");
  const [session, setSession] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [classes, setClasses] = useState({ present_class: "", sub_class: "" });
  const [sortBy, setSortBy] = useState("");
  const { id } = useParams();
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
      genotype: "",
      blood_group: "A+",
      gender: "female",
      dob: "",
      nationality: "",
      state: "",
      session_admitted: "",
      class: "",
      present_class: "",
      sub_class: "",
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

  const handleSortBy = ({ target: { value } }) => {
    setSortBy(value);
  };

  const {
    isLoading: studentListLoading,
    data: students,
    refetch: refetchStudents,
  } = useQuery([queryKeys.GET_ALL_STUDENTS], apiServices.getAllStudents, {
    enabled: permission?.read || false,
    retry: 3,
    onError(err) {
      errorHandler(err);
    },
    select: (data) => {
      const format = apiServices.formatData(data)?.map((student) => {
        return {
          ...student,
          image: (
            <ProfileImage src={student?.image} wrapperClassName="mx-auto" />
          ),
        };
      });
      
      return { ...data, data: format }
    },
  });

  const { data: studentByClassAndSession, isLoading: studentByClassLoading } =
    useQuery(
      [
        queryKeys.GET_STUDENTS_BY_ATTENDANCE,
        user?.class_assigned,
        user?.session,
      ],
      () =>
        apiServices.getStudentByClassAndSession(
          user?.class_assigned,
          user?.session
        ),
      {
        enabled: permission?.myStudents || false,
        select: apiServices.formatData,
        onError(err) {
          errorHandler(err);
        },
      }
    );

  const { isLoading: studentDebtorsListLoading, data: studentDebtors } =
    useQuery(
      [queryKeys.GET_ALL_STUDENTS_DEBTORS],
      apiServices.getAllStudentDebtors,
      {
        enabled: permission?.readDebtors || false,
        retry: 3,
        onError(err) {
          errorHandler(err);
        },
        select: (data) => {
          return apiServices.formatData(data)?.map((data) => ({
            ...data,
            amount_due: (
              <>
                &#8358;
                <Numeral value={data.amount_due || "0"} format="0,0.00" />
              </>
            ),
            amount_paid: (
              <>
                &#8358;
                <Numeral value={data.amount_paid || "0"} format="0,0.00" />
              </>
            ),
            total_amount: (
              <>
                &#8358;
                <Numeral value={data.total_amount || "0"} format="0,0.00" />
              </>
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
        enabled: permission?.readCreditors || false,
        retry: 3,
        onError(err) {
          errorHandler(err);
        },
        select: (data) => {
          return apiServices.formatData(data)?.map((data) => ({
            ...data,
            amount_due: (
              <>
                &#8358;
                <Numeral value={data.amount_due || "0"} format="0,0.00" />
              </>
            ),
            amount_paid: (
              <>
                &#8358;
                <Numeral value={data.amount_paid || "0"} format="0,0.00" />
              </>
            ),
            total_amount: (
              <>
                &#8358;
                <Numeral value={data.total_amount || "0"} format="0,0.00" />
              </>
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
        refetchStudents();
      },
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const { isLoading: getStudentBySessionLoading } = useQuery(
    [queryKeys.GET_ALL_STUDENTS_BY_SESSION, session],
    () => apiServices.getStudentBySession(session),
    {
      enabled: !!session && permission?.sortSession,
      onError(err) {
        errorHandler(err);
        setSession("");
      },
      onSuccess(data) {
        const format = apiServices.formatData(data)?.map((student) => {
          return {
            ...student,
            image: (
              <ProfileImage src={student?.image} wrapperClassName="mx-auto" />
            ),
          };
        });
        setSession("");
        setSortedStudents(format);
        setIndexStatus("all");
        setSorted(true);
      },
    }
  );

  const { isLoading: getStudentByAdmissionNumberLoading } = useQuery(
    [queryKeys.GET_ALL_STUDENTS_BY_ADMISSION_NUMBER, admissionNumber],
    () => apiServices.getStudentByAdmissionNumber(admissionNumber),
    {
      enabled: !!admissionNumber && permission?.sortAdmissionNumber,
      onError(err) {
        errorHandler(err);
        setAdmissionNumber("");
      },
      onSuccess(data) {
        const format = apiServices.formatData(data)?.map((student) => {
          return {
            ...student,
            image: (
              <ProfileImage src={student?.image} wrapperClassName="mx-auto" />
            ),
          };
        });
        setAdmissionNumber("");
        setSortedStudents(format);
        setIndexStatus("all");
        setSorted(true);
      },
    }
  );

  const { isLoading: getStudentByClassLoading } = useQuery(
    [
      queryKeys.GET_ALL_STUDENTS_BY_CLASS,
      classes.present_class,
      classes.sub_class,
    ],
    () => apiServices.getStudentByClass(classes),
    {
      enabled:
        !!classes.present_class &&
        !!classes.sub_class &&
        permission?.sortStudentByClass,
      onError(err) {
        errorHandler(err);
        setClasses({ present_class: "", sub_class: "" });
      },
      onSuccess(data) {
        const format = apiServices.formatData(data)?.map((student) => {
          return {
            ...student,
            image: (
              <ProfileImage src={student?.image} wrapperClassName="mx-auto" />
            ),
          };
        });
        setClasses({ present_class: "", sub_class: "" });
        setSortedStudents(format);
        setIndexStatus("all");
        setSorted(true);
      },
    }
  );

  const { mutateAsync: withdrawStudent, isLoading: withdrawStudentLoading } =
    useMutation(apiServices.withdrawStudent, {
      onSuccess() {
        toast.success("Student has been withdrawn");
      },
      onError(err) {
        errorHandler(err);
      },
    });

  const { mutateAsync: acceptStudent, isLoading: acceptStudentLoading } =
    useMutation(apiServices.acceptStudent, {
      onSuccess() {
        toast.success("Student has been accepted");
      },
      onError(err) {
        errorHandler(err);
      },
    });

  const { mutateAsync: transferStudent, isLoading: transferStudentLoading } =
    useMutation(apiServices.transferStudent, {
      onSuccess() {
        toast.success("Student has been transferred");
      },
      onError(err) {
        errorHandler(err);
      },
    });

  const { mutateAsync: promoteStudent, isLoading: promoteStudentLoading } =
    useMutation(apiServices.promoteStudent, {
      onSuccess() {
        toast.success("Student has been promoted");
      },
      onError(err) {
        errorHandler(err);
      },
    });

  const { mutateAsync: postHealthReport, isLoading: postHealthReportLoading } =
    useMutation(apiServices.postHealthReport, {
      onSuccess() {
        toast.success("Health report has been created");
      },
      onError(err) {
        errorHandler(err);
      },
    });

  const {
    mutateAsync: postCommunicationBook,
    isLoading: postCommunicationBookLoading,
  } = useMutation(apiServices.postCommunicationBook, {
    onSuccess() {
      toast.success("Record has been created");
    },
    onError(err) {
      errorHandler(err);
    },
  });

  const { isLoading: getStudentLoading, data: singleStudent } = useQuery(
    [queryKeys.GET_STUDENT, id],
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

  const { isLoading: alumniLoading, data: graduatedStudents } = useQuery(
    [queryKeys.GET_GRADUATED_STUDENTS],
    apiServices.getAlumniList,
    {
      retry: 3,
      enabled: permission?.alumni,
      select: (data) => {
        return apiServices.formatData(data)?.map((student) => {
          return {
            ...student,
            image: (
              <ProfileImage src={student?.image} wrapperClassName="mx-auto" />
            ),
          };
        });
      },
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const {
    isLoading: studentLoginDetailsLoading,
    data: studentLoginDetailsStudents,
  } = useQuery(
    [queryKeys.GET_STUDENT_LOGIN_DETAILS],
    apiServices.getStudentLoginDetails,
    {
      retry: 3,
      enabled: permission?.studentLoginDetails,
      select: (data) => data?.data,
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const { isLoading: communicationListLoading, data: communicationList } =
    useQuery(
      [queryKeys.GET_COMMUNICATION_BOOK],
      apiServices.getCommunicationBook,
      {
        retry: 3,
        enabled: permission?.communication ?? false,
        select: apiServices.formatData,
        onError(err) {
          errorHandler(err);
        },
      }
    );

  const { mutate: graduateStudent, isLoading: graduateStudentLoading } =
    useMutation(apiServices.graduateStudent, {
      onSuccess() {
        toast.success("Student is now an alumni");
        navigate("/app/students");
      },
      onError(err) {
        errorHandler(err);
      },
    });

  const { mutate: postBusRouting, isLoading: postBusRoutingLoading } =
    useMutation(apiServices.postBusRouting, {
      onSuccess() {
        toast.success("Student is now an alumni");
        navigate("/app/students");
      },
      onError(err) {
        errorHandler(err);
      },
    });

  const formatSingleStudent = id
    ? students?.find((x) => x.id === id)
    : undefined;

  const handleUpdateStudent = async (data) => await updateStudent(data);

  const handleDeleteStudent = async (data) => await deleteStudent(data);

  const isLoading =
    studentListLoading ||
    addStudentLoading ||
    updateStudentLoading ||
    getStudentLoading ||
    getStudentBySessionLoading ||
    withdrawStudentLoading ||
    studentDebtorsListLoading ||
    studentCreditorsListLoading ||
    getStudentByAdmissionNumberLoading ||
    studentByClassLoading ||
    graduateStudentLoading ||
    alumniLoading ||
    getStudentByClassLoading ||
    studentLoginDetailsLoading ||
    acceptStudentLoading ||
    transferStudentLoading ||
    promoteStudentLoading ||
    postHealthReportLoading ||
    postBusRoutingLoading ||
    communicationListLoading ||
    postCommunicationBookLoading;

  return {
    user,
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
    setSession,
    sortedStudents,
    withdrawStudent,
    sorted,
    setSorted,
    indexStatus,
    setIndexStatus,
    studentDebtors,
    studentCreditors,
    permission,
    handleSortBy,
    sortBy,
    setSortBy,
    setAdmissionNumber,
    setClasses,
    studentByClassAndSession,
    graduatedStudents,
    graduateStudent,
    studentLoginDetailsStudents,
    acceptStudent,
    transferStudent,
    promoteStudent,
    postHealthReport,
    apiServices,
    postBusRouting,
    communicationList,
    postCommunicationBook,
    onDeleteStudent: handleDeleteStudent,
    onUpdateStudent: handleUpdateStudent,
    studentData: singleStudent || formatSingleStudent,
  };
};
