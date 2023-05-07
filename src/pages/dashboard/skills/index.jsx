import React from "react";
import PageView from "../../../components/views/table-view";
import { useSkills } from "../../../hooks/useSkills";

const Skills = () => {
  const { isLoading, skills, permission } = useSkills();
  console.log("skills", skills);

  return (
    <PageView
      data={skills}
      canCreate={permission?.create}
      isLoading={isLoading}
      rowHasUpdate={permission?.update}
      rowHasDelete={permission?.delete}
      columns={[
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "Name",
          accessor: "skill_type",
        },
      ]}
    />
  );
};

export default Skills;
