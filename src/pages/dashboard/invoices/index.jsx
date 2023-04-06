import React from "react";
import PageView from "../../../components/views/table-view";
import { useInvoices } from "../../../hooks/useInvoice";
const Invoices = () => {
  const { invoicesLoading, invoicesList, permission } = useInvoices();

  return (
    <PageView
      canCreate={permission?.create}
      isLoading={invoicesLoading}
      columns={[
        {
          Header: "id",
          accessor: "student_id",
        },
        {
          Header: " Name",
          accessor: "fullname",
        },
        {
          Header: "Class",
          accessor: "class",
        },
        {
          Header: "Admission Number",
          accessor: "admission_number",
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
      ]}
      data={invoicesList}
    />
  );
};

export default Invoices;
