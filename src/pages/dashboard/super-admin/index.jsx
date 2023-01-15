import React from "react";
import { Col, Row, Spinner } from "reactstrap";
import PageTitle from "../../../components/common/title";
import HomeCard from "../../../components/cards/home-card";
import ProfileCard from "../../../components/cards/profile-card";
import { useHome } from "../../../hooks/useHome";
import Numeral from "react-numeral";

const SuperAdmin = () => {
  const {
    isLoading,
    outstanding,
    expectedIncome,
    discount,
    totalExpense,
    accountBalance,
    receivedIncome,
  } = useHome();

  return (
    <div>
      <PageTitle>Super Admin {isLoading && <Spinner />}</PageTitle>
      <ProfileCard />
      <Row>
        <Col sm="6" md="4" className="mb-4">
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
        <Col sm="6" md="4" className="mb-4">
          <HomeCard
            title="Received Income"
            amount={
              <>
                &#8358;
                <Numeral value={receivedIncome?.data || "0"} format="0,0.00" />
              </>
            }
          />
        </Col>
        <Col sm="6" md="4" className="mb-4">
          <HomeCard
            title="Expected Income"
            amount={
              <>
                &#8358;
                <Numeral value={expectedIncome?.data || "0"} format="0,0.00" />
              </>
            }
          />
        </Col>
        <Col sm="6" md="4" className="mb-4">
          <HomeCard
            title="Total Expense"
            amount={
              <>
                &#8358;
                <Numeral value={totalExpense?.data || "0"} format="0,0.00" />
              </>
            }
          />
        </Col>
        <Col sm="6" md="4" className="mb-4">
          <HomeCard
            title="Discount"
            amount={
              <>
                &#8358;
                <Numeral value={discount?.data || "0"} format="0,0.00" />
              </>
            }
          />
        </Col>
        <Col sm="6" md="4" className="mb-4">
          <HomeCard
            title="Outstanding"
            amount={
              <Numeral value={outstanding?.data || "0"} format="0,0.00" />
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default SuperAdmin;
