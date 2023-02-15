import {
  faCalendar,
  faPeopleLine,
  faPersonDress,
  faTimeline,
  faBuildingColumns,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Spinner } from "reactstrap";
import HomeCard from "../../../components/cards/home-card";
import ProfileCard from "../../../components/cards/profile-card";
import PageTitle from "../../../components/common/title";
import { useHome } from "../../../hooks/useHome";

const StudentsHome = () => {
  const { isLoading } = useHome();

  return (
    <div className="studentsHome">
      <PageTitle> Student {isLoading && <Spinner />}</PageTitle>
      <ProfileCard type="student-home" />
      <div className="students-cards-wrapper">
        <HomeCard isBadge title="Result" icon={faBuildingColumns} />
        <HomeCard isBadge title="My Students" icon={faPeopleLine} />
        <HomeCard isBadge title="Calender" icon={faCalendar} />
        <HomeCard isBadge title="Timetable" icon={faTimeline} />
        <HomeCard isBadge title="Dress Code" icon={faPersonDress} />
      </div>
    </div>
  );
};

export default StudentsHome;
