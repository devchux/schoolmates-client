import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import APIServies from "../services/api-services";
import queryKeys from "../utils/queryKeys";

const apiServices = new APIServies();

export const useCampus = () => {
  const { id } = useParams();

  const {
    isLoading: campusListLoading,
    data: campusList,
    refetch: refetchCampusList,
  } = useQuery([queryKeys.GET_ALL_CAMPUSES], apiServices.getAllCampuses, {
    retry: 3,
    onError(err) {
      apiServices.errorhandler(err);
    },
    select: apiServices.formatData,
  });

  const { isLoading: getCampusLoading, data: campusData } = useQuery(
    [queryKeys.GET_CAMPUS, id],
    () => apiServices.getCampus(id),
    {
      retry: 3,
      onError(err) {
        apiServices.errorhandler(err);
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
        apiServices.errorhandler(err);
      },
    }
  );

  const { mutateAsync: updateCampus, isLoading: updateCampusLoading } =
    useMutation(apiServices.updateCampus, {
      onSuccess() {
        toast.success("Campus has been updated successfully");
      },
      onError(err) {
        apiServices.errorhandler(err);
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
        apiServices.errorhandler(err);
      },
    }
  );

  const singleCampus = id ? campusList?.find((x) => x.id === id) : undefined;

  const handleUpdateCampus = async (data) => await updateCampus({ id, body: { ...data } })

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
    campusData: campusData || singleCampus,
    disableCampus,
    isEdit: !!id,
  };
};
