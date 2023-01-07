import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useAuth = () => {
  const navigate = useNavigate();
  const { updateUser, user, apiServices, errorHandler } = useAppContext();
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
        updateUser({ ...user, designation_name });
        navigate("/app/classes");
      },
      onError(err) {
        errorHandler(err);
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
        errorHandler(err);
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
        errorHandler(err);
      },
    }
  );

  return {
    login,
    register,
    isLoading: loginLoading || designationLoading || registerLoading,
  };
};
