import { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useResults = () => {
  const { apiServices, errorHandler, permission, user } =
    useAppContext("results");
  const [openPrompt, setOpenPrompt] = useState(false);
  const [selectedComment, setSelectedComment] = useState("");
  const [teacherComment, setTeacherComment] = useState("");
  const [hosComment, setHosComment] = useState("");
  const [comment, setComment] = useState("teacher");
  const [studentData, setStudentData] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [initGetStudentsByClass, setInitGetStudentsByClass] = useState(false);
  const [initGetStudentData, setInitGetStudentData] = useState(true);
  const [initGetExistingResult, setInitGetExistingResult] = useState(false);
  const { state } = useLocation();
  const pdfExportComponent = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => pdfExportComponent.current,
  });

  const { data: academicDate, isLoading: academicDateLoading } = useQuery(
    [queryKeys.GET_ACADEMIC_DATE],
    apiServices.getResumptionDate,
    {
      onError(err) {
        errorHandler(err);
      },
      select: (data) => data?.data[0]?.attributes,
    }
  );

  const { data: maxScores, isLoading: maxScoresLoading } = useQuery(
    [queryKeys.GET_MAX_SCORES],
    apiServices.getMaxScores,
    {
      onError(err) {
        errorHandler(err);
      },
      select: (data) => data?.data[0]?.attributes,
    }
  );
  const { data: studentByClassAndSession, isLoading: studentByClassLoading } =
    useQuery(
      [
        queryKeys.GET_STUDENTS_BY_ATTENDANCE,
        user?.class_assigned,
        state?.creds?.session,
      ],
      () =>
        apiServices.getStudentByClassAndSession(
          user?.class_assigned,
          state?.creds?.session
        ),
      {
        enabled: initGetStudentData,
        select: apiServices.formatData,
        onSuccess(data) {
          setInitGetStudentData(false);
          setStudentData(data[0]);
          setInitGetExistingResult(true);
        },
      }
    );

  const {
    data: subjectsByClass,
    isLoading: subjectsByClassLoading,
    refetch: refetchStudentsByClass,
  } = useQuery(
    [queryKeys.GET_SUBJECTS_BY_CLASS, user?.class_assigned],
    () => apiServices.getSubjectByClass(user?.class_assigned),
    {
      select: apiServices.formatData,
      onSuccess(data) {
        if (initGetStudentsByClass) {
          const subjectsWithGrade = data?.map((x) => ({ ...x, grade: "0" }));
          setSubjects(subjectsWithGrade);
          setInitGetStudentsByClass(false);
        }
      },
    }
  );

  const { data: studentResult, isLoading: studentResultLoading } = useQuery(
    [
      queryKeys.GET_STUDENT_RESULTS,
      studentData?.id,
      state?.creds?.term,
      state?.creds?.session,
    ],
    () =>
      apiServices.getStudentResult(
        studentData?.id,
        state?.creds?.term,
        state?.creds?.session
      ),
    {
      enabled: initGetExistingResult,
      select: apiServices.formatData,
      onSuccess(data) {
        setInitGetExistingResult(false);
        if (data.length > 0) {
          const studentResult = data?.find(
            (x) =>
              x.student_id === studentData?.id &&
              x.term === state?.creds?.term &&
              state?.creds?.session === x.session &&
              state?.creds?.period === x.period
          );
          if (studentResult) {
            const subjectsWithGrade = studentResult?.results?.map((x) => ({
              ...x,
              grade: x.score,
            }));
            setSubjects(subjectsWithGrade);
          } else {
            setInitGetStudentsByClass(true);
            refetchStudentsByClass();
          }
        } else {
          setInitGetStudentsByClass(true);
          refetchStudentsByClass();
        }
      },
    }
  );

  const { mutateAsync: addResult, isLoading: addResultLoading } = useMutation(
    apiServices.addResult,
    {
      onSuccess() {
        toast.success("Result has been computed successfully");
      },
      onError(err) {
        apiServices.errorHandler(err);
      },
    }
  );

  const getTotalScores = () => {
    return subjects?.reduce((a, item) => {
      return a + Number(item.grade);
    }, 0);
  };

  const removeSubject = (subject) => {
    const fd = subjects.filter((x) => x.subject !== subject);

    setSubjects(fd);
  };

  const createMidTermResult = () => {
    const dataToSend = {
      student_id: studentData?.id,
      student_fullname: `${studentData?.firstname} ${studentData?.surname} ${studentData?.middlename}`,
      admission_number: studentData.admission_number,
      class_name: `${studentData?.present_class} ${studentData?.sub_class}`,
      period: state?.creds?.period,
      term: state?.creds?.term,
      session: state?.creds?.session,
      results: subjects.map((x) => ({
        subject: x.subject,
        score: x.grade,
      })),
    };

    addResult(dataToSend);
  };

  const isLoading =
    academicDateLoading ||
    maxScoresLoading ||
    studentByClassLoading ||
    studentResultLoading ||
    subjectsByClassLoading ||
    addResultLoading;

  return {
    isLoading,
    academicDate,
    permission,
    openPrompt,
    setOpenPrompt,
    selectedComment,
    setSelectedComment,
    teacherComment,
    setTeacherComment,
    hosComment,
    setHosComment,
    comment,
    setComment,
    maxScores,
    pdfExportComponent,
    handlePrint,
    user,
    studentData,
    setStudentData,
    setInitGetExistingResult,
    studentResult,
    subjects,
    subjectsByClass,
    setSubjects,
    getTotalScores,
    removeSubject,
    createMidTermResult,
    studentByClassAndSession,
    locationState: state,
  };
};
