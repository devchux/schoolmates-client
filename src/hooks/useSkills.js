import { useMutation, useQuery } from "react-query";
import { useAppContext } from "./useAppContext";
import { toast } from "react-toastify";
import queryKeys from "../utils/queryKeys";
import { useParams } from "react-router-dom";

export const useSkills = () => {
  const { apiServices, permission } = useAppContext("skills");
  const { id } = useParams();

  const { mutateAsync: addSkill, isLoading: addSkillLoading } = useMutation(
    apiServices.postSkill,
    {
      onSuccess() {
        toast.success("Skill has been added");
      },
      onError: apiServices.errorHandler,
    }
  );

  const {
    data: skills,
    isLoading: skillsLoading,
    refetch: refetchSkills,
  } = useQuery([queryKeys.GET_ALL_SKILLS], apiServices.getSkills, {
    enabled: permission.read || false,
    onError: apiServices.errorHandler,
    select: (data) => data?.data?.map((x) => ({ id: x.id, ...x.attributes })),
  });

  const { data: skill, isLoading: skillLoading } = useQuery(
    [queryKeys.GET_ALL_SKILLS, id],
    () => apiServices.getSkill(id),
    {
      enabled: permission?.read && !!id,
      select: apiServices.formatSingleData,
      onError: apiServices.errorHandler,
    }
  );

  const { mutateAsync: editSkill, isLoading: editSkillLoading } = useMutation(
    apiServices.editSkill,
    {
      onError: apiServices.errorHandler,
      onSuccess() {
        toast.success("Pre School Subject has been updated successfully");
      },
    }
  );

  const { mutateAsync: deleteSkill, isLoading: deleteSkillLoading } =
    useMutation(apiServices.deleteSkill, {
      onError: apiServices.errorHandler,
      onSuccess() {
        toast.success("Pre School Subject has been deleted successfully");
        refetchSkills();
      },
    });

  const isLoading =
    addSkillLoading || skillsLoading || skillLoading || editSkillLoading || deleteSkillLoading;

  return {
    addSkill,
    isLoading,
    skills,
    skill,
    editSkill,
    deleteSkill,
    permission,
    isEdit: !!id,
  };
};
