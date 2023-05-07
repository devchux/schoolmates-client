import { useMutation, useQuery } from "react-query";
import { useAppContext } from "./useAppContext";
import { toast } from "react-toastify";
import queryKeys from "../utils/queryKeys";
import { useState } from "react";

export const usePreSchool = () => {
  const { apiServices, permission } = useAppContext("pre-school");
  const [period, setPeriod] = useState({ session: "", term: "", period: "" });

  const { data: preSchools, isLoading: preSchoolsLoading } = useQuery(
    [queryKeys.GET_ALL_PRE_SCHOOLS],
    apiServices.getPreSchools,
    {
      enabled: permission?.read || false,
      select: apiServices.formatData,
      onError: apiServices.errorHandler,
    }
  );

  const { data: preSchoolSubjects, isLoading: preSchoolSubjectsLoading } =
    useQuery(
      [
        queryKeys.GET_ALL_PRE_SCHOOL_SUBJECTS,
        period.period,
        period.session,
        period.term,
      ],
      () =>
        apiServices.getPreSchoolSubjects(
          period.period,
          period.term,
          period.session
        ),
      {
        enabled:
          permission?.subject && !!period.period && !!period.session && !!period.term,
        select: apiServices.formatData,
        onError: apiServices.errorHandler,
      }
    );

  const { mutateAsync: createPreSchool, isLoading: createPreSchoolLoading } =
    useMutation(apiServices.postPreSchool, {
      onError: apiServices.errorHandler,
      onSuccess() {
        toast.success("Pre School has been created successfully");
      },
    });

  const {
    mutateAsync: createPreSchoolSubject,
    isLoading: createPreSchoolSubjectLoading,
  } = useMutation(apiServices.postPreSchoolSubject, {
    onError: apiServices.errorHandler,
    onSuccess() {
      toast.success("Pre School Subject has been created successfully");
    },
  });

  const isLoading =
    createPreSchoolLoading ||
    preSchoolsLoading ||
    createPreSchoolSubjectLoading ||
    preSchoolSubjectsLoading;

  return {
    createPreSchool,
    isLoading,
    preSchools,
    createPreSchoolSubject,
    permission,
    preSchoolSubjects,
    setPeriod,
  };
};
