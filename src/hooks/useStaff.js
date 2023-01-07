import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { roleMap } from "../utils/constants";
import queryKeys from "../utils/queryKeys";
import { useAppContext } from "./useAppContext";

export const useStaff = () => {
  const [staffs, setStaffs] = useState([]);
  const { id } = useParams();
  const { apiServices, errorHandler } = useAppContext();

  const { isLoading: designationLoading, data: designations } = useQuery(
    ['GET_DESIGNATIONS_STAFF'],
    apiServices.getDesignation,
    {
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const { isLoading: staffListLoading } = useQuery(
    [queryKeys.GET_ALL_STAFFS],
    apiServices.getAllStaffs,
    {
      retry: 3,
      onSuccess(data) {
        const formatStaffs = data.map((staff) => {
          const { designation_name } =
            designations?.data?.find((item) => item.id === staff.designation_id)
              ?.attributes || {};

          return { ...staff, designation_name: roleMap[designation_name] };
        });
        setStaffs(formatStaffs);
      },
      onError(err) {
        errorHandler(err);
      },
      select: apiServices.formatData,
    }
  );

  const { mutateAsync: addStaff, isLoading: addStaffLoading } = useMutation(
    apiServices.addStaff,
    {
      onSuccess() {
        toast.success("Staff has been added successfully");
      },
      onError(err) {
        errorHandler(err);
      },
    }
  );

  const { mutateAsync: updateStaff, isLoading: updateStaffLoading } =
    useMutation(apiServices.updateStaff, {
      onSuccess() {
        toast.success("Staff has been updated successfully");
      },
      onError(err) {
        errorHandler(err);
      },
    });

  const { mutateAsync: deleteStaff } = useMutation(apiServices.deleteStaff, {
    onSuccess() {
      toast.success("Staff has been deleted successfully");
    },
    onError(err) {
      errorHandler(err);
    },
  });

  const { isLoading: getCampusLoading, data: singleStaff } = useQuery(
    [queryKeys.GET_CAMPUS, id],
    () => apiServices.getStaff(id),
    {
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      enabled: !!id,
    }
  );

  const singleCampus = id ? staffs?.find((x) => x.id === id) : undefined;

  const handleUpdateStaff = async (data) => await updateStaff({ ...data, id });

  const handleDeleteStaff = async (data) => await deleteStaff(data);

  const isLoading =
    staffListLoading ||
    addStaffLoading ||
    updateStaffLoading ||
    getCampusLoading ||
    designationLoading;

  return {
    isLoading,
    staffs,
    designations,
    isEdit: !!id,
    onUpdateStaff: handleUpdateStaff,
    addStaff,
    staffData: singleStaff?.data?.attributes || singleCampus,
    onDeleteStaff: handleDeleteStaff,
  };
};
