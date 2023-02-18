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
  const [studentData, setStudentData] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [initGetStudentsByClass, setInitGetStudentsByClass] = useState(false);
  const [initGetStudentData, setInitGetStudentData] = useState(true);
  const [initGetExistingResult, setInitGetExistingResult] = useState(false);
  const [initGetExistingSecondHalfResult, setInitGetExistingSecondHalfResult] =
    useState(false);
  const [addMidResultAsLast, setAddMidResultAsLast] = useState(false);
  const [studentMidResult, setStudentMidResult] = useState([]);
  const [additionalCreds, setAdditionalCreds] = useState({});
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

  const { data: comments, isLoading: commentsLoading } = useQuery(
    [queryKeys.GET_PRINCIPAL_COMMENTS],
    apiServices.getPrincipalComments,
    {
      onError(err) {
        errorHandler(err);
      },
      select: apiServices.formatData,
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
          const studentInfo =
            user?.designation_name === "Student"
              ? data?.find((x) => x.id === user?.id)
              : data[0];
          setStudentData(studentInfo);
          state?.creds?.period === "First Half"
            ? setInitGetExistingResult(true)
            : setInitGetExistingSecondHalfResult(true);
        },
      }
    );

  const { isLoading: endOfTermResultsLoading } = useQuery(
    [
      queryKeys.GET_STUDENT_END_OF_TERM_RESULTS,
      studentData?.id,
      state?.creds?.term,
      state?.creds?.session,
    ],
    () =>
      apiServices.getEndOfTermResults(
        studentData?.id,
        state?.creds?.term,
        state?.creds?.session
      ),
    {
      enabled: initGetExistingSecondHalfResult,
      select: apiServices.formatData,
      onSuccess(data) {
        console.log("data", data);
        setInitGetExistingSecondHalfResult(false);
        setAdditionalCreds({});
        setTeacherComment("");
        setHosComment("");

        if (data?.length > 0) {
          const studentResult = data?.find(
            (x) =>
              x.student_id === studentData?.id &&
              x.term === state?.creds?.term &&
              state?.creds?.session === x.session &&
              state?.creds?.period === x.period
          );
          setAdditionalCreds({
            ...additionalCreds,
            ...studentResult,
            school_opened: studentResult?.school_opened ?? "0",
            times_present: studentResult?.times_present ?? "0",
            times_absent: studentResult?.times_absent ?? "0",
          });
          setTeacherComment(studentResult?.teacher_comment);
          setHosComment(studentResult?.hos_comment);
          if (studentResult) {
            const subjectsWithGrade = studentResult?.results?.map((x) => ({
              ...x,
              grade: x.score,
            }));
            setSubjects(subjectsWithGrade);
            setInitGetExistingResult(true);
            setAddMidResultAsLast(true);
          } else {
            setInitGetExistingResult(true);
          }
        } else {
          setInitGetExistingResult(true);
        }
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
      enabled: initGetStudentsByClass,
      select: apiServices.formatData,
      onSuccess(data) {
        const subjectsWithGrade = data?.map((x) => ({ ...x, grade: "0" }));
        setSubjects(subjectsWithGrade);
        setInitGetStudentsByClass(false);
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
              x.period === "First Half"
          );
          setStudentMidResult(studentResult?.results ?? []);
          if (studentResult) {
            if (
              state?.creds?.period === "First Half" ||
              (addMidResultAsLast && state?.creds?.period === "Second Half")
            ) {
              const subjectsWithGrade = studentResult?.results?.map((x) => ({
                ...x,
                grade: x.score,
              }));
              setSubjects(subjectsWithGrade);
              setAddMidResultAsLast(false);
            }
          } else {
            setInitGetStudentsByClass(true);
            refetchStudentsByClass();
          }
        } else {
          setStudentMidResult([]);
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

  const getTotalMidScores = () => {
    return studentMidResult?.reduce((a, item) => {
      return a + Number(item.score);
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

  const createEndOfTermResult = () => {
    const dataToSend = {
      student_id: studentData?.id,
      student_fullname: `${studentData?.firstname} ${studentData?.surname} ${studentData?.middlename}`,
      admission_number: studentData.admission_number,
      class_name: `${studentData?.present_class} ${studentData?.sub_class}`,
      period: state?.creds?.period,
      term: state?.creds?.term,
      session: state?.creds?.session,
      school_opened: additionalCreds?.school_opened,
      times_present: additionalCreds?.times_present,
      times_absent: additionalCreds?.times_absent,
      results: subjects.map((x) => ({
        subject: x.subject,
        score: x.grade,
      })),
      affective_disposition: additionalCreds?.affective_disposition,
      psychomotor_skills: additionalCreds?.psychomotor_skills,
      teacher_comment: teacherComment,
      teacher_id: user?.id,
      hos_comment: hosComment,
      hos_id: comments[0]?.hos_id,
    };

    addResult(dataToSend);
  };

  const isLoading =
    academicDateLoading ||
    maxScoresLoading ||
    studentByClassLoading ||
    studentResultLoading ||
    subjectsByClassLoading ||
    addResultLoading ||
    commentsLoading ||
    endOfTermResultsLoading;

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
    additionalCreds,
    setAdditionalCreds,
    studentByClassAndSession,
    locationState: state,
    studentMidResult,
    getTotalMidScores,
    comments,
    createEndOfTermResult,
    setInitGetExistingSecondHalfResult,
  };
};
