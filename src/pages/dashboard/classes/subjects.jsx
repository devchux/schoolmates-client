import React from 'react'
import PageView from '../../../components/views/table-view';
import { useClasses } from '../../../hooks/useClasses';

const ClassSubjects = () => {
    const { subjects, isLoading } = useClasses();
  
    return (
      <PageView
        canCreate={false}
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
}

export default ClassSubjects