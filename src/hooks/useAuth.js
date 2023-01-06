import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import APIServies from "../services/api-services";
import queryKeys from "../utils/queryKeys";

const apiServices = new APIServies();

export const useAuth = () => {
  const navigate = useNavigate();
  const { updateUser, user } = useContext(UserContext);
  const [initiateDesignationQuery, setInitiateDesignationQuery] =
    useState(false);

  const { isLoading: designationLoading } = useQuery(
    [queryKeys.GET_DESIGNATION],
    apiServices.getDesignation,
    {
      enabled: initiateDesignationQuery,
      onSuccess(data) {
        console.log(data);
        setInitiateDesignationQuery(false);
        const { designation_name } =
          data?.data?.find((item) => item.id === user.designation_id)
            ?.attributes || {};
        updateUser({ ...user, designation_name });
        navigate("/app/classes");
      },
      onError(err) {
        apiServices.errorhandler(err);
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
        apiServices.errorhandler(err);
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
        apiServices.errorhandler(err);
      },
    }
  );

  return {
    login,
    register,
    isLoading: loginLoading || designationLoading || registerLoading,
  };
};
