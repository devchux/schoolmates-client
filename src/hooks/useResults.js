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
  const [idWithComputedResult, setIdWithComputedResult] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [initGetStudentsByClass, setInitGetStudentsByClass] = useState(false);
  const [initGetStudentData, setInitGetStudentData] = useState(true);
  const [initGetExistingResult, setInitGetExistingResult] = useState(false);
  const [initGetExistingSecondHalfResult, setInitGetExistingSecondHalfResult] =
    useState(false);
  const [addMidResultAsLast, setAddMidResultAsLast] = useState(false);
  const [studentMidResult, setStudentMidResult] = useState([]);
  const [additionalCreds, setAdditionalCreds] = useState({});
  const [performanceRemark, setPerformanceRemark] = useState("");
  const { state } = useLocation();
  const studentClassName = `${studentData?.present_class} ${studentData?.sub_class}`;
  const pdfExportComponent = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => pdfExportComponent.current,
  });

  const is_preschool = !!user?.is_preschool && user.is_preschool !== "false";

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
      enabled: !is_preschool,
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
        state?.creds?.class_name
          ? state?.creds?.class_name
          : user?.class_assigned,
        state?.creds?.session,
      ],
      () =>
        apiServices.getStudentByClassAndSession(
          state?.creds?.class_name
            ? state?.creds?.class_name
            : user?.class_assigned,
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
      enabled: initGetExistingSecondHalfResult && !is_preschool,
      select: apiServices.formatData,
      onSuccess(data) {
        setInitGetExistingSecondHalfResult(false);
        setAdditionalCreds({});
        setTeacherComment("");
        setHosComment("");

        if (data?.length > 0) {
          const ids = data?.map((x) => x.student_id);
          setIdWithComputedResult(ids);
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
          } else {
            setInitGetExistingResult(true);
            setAddMidResultAsLast(true);
          }
        } else {
          setInitGetExistingResult(true);
          setAddMidResultAsLast(true);
        }
      },
    }
  );

  const {
    data: subjectsByClass,
    isLoading: subjectsByClassLoading,
    refetch: refetchStudentsByClass,
  } = useQuery(
    [
      queryKeys.GET_SUBJECTS_BY_CLASS,
      state?.creds?.class_name
        ? state?.creds?.class_name
        : user?.class_assigned,
    ],
    () =>
      apiServices.getSubjectByClass(
        state?.creds?.class_name
          ? state?.creds?.class_name
          : user?.class_assigned
      ),
    {
      enabled: initGetStudentsByClass && !is_preschool,
      select: apiServices.formatData,
      onSuccess(data) {
        const subjectsWithGrade = data?.map((x) => ({ ...x, grade: "0" }));
        if (subjects.length === 0) setSubjects(subjectsWithGrade);
        setInitGetStudentsByClass(false);
      },
    }
  );

  const {
    data: preSchoolSubjectsByClass,
    isLoading: preSchoolSubjectsByClassLoading,
  } = useQuery(
    [
      queryKeys.GET_PRE_SCHOOL_SUBJECTS_BY_CLASS,
      state?.creds?.class_name
        ? state?.creds?.class_name
        : user?.class_assigned,
    ],
    () =>
      apiServices.getPreSchoolSubjectsByClass(
        state?.creds?.period,
        state?.creds?.term,
        state?.creds?.session,
        state?.creds?.class_name
          ? state?.creds?.class_name
          : user?.class_assigned
      ),
    {
      enabled: is_preschool,
      select: apiServices.formatData,
    }
  );

  const {
    isLoading: preSchoolCompiledResultsLoading,
    data: preSchoolCompiledResults,
  } = useQuery(
    [
      queryKeys.GET_PRE_SCHOOL_COMPILED_RESULTS,
      state?.creds?.period,
      state?.creds?.term,
      state?.creds?.session,
    ],
    () =>
      apiServices.getPreSchoolCompiledResults(
        state?.creds?.period,
        state?.creds?.term,
        state?.creds?.session
      ),
    {
      enabled: is_preschool,
      select: apiServices.formatData,
      onSuccess(data) {
        const ids = data?.map((x) => x.student_id) ?? [];
        setIdWithComputedResult(ids);
      },
    }
  );

  const { isLoading: getCummulativeScoresLoading, data: cummulativeScores } =
    useQuery(
      [
        queryKeys.GET_RESULT_CUMMULATIVE_SCORES,
        studentData?.id,
        state?.creds?.period,
        state?.creds?.term,
        state?.creds?.session,
      ],
      () =>
        apiServices.getCummulativeScores({
          student_id: studentData?.id,
          period: state?.creds?.period,
          term: state?.creds?.term,
          session: state?.creds?.session,
        }),
      {
        enabled: !is_preschool && state?.creds?.period === "Second Half",
        select: (data) => data?.data,
      }
    );

  const { isLoading: loadingClassAverage, data: classAverage } = useQuery(
    [
      queryKeys.GET_YEARLY_CLASS_AVERAGE,
      studentClassName,
      studentData?.id,
      state?.creds?.term,
      state?.creds?.session,
    ],
    () =>
      apiServices.getClassAverage({
        class_name: studentClassName,
        student_id: studentData?.id,
        term: state?.creds?.term,
        session: state?.creds?.session,
      }),
    {
      enabled: !is_preschool && state?.creds?.period === "Second Half",
      // select: (data) => data?.data,
    }
  );

  const { isLoading: loadingYearlyClassAverage, data: yearlyClassAverage } =
    useQuery(
      [queryKeys.GET_CLASS_AVERAGE, studentClassName, state?.creds?.session],
      () =>
        apiServices.getYearlyClassAverage({
          class_name: studentClassName,
          session: state?.creds?.session,
        }),
      {
        enabled:
          !is_preschool &&
          Boolean(studentClassName) &&
          state?.creds?.term === "Third Term" &&
          state?.creds?.period === "Second Half",
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
      enabled: initGetExistingResult && !is_preschool,
      select: apiServices.formatData,
      onSuccess(data) {
        setInitGetExistingResult(false);
        if (data.length > 0) {
          const ids = data?.map((x) => x.student_id);
          setIdWithComputedResult(ids);
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
                grade: state?.creds?.period === "Second Half" ? "0" : x.score,
              }));
              if (state?.creds?.period === "First Half") {
                setAdditionalCreds({
                  ...additionalCreds,
                  ...studentResult,
                });
              }
              setSubjects(subjectsWithGrade);
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
        setAddMidResultAsLast(false);
      },
    }
  );

  const { data: grading, isLoading: gradingLoading } = useQuery(
    [queryKeys.GET_GRADING],
    apiServices.getGrading,
    {
      enabled: !is_preschool,
      select: apiServices.formatData,
      onError(err) {
        apiServices.errorHandler(err);
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

  const {
    mutateAsync: addPreSchoolResult,
    isLoading: addPreSchoolResultLoading,
  } = useMutation(apiServices.postPreSchoolResult, {
    onSuccess() {
      toast.success("Result has been computed successfully");
    },
    onError(err) {
      apiServices.errorHandler(err);
    },
  });

  const getScoreRemark = (score) => {
    const res = grading?.find(
      (x) =>
        score >= Number(x?.score_from ?? 0) && score <= Number(x?.score_to ?? 0)
    );

    return res;
  };

  const getTotalScores = () => {
    return additionalCreds?.results?.reduce((a, item) => {
      return a + Number(item.score);
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
      class_name: studentClassName,
      period: state?.creds?.period,
      term: state?.creds?.term,
      session: state?.creds?.session,
      results: subjects.map((x) => ({
        subject: x.subject,
        score: x.grade,
      })),
      teacher_comment: teacherComment,
      teacher_id: user?.id ?? "",
    };

    addResult(dataToSend);
  };

  const createEndOfTermResult = () => {
    const dataToSend = {
      student_id: studentData?.id,
      student_fullname: `${studentData?.firstname} ${studentData?.surname} ${studentData?.middlename}`,
      admission_number: studentData.admission_number,
      class_name: studentClassName,
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
      performance_remark: performanceRemark,
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
    endOfTermResultsLoading ||
    gradingLoading ||
    preSchoolSubjectsByClassLoading ||
    addPreSchoolResultLoading ||
    getCummulativeScoresLoading ||
    preSchoolCompiledResultsLoading ||
    loadingClassAverage ||
    loadingYearlyClassAverage;

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
    getScoreRemark,
    idWithComputedResult,
    setInitGetExistingSecondHalfResult,
    preSchoolSubjectsByClass,
    addPreSchoolResult,
    cummulativeScores,
    preSchoolCompiledResults,
    grading,
    performanceRemark,
    setPerformanceRemark,
    classAverage,
    yearlyClassAverage,
  };
};
