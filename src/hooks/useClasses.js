import { useQuery } from "react-query";
import APIServies from "../services/api-services";
import queryKeys from "../utils/queryKeys";

const apiServices = new APIServies();

export const useClasses = () => {
  const { isLoading, data: classes } = useQuery(
    [queryKeys.GET_DESIGNATION],
    apiServices.getAllClasses,
    {
      retry: 3,
      onError(err) {
        apiServices.errorhandler(err);
      },
      select: apiServices.formatData,
    }
  );

  return {
    isLoading,
    classes,
  };
};
