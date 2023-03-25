import React from "react";
import { Col, Row, Spinner } from "reactstrap";
import PageTitle from "../../../../components/common/title";
import HomeCard from "../../../../components/cards/home-card";
import ProfileCard from "../../../../components/cards/profile-card";
import { useHome } from "../../../../hooks/useHome";
import Numeral from "react-numeral";


const Account = () => {
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
      <PageTitle>Accounts {isLoading && <Spinner />}</PageTitle>
      <ProfileCard type="account"/>
      <Row className="mt-5">
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
            title="Expenditure"
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

export default Account;




// import {
//     faMoneyBill,
//     faDollar,
//     faFileInvoiceDollar,
//     faHandsHoldingChild,
//     faBox,
//     faFilterCircleDollar,
//     faCircleDollarToSlot,
//     faCommentsDollar,
//   } from "@fortawesome/free-solid-svg-icons";
//   import React from "react";
//   import { useNavigate } from "react-router-dom";
//   import { Spinner } from "reactstrap";
//   import HomeCard from "../../../../components/cards/home-card";
//   import ProfileCard from "../../../../components/cards/profile-card";
//   import PageTitle from "../../../../components/common/title";
//   import { useHome } from "../../../../hooks/useHome";
//   import Numeral from "react-numeral";
  
//   const Account = () => {
//     const navigate = useNavigate();
//     const {
//       isLoading,
//       outstanding,
//       expectedIncome,
//       discount,
//       totalExpense,
//       accountBalance,
//       receivedIncome,
//       timetableData
//     } = useHome();
//     return (
//       <div className="teachers">
//         <PageTitle> Accounts {isLoading && <Spinner />}</PageTitle>
//         <ProfileCard type="account" />
//         <div className="teachers-cards-wrapper">
//           <HomeCard
//             isBadge
//             title="Execpted Income"
//             icon={faCommentsDollar}
//             amount={
//               <>
//                 &#8358;
//                 <Numeral value={expectedIncome?.data || "0"} format="0,0.00" />
//               </>
//             }
//           />
//           <HomeCard
//             isBadge
//             title="Received Income"
//             icon={faDollar}
//             amount={
//               <>
//                 &#8358;
//                 <Numeral value={receivedIncome?.data || "0"} format="0,0.00" />
//               </>
//             }
//           />
//           <HomeCard
//             isBadge
//             title="Expenditure"
//             icon={faCircleDollarToSlot}
//             amount={
//               <>
//                 &#8358;
//                 <Numeral value={totalExpense?.data || "0"} format="0,0.00" />
//               </>
//             }
//           />
//           <HomeCard
//             isBadge
//             title="Account Balance"
//             icon={faMoneyBill}
//             amount={
//               <>
//                 &#8358;
//                 <Numeral value={accountBalance?.data || "0"} format="0,0.00" />
//               </>
//             }
//           />
//           <HomeCard
//             isBadge
//             title="View List"
//             icon={faFileInvoiceDollar}
//             to={timetableData?.file || "/"}
//             download
//             target="_blank"
//             isLink
//           />
//           <HomeCard
//             isBadge
//             title="Account Invoice"
//             icon={faFilterCircleDollar}
//             to="/app/dress-code"
//             isLink
//           />
//           <HomeCard
//             isBadge
//             title="Outstanding"
//             icon={    faHandsHoldingChild }
//             amount={
//               <Numeral value={outstanding?.data || "0"} format="0,0.00" />
//             }
//           />
//           <HomeCard
//             isBadge
//             title="Discount"
//             icon={faBox}
//             amount={
//               <>
//                 &#8358;
//                 <Numeral value={discount?.data || "0"} format="0,0.00" />
//               </>
//             }
//           />
//         </div>
//       </div>
//     );
//   };
  
//   export default Account;
  