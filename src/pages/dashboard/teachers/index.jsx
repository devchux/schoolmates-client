import React from "react";
import { Spinner } from "reactstrap";
import Button from "../../../components/buttons/button";
import TeacherProfileCard from "../../../components/cards/teacher-profile-card";
import PageTitle from "../../../components/common/title";
import { useHome } from "../../../hooks/useHome";

const Teacher = () => {
  const { isLoading } = useHome();

  return (
    <div>
      <PageTitle> Teacher {isLoading && <Spinner />}</PageTitle>
      <TeacherProfileCard />
      <Button>Timetable</Button>
      <Button>Calendar</Button>
      <Button>Dress Code</Button>
    </div>
  );
};

export default Teacher;
