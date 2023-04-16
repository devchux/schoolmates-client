import React from "react";
import { Col, Row, Spinner } from "reactstrap";
import ProfileCard from "../../../components/cards/profile-card";
import PageTitle from "../../../components/common/title";
import { useHome } from "../../../hooks/useHome";
import UserCard from "../../../components/cards/user-card";
import {
  faSchoolCircleExclamation,
  faUserGraduate,
  faUserGroup,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import AuditCard from "../../../components/cards/audit-card";

const Principal = () => {
  const {
    isLoading,
    staffPopulation,
    studentPopulation,
    teacherPopulation,
    schoolPopulation,
  } = useHome();

  return (
    <div className="teachers">
      <PageTitle> Principal {isLoading && <Spinner />}</PageTitle>
      <ProfileCard type="principal" />
      <Row className="my-5">
        <Col sm="6" className="mb-4 col-12">
          <Row>
            <Col className="mb-4 col-6">
              <UserCard
                title="Students"
                number={studentPopulation}
                icon={faUserGraduate}
              />
            </Col>
            <Col className="mb-4 col-6">
              <UserCard
                variant="purple"
                title="Teachers"
                number={teacherPopulation}
                icon={faUserTie}
              />
            </Col>
            <Col className="mb-4 col-6">
              <UserCard
                variant="green"
                title="Schools"
                number={schoolPopulation}
                icon={faSchoolCircleExclamation}
              />
            </Col>
            <Col className="mb-4 col-6">
              <UserCard
                variant="orange"
                title="Staffs"
                number={staffPopulation}
                icon={faUserGroup}
              />
            </Col>
          </Row>
        </Col>
        <Col sm="6" className="mb-4 col-12">
          <AuditCard />
        </Col>
      </Row>
    </div>
  );
};

export default Principal;
