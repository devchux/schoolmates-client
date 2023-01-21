import React from "react";
import { Spinner } from "reactstrap";
import PageTitle from "../../../components/common/title";
import TeacherProfileCard from "../../../components/cards/teacher-profile-card";
import { useHome } from "../../../hooks/useHome";

const Teacher = () => {
  const { isLoading } = useHome();

  return (
    <div>
      <PageTitle> Teacher {isLoading && <Spinner />}</PageTitle>
      <TeacherProfileCard />
      <button></button>
    </div>
  );
};

export default Teacher;
