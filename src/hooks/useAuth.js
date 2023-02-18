import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { homeUrl } from "../utils/constants";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useAuth = (navigateOnLogin = true) => {
  const navigate = useNavigate();
  const { updateUser, user, apiServices } = useAppContext();
  const [initiateDesignationQuery, setInitiateDesignationQuery] =
    useState(false);

  const { isLoading: designationLoading } = useQuery(
    [queryKeys.GET_DESIGNATION],
    apiServices.getDesignation,
    {
      enabled: initiateDesignationQuery,
      onSuccess(data) {
        setInitiateDesignationQuery(false);
        const { designation_name } =
          data?.data?.find((item) => item.id === user.designation_id)
            ?.attributes || {};
        const userObj =
          designation_name === "Student"
            ? { ...user, class_assigned: user?.present_class, designation_name }
            : { ...user, designation_name };
        updateUser(userObj);
        navigateOnLogin && navigate(homeUrl[designation_name]);
      },
      onError(err) {
        apiServices.errorHandler(err);
      },
    }
  );

  const { mutateAsync: login, isLoading: loginLoading } = useMutation(
    apiServices.login,
    {
      onSuccess(data) {
        updateUser(data?.data?.user);
        setInitiateDesignationQuery(true);
      },
      onError(err) {
        apiServices.errorHandler(err);
      },
    }
  );

  const { mutateAsync: register, isLoading: registerLoading } = useMutation(
    apiServices.register,
    {
      onSuccess(data) {
        updateUser(data?.data?.user);
        setInitiateDesignationQuery(true);
      },
      onError(err) {
        apiServices.errorHandler(err);
      },
    }
  );

  return {
    login,
    register,
    isLoading: loginLoading || designationLoading || registerLoading,
  };
};
