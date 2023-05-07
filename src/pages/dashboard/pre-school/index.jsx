import React from "react";
import PageView from "../../../components/views/table-view";
import { usePreSchool } from "../../../hooks/usePreSchool";
import { useNavigate } from "react-router-dom";

const PreSchool = () => {
  const navigate = useNavigate();
  const { permission, preSchools, isLoading } = usePreSchool();

  const getSortButtonOptions = () => {
    let arr = [];

    if (permission?.subject) {
      arr.push({
        title: "Go to subjects",
        type: "button",
        variant: "outline",
        onClick: () => navigate("/app/pre-school/subjects"),
      });
    }

    return arr.length ? arr : undefined;
  };

  return (
    <PageView
      data={preSchools}
      canCreate={permission?.create}
      hasSortOptions={permission?.sort}
      isLoading={isLoading}
      columns={[
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Campus",
          accessor: "campus",
        },
      ]}
      groupedButtonOptions={getSortButtonOptions()}
    />
  );
};

export default PreSchool;
