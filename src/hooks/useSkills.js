import { useMutation, useQuery } from "react-query";
import { useAppContext } from "./useAppContext";
import { toast } from "react-toastify";
import queryKeys from "../utils/queryKeys";

export const useSkills = () => {
  const { apiServices, permission } = useAppContext("skills");

  const { mutateAsync: addSkill, isLoading: addSkillLoading } = useMutation(
    apiServices.postSkill,
    {
      onSuccess() {
        toast.success("Skill has been added");
      },
      onError: apiServices.errorHandler,
    }
  );

  const { data: skills, isLoading: skillsLoading } = useQuery(
    [queryKeys],
    apiServices.getSkills,
    {
      enabled: permission.read || false,
      onError: apiServices.errorHandler,
      select: (data) => data?.data?.map((x) => ({ id: x.id, ...x.attributes })),
    }
  );

  const isLoading = addSkillLoading || skillsLoading;

  return {
    addSkill,
    isLoading,
    skills,
    permission,
  };
};
