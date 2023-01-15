import React from "react";
import { Col, Row } from "reactstrap";
import PageTitle from "../../../components/common/title";
import HomeCard from "../../../components/cards/home-card";
import ProfileCard from "../../../components/cards/profile-card";

const SuperAdmin = () => {
  return (
    <div>
      <PageTitle>Super Admin</PageTitle>
      <ProfileCard />
      <Row>
        <Col sm="6" md="4" className="mb-4">
          <HomeCard title="Account Balance" amount={<>&#8358;10,000.00</>} />
        </Col>
        <Col sm="6" md="4" className="mb-4">
          <HomeCard title="Received Income" amount={<>&#8358;10,000.00</>} />
        </Col>
        <Col sm="6" md="4" className="mb-4">
          <HomeCard title="Expected Income" amount={<>&#8358;10,000.00</>} />
        </Col>
        <Col sm="6" md="4" className="mb-4">
          <HomeCard title="Total Expense" amount={<>&#8358;10,000.00</>} />
        </Col>
        <Col sm="6" md="4" className="mb-4">
          <HomeCard title="Discount" amount={<>&#8358;10,000.00</>} />
        </Col>
        <Col sm="6" md="4" className="mb-4">
          <HomeCard title="Outstanding" amount="10,000.00" />
        </Col>
      </Row>
    </div>
  );
};

export default SuperAdmin;
