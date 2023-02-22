import React from "react";
import PageView from "../../../components/views/table-view";
import { useAccounts } from "../../../hooks/useAccounts";

const Accounts = () => {
  const {
    permission,
    isLoading,
    indexStatus,
    setIndexStatus,
    feeHistory,
    previousInvoice,
    invoice,
  } = useAccounts();

  const getSortButtonOptions = () => {
    const arr = [];
    if (permission?.feeHistory) {
      arr.push({
        title: "Fee History",
        type: "button",
        variant: indexStatus !== "fee-history" ? "outline" : null,
        onClick: () => setIndexStatus("fee-history"),
      });
    }

    if (permission?.paymentReciept) {
      arr.push({
        title: "Payment Reciept",
        type: "button",
        variant: indexStatus !== "payment-reciept" ? "outline" : null,
        onClick: () => setIndexStatus("payment-reciept"),
      });
    }

    if (permission?.myInvoice) {
      arr.push({
        title: "My Invoice",
        type: "button",
        variant: indexStatus !== "my-invoice" ? "outline" : null,
        onClick: () => setIndexStatus("my-invoice"),
      });
    }

    if (permission?.previousInvoice) {
      arr.push({
        title: "Previous Invoice",
        type: "button",
        variant: indexStatus !== "previous-invoice" ? "outline" : null,
        onClick: () => setIndexStatus("previous-invoice"),
      });
    }

    return arr;
  };

  const dataMapper = {
    "fee-history": {
      columns: [
        {
          Header: "Full Name",
          accessor: "student_fullname",
        },
        {
          Header: "Status",
          accessor: "status",
        },
        {
          Header: "Amount Paid",
          accessor: "amount_paid",
        },
        {
          Header: "Total Amount",
          accessor: "total_amount",
        },
        {
          Header: "Amount Due",
          accessor: "amount_due",
        },
        {
          Header: "Payment Method",
          accessor: "payment_method",
        },
        {
          Header: "Account Name",
          accessor: "account_name",
        },
        {
          Header: "Bank",
          accessor: "bank_name",
        },
        {
          Header: "Remark",
          accessor: "remark",
        },
        {
          Header: "Term",
          accessor: "term",
        },
        {
          Header: "Session",
          accessor: "session",
        },
      ],
      data: feeHistory,
    },
    "previous-invoice": {
      columns: [
        {
          Header: "Invoice",
          accessor: "invoice_no",
        },
        {
          Header: "Full Name",
          accessor: "fullname",
        },
        {
          Header: "Admission Number",
          accessor: "admission_number",
        },
        {
          Header: "Class",
          accessor: "class",
        },
        {
          Header: "Fee Type",
          accessor: "feetype",
        },
        {
          Header: "Amount",
          accessor: "amount",
        },
        {
          Header: "Notation",
          accessor: "notation",
        },
        {
          Header: "Discount",
          accessor: "discount",
        },
        {
          Header: "Discount Amount",
          accessor: "discount_amount",
        },
        {
          Header: "Term",
          accessor: "term",
        },
        {
          Header: "Session",
          accessor: "session",
        },
      ],
      data: previousInvoice,
    },
    "payment-reciept": {
      columns: [],
      data: [],
    },
    "my-invoice": {
      columns: [
        {
          Header: "Invoice",
          accessor: "invoice_no",
        },
        {
          Header: "Full Name",
          accessor: "fullname",
        },
        {
          Header: "Admission Number",
          accessor: "admission_number",
        },
        {
          Header: "Class",
          accessor: "class",
        },
        {
          Header: "Fee Type",
          accessor: "feetype",
        },
        {
          Header: "Amount",
          accessor: "amount",
        },
        {
          Header: "Notation",
          accessor: "notation",
        },
        {
          Header: "Discount",
          accessor: "discount",
        },
        {
          Header: "Discount Amount",
          accessor: "discount_amount",
        },
        {
          Header: "Term",
          accessor: "term",
        },
        {
          Header: "Session",
          accessor: "session",
        },
      ],
      data: invoice,
    },
  };

  return (
    <PageView
      canCreate={permission?.canCreate}
      hasSortOptions={permission?.sort}
      isLoading={isLoading}
      groupedButtonOptions={getSortButtonOptions()}
      columns={dataMapper[indexStatus].columns}
      data={dataMapper[indexStatus].data}
    />
  );
};

export default Accounts;
