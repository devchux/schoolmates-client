import { useMutation, useQuery } from "react-query";
import { useAppContext } from "./useAppContext";
import { toast } from "react-toastify";
import queryKeys from "../utils/queryKeys";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const usePreSchool = () => {
  const { apiServices, permission } = useAppContext("pre-school");
  const [period, setPeriod] = useState({ session: "", term: "", period: "" });
  const { id } = useParams();

  const { data: preSchools, isLoading: preSchoolsLoading } = useQuery(
    [queryKeys.GET_ALL_PRE_SCHOOLS],
    apiServices.getPreSchools,
    {
      enabled: permission?.read || false,
      select: apiServices.formatData,
      onError: apiServices.errorHandler,
    }
  );

  const { data: preSchool, isLoading: preSchoolLoading } = useQuery(
    [queryKeys.GET_ALL_PRE_SCHOOLS, id],
    () => apiServices.getPreSchool(id),
    {
      enabled: permission?.read && !!id,
      select: apiServices.formatSingleData,
      onError: apiServices.errorHandler,
    }
  );

  const {
    data: preSchoolSubjects,
    isLoading: preSchoolSubjectsLoading,
    refetch: refetchSubjects,
  } = useQuery(
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
        permission?.subject &&
        !!period.period &&
        !!period.session &&
        !!period.term,
      select: apiServices.formatData,
      onError: apiServices.errorHandler,
    }
  );

  const { data: preSchoolSubject, isLoading: preSchoolSubjectLoading } =
    useQuery(
      [queryKeys.GET_ALL_PRE_SCHOOL_SUBJECTS, id],
      () => apiServices.getPreSchoolSubject(id),
      {
        enabled: permission?.subject && !!id,
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

  const {
    mutateAsync: deletePreSchoolSubject,
    isLoading: deletePreSchoolSubjectLoading,
  } = useMutation(apiServices.deletePreSchoolSubjects, {
    onError: apiServices.errorHandler,
    onSuccess() {
      toast.success("Pre School Subject has been deleted successfully");
      refetchSubjects();
    },
  });

  const { mutateAsync: deletePreSchool, isLoading: deletePreSchoolLoading } =
    useMutation(apiServices.deletePreSchool, {
      onError: apiServices.errorHandler,
      onSuccess() {
        toast.success("Pre School has been deleted successfully");
        refetchSubjects();
      },
    });

  const {
    mutateAsync: editPreSchoolSubject,
    isLoading: editPreSchoolSubjectLoading,
  } = useMutation(apiServices.editPreSchoolSubject, {
    onError: apiServices.errorHandler,
    onSuccess() {
      toast.success("Pre School Subject has been updated successfully");
    },
  });

  const { mutateAsync: editPreSchool, isLoading: editPreSchoolLoading } =
    useMutation(apiServices.editPreSchool, {
      onError: apiServices.errorHandler,
      onSuccess() {
        toast.success("Pre School has been updated successfully");
      },
    });

  const isLoading =
    createPreSchoolLoading ||
    preSchoolsLoading ||
    createPreSchoolSubjectLoading ||
    preSchoolSubjectsLoading ||
    deletePreSchoolSubjectLoading ||
    preSchoolSubjectLoading ||
    editPreSchoolSubjectLoading ||
    preSchoolLoading ||
    editPreSchoolLoading ||
    deletePreSchoolLoading;

  return {
    createPreSchool,
    isLoading,
    preSchools,
    createPreSchoolSubject,
    permission,
    preSchoolSubjects,
    setPeriod,
    deletePreSchoolSubject,
    preSchoolSubject,
    editPreSchoolSubject,
    preSchool,
    editPreSchool,
    deletePreSchool,
    isEdit: !!id,
  };
};
