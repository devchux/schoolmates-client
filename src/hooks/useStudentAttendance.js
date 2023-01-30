import { useState } from "react";
import { useQuery } from "react-query";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useStudentAttendance = () => {
  const { apiServices, errorHandler, permission } = useAppContext("attendance");
  const [date, setDate] = useState(
    apiServices.formatDate(new Date(), "YY-MM-DD")
  );
  const [retrieveAttendance, setRetrieveAttendance] = useState(true);

  const { data: studentAttendance, isLoading: studentAttendanceLoading } =
    useQuery(
      [queryKeys.GET_STUDENTS_BY_ATTENDANCE, date],
      () =>
        apiServices.getStudentAttendance(date.split("-").reverse().join("/")),
      {
        enabled: !!date && retrieveAttendance && permission?.retrieve,
        onSuccess() {
          setRetrieveAttendance(false);
        },
        onError(err) {
          errorHandler(err);
        },
        select: apiServices.formatData,
      }
    );

  const isLoading = studentAttendanceLoading;

  return {
    isLoading,
    studentAttendance,
    date,
    setDate,
    setRetrieveAttendance,
    permission,
    todayDate: apiServices.formatDate(new Date(), "YY-MM-DD"),
  };
};
