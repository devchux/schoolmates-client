import React from "react";
import PageView from "../../../components/views/table-view";
import { useAccounts } from "../../../hooks/useAccounts";

const Payment = () => {
  const { paymentLoading, payment, permission } = useAccounts();

  return (
    <PageView
      canCreate={permission?.create}
      isLoading={paymentLoading}
      columns={[
        {
          Header: "Student Fullname",
          accessor: "student_fullname",
        },
        {
          Header: "Payment Method",
          accessor: "payment_method",
        },
        {
          Header: "Amount Paid",
          accessor: "amount_paid",
        },
        {
          Header: "Account Name",
          accessor: "account_name",
        },
        {
          Header: "Total Amount",
          accessor: "total_amount",
        },
        {
          Header: "Bank Name",
          accessor: "bank_name",
        },
        {
          Header: "Term",
          accessor: "term",
        },
        {
          Header: "Session",
          accessor: "session",
        },
        {
          Header: "Remark",
          accessor: "remark",
        },
      ]}
      data={payment}
    />
  );
};

export default Payment;
