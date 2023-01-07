import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useCampus = () => {
  const { id } = useParams();
  const { apiServices, errorHandler } = useAppContext();

  const {
    isLoading: campusListLoading,
    data: campusList,
    refetch: refetchCampusList,
  } = useQuery([queryKeys.GET_ALL_CAMPUSES], apiServices.getAllCampuses, {
    retry: 3,
    onError(err) {
      errorHandler(err);
    },
    select: apiServices.formatData,
  });

  const { isLoading: getCampusLoading, data: campusData } = useQuery(
    [queryKeys.GET_CAMPUS, id],
    () => apiServices.getCampus(id),
    {
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      enabled: !!id,
    }
  );

  const { mutateAsync: addCampus, isLoading: addCampusLoading } = useMutation(
    apiServices.addCampus,
    {
      onSuccess() {
        toast.success("Campus has been added successfully");
      },
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const { mutateAsync: updateCampus, isLoading: updateCampusLoading } =
    useMutation(apiServices.updateCampus, {
      onSuccess() {
        toast.success("Campus has been updated successfully");
      },
      onError(err) {
        errorHandler(err);
      },
    });

  const { mutateAsync: disableCampus } = useMutation(
    apiServices.disableCampus,
    {
      onSuccess() {
        refetchCampusList();
        toast.success("Campus status updated successfully");
      },
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const singleCampus = id ? campusList?.find((x) => x.id === id) : undefined;

  const handleUpdateCampus = async (data) =>
    await updateCampus({ ...data, id });

  const isLoading =
    addCampusLoading ||
    campusListLoading ||
    updateCampusLoading ||
    getCampusLoading;

  return {
    isLoading,
    campusList,
    addCampus,
    updateCampus: handleUpdateCampus,
    campusData: campusData?.data?.attributes || singleCampus,
    disableCampus,
    isEdit: !!id,
  };
};
