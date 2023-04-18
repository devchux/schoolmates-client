import React from "react";
import { Col, Row, Spinner } from "reactstrap";
import PageTitle from "../../../../components/common/title";
import HomeCard from "../../../../components/cards/home-card";
import ProfileCard from "../../../../components/cards/profile-card";
import { useHome } from "../../../../hooks/useHome";
import Numeral from "react-numeral";
import PieChart from "../../../../components/charts/pie-chart";
import UserCard from "../../../../components/cards/user-card";
import { faSchoolCircleExclamation, faUserGraduate, faUserGroup, faUserTie } from "@fortawesome/free-solid-svg-icons";

const Account = () => {
  const {
    isLoading,
    outstanding,
    expectedIncome,
    discount,
    totalExpense,
    accountBalance,
    receivedIncome,
    staffPopulation,
    studentPopulation,
    teacherPopulation,
    schoolPopulation,
  } = useHome();

  return (
    <div>
      <PageTitle>Accounts {isLoading && <Spinner />}</PageTitle>
      <ProfileCard type="account" />
      <Row className="mt-5">
        <Col md="4" className="mb-4 col-6">
          <HomeCard
            title="Account Balance"
            amount={
              <>
                &#8358;
                <Numeral value={accountBalance?.data || "0"} format="0,0.00" />
              </>
            }
          />
        </Col>
        <Col md="4" className="mb-4 col-6">
          <HomeCard
            title="Received Income"
            variant="purple"
            amount={
              <>
                &#8358;
                <Numeral value={receivedIncome?.data || "0"} format="0,0.00" />
              </>
            }
          />
        </Col>
        <Col md="4" className="mb-4 col-6">
          <HomeCard
            title="Expected Income"
            variant="orange"
            amount={
              <>
                &#8358;
                <Numeral value={expectedIncome?.data || "0"} format="0,0.00" />
              </>
            }
          />
        </Col>
        <Col md="4" className="mb-4 col-6">
          <HomeCard
            title="Total Expense"
            variant="red"
            amount={
              <>
                &#8358;
                <Numeral value={totalExpense?.data || "0"} format="0,0.00" />
              </>
            }
          />
        </Col>
        <Col md="4" className="mb-4 col-6">
          <HomeCard
            title="Discount"
            variant="green"
            amount={
              <>
                &#8358;
                <Numeral value={discount?.data || "0"} format="0,0.00" />
              </>
            }
          />
        </Col>
        <Col md="4" className="mb-4 col-6">
          <HomeCard
            title="Outstanding"
            variant="pink"
            amount={
              <>
                &#8358;
                <Numeral value={outstanding?.data || "0"} format="0,0.00" />
              </>
            }
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
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
        <Col sm="6" className="mb-4">
          <PieChart
            data={[
              +accountBalance?.data ?? 0,
              +receivedIncome?.data ?? 0,
              +expectedIncome?.data ?? 0,
              +totalExpense?.data ?? 0,
              +discount?.data ?? 0,
              +outstanding?.data ?? 0,
            ]}
            label={[
              "Account Balance",
              "Received Income",
              "Expected Income",
              "Total Expense",
              "Discount",
              "Outstanding",
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Account;
