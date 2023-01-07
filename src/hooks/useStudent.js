import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useStudent = () => {
  const { id } = useParams();
  const { apiServices, errorHandler } = useAppContext();

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

  const handleDeleteStudent = async (data) =>
    await deleteStudent(data);

  const isLoading =
    studentListLoading ||
    addStudentLoading ||
    updateStudentLoading ||
    getCampusLoading;

  return {
    isLoading,
    students,
    isEdit: !!id,
    onUpdateStudent: handleUpdateStudent,
    addStudent,
    studentData: singleStudent?.data?.attributes || singleCampus,
    onDeleteStudent: handleDeleteStudent,
  };
};
