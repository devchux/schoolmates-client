import {
  faCalendar,
  faPeopleLine,
  faPersonDress,
  faTimeline,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import HomeCard from "../../../components/cards/home-card";
import ProfileCard from "../../../components/cards/profile-card";
import PageTitle from "../../../components/common/title";
import { useHome } from "../../../hooks/useHome";

const Teacher = () => {
  const { isLoading, timetableData, calendarData } = useHome();
  const navigate = useNavigate();

  return (
    <div className="teachers">
      <PageTitle> Teacher {isLoading && <Spinner />}</PageTitle>
      <ProfileCard type="teacher" />
      <div className="teachers-cards-wrapper">
        <HomeCard
          isBadge
          title="My Students"
          icon={faPeopleLine}
          onClick={() =>
            navigate("/app/students", { state: { status: "myStudents" } })
          }
        />
        <HomeCard
          isBadge
          title="Calender"
          icon={faCalendar}
          isLink
          download
          to={calendarData?.file || "/"}
          target="_blank"
        />
        <HomeCard
          isBadge
          title="Timetable"
          icon={faTimeline}
          to={timetableData?.file || "/"}
          download
          target="_blank"
          isLink
        />
        <HomeCard
          isBadge
          title="Dress Code"
          icon={faPersonDress}
          to="/app/dress-code"
          isLink
        />
      </div>
    </div>
  );
};

export default Teacher;
