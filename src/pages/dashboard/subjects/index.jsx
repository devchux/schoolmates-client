import React from "react";
import PageView from "../../../components/views/table-view";
import { useSubject } from "../../../hooks/useSubjects";

const Subjects = () => {
  const { subjects, permission, isLoading, deleteSubject } = useSubject();

  return (
    <PageView
      canCreate={permission?.create}
      rowHasUpdate={permission?.update}
      rowHasDelete={permission?.delete}
      onDelete={deleteSubject}
      isLoading={isLoading}
      columns={[
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "Subject",
          accessor: "subject",
        },
        {
          Header: "Class",
          accessor: "class_name",
        },
      ]}
      data={subjects}
    />
  );
};

export default Subjects;
