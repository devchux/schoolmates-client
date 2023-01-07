import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useClasses = () => {
  const { id } = useParams();
  const { apiServices, errorHandler } = useAppContext();

  const { isLoading: classListLoading, data: classes } = useQuery(
    [queryKeys.GET_ALL_CLASSES],
    apiServices.getAllClasses,
    {
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      select: apiServices.formatData,
    }
  );

  const classList = classes?.map((x) => ({
    ...x,
    sub_class: x.sub_class.split(",").join(", "),
  }));

  const { mutateAsync: addClass, isLoading: addClassLoading } = useMutation(
    apiServices.addClass,
    {
      onSuccess() {
        toast.success("Class has been added successfully");
      },
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const { mutateAsync: updateClass, isLoading: updateClassLoading } =
    useMutation(apiServices.updateClass, {
      onSuccess() {
        toast.success("Class has been updated successfully");
      },
      onError(err) {
        errorHandler(err);
      },
    });

  const { mutateAsync: deleteClass } = useMutation(apiServices.deleteClass, {
    onSuccess() {
      toast.success("Class has been deleted successfully");
    },
    onError(err) {
      errorHandler(err);
    },
  });

  const singleClass = id ? classes?.find((x) => x.id === id) : undefined;

  const handleUpdateClass = async (data) => await updateClass(data);

  const handleDeleteClass = async (data) => await deleteClass(data);

  const isLoading = classListLoading || addClassLoading || updateClassLoading;

  return {
    isLoading,
    classes: classList,
    isEdit: !!id,
    onUpdateClass: handleUpdateClass,
    addClass: addClass,
    classData: singleClass,
    onDeleteClass: handleDeleteClass,
  };
};
