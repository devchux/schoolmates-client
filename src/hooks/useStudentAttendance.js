import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useStudentAttendance = () => {
  const { apiServices, errorHandler, permission, user } =
    useAppContext("attendance");
  const [date, setDate] = useState(
    apiServices.formatDate(new Date(), "YY-MM-DD")
  );
  const [retrieveAttendance, setRetrieveAttendance] = useState(true);
  const [checkedRows, setCheckedRows] = useState([]);

  const todayDate = apiServices.formatDate(new Date(), "YY-MM-DD");

  const { data: studentAttendance, isLoading: studentAttendanceLoading } =
    useQuery(
      [queryKeys.GET_STUDENTS_BY_ATTENDANCE, date],
      () =>
        apiServices.getStudentAttendance(date.split("-").reverse().join("/")),
      {
        enabled: retrieveAttendance && permission?.retrieve,
        onSuccess(data) {
          const ids = [];
          data.forEach((x) => {
            if (x?.status === "Present") {
              ids.push(x?.student_id);
            }
          });

          setCheckedRows(ids);
          setRetrieveAttendance(false);
        },
        onError(err) {
          errorHandler(err);
        },
        select: (data) => {
          return apiServices.formatData(data)[0]?.data.map((x) => ({
            ...x,
            id: x.student_id,
            class: apiServices.formatData(data)[0]?.class,
          }));
        },
      }
    );

  const { isLoading: studentListLoading, data: students } = useQuery(
    [queryKeys.GET_STUDENTS_BY_ATTENDANCE, user?.class_assigned, user?.session],
    () =>
      apiServices.getStudentByClassAndSession(
        user?.class_assigned,
        user?.session
      ),
    {
      enabled: !studentAttendance || studentAttendance?.length === 0,
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      select: (data) => {
        return apiServices.formatData(data)?.map((student) => ({
          ...student,
          student_fullname: `${student.firstname} ${student.surname} ${student.middlename}`,
          class: `${student.class} ${student.sub_class}`,
        }));
      },
    }
  );

  const {
    isLoading: addStudentAttendanceLoading,
    mutateAsync: addStudentAttendanceAsync,
  } = useMutation(apiServices.addStudentAttendance, {
    onSuccess() {
      toast.success("Attendance has been submitted successfully");
    },
    onError(err) {
      errorHandler(err);
    },
  });

  const addStudentAttendance = () => {
    const studentsToSubmit =
      !studentAttendance || studentAttendance.length === 0
        ? students
        : studentAttendance;
    const attendanceData = studentsToSubmit.map((x) => ({
      student_id: x.id,
      student_fullname: x.student_fullname,
      admission_number: x.admission_number,
      status: checkedRows.includes(x.id) ? "Present" : "Absent",
    }));
    const data = {
      attendance_date: date.split("-").reverse().join("/"),
      data: attendanceData,
    };

    addStudentAttendanceAsync(data);
  };

  const isLoading = studentAttendanceLoading || studentListLoading;

  return {
    isLoading,
    studentAttendance,
    date,
    setDate,
    setRetrieveAttendance,
    permission,
    todayDate,
    students,
    checkedRows,
    setCheckedRows,
    addStudentAttendance,
    addStudentAttendanceLoading,
  };
};
