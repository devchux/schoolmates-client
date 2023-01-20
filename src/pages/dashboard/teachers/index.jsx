import React from "react";
import { Col, Row, Spinner } from "reactstrap";
import PageTitle from "../../../components/common/title";
import HomeCard from "../../../components/cards/home-card";
import TeacherProfileCard from "../../../components/cards/Teacher-profile-card";
import { useHome } from "../../../hooks/useHome";
import Numeral from "react-numeral";

const Teacher = () => {
  const {
    isLoading,
  } = useHome();

  return (
    <div>
      <PageTitle> Teacher {isLoading && <Spinner />}</PageTitle>
      <TeacherProfileCard />
      <button></button>
      
    </div>
  );
};

export default Teacher;
