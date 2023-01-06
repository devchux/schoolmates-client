import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import APIServies from "../services/api-services";
import queryKeys from "../utils/queryKeys";

const apiServices = new APIServies();

export const useClasses = () => {
  const { id } = useParams();

  const { isLoading, data: classes } = useQuery(
    [queryKeys.GET_ALL_CLASSES],
    apiServices.getAllClasses,
    {
      retry: 3,
      onError(err) {
        apiServices.errorhandler(err);
      },
      select: apiServices.formatData,
    }
  );

  const singleClass = id ? classes?.find((x) => x.id === id) : undefined;

  const handleUpdateClass = async (data) => console.log(data);

  return {
    isLoading,
    classes,
    isEdit: !!id,
    onUpdateClass: handleUpdateClass,
    addClass: (data) => console.log(data),
    classData: singleClass
  };
};
