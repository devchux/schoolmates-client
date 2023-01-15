import React from "react";
import PageView from "../../../components/views/table-view";
import { useVendors } from "../../../hooks/useVendors";

const Vendors = () => {
  const { vendorsListLoading, vendorsList, permission } = useVendors();

  return (
    <PageView
      canCreate={permission?.create}
      isLoading={vendorsListLoading}
      columns={[
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "Vendor Name",
          accessor: "vendor_name",
        },
        {
          Header: "Vendor Type",
          accessor: "vendor_type",
        },
        {
          Header: "Vendor Code",
          accessor: "vendor_code",
        },
        {
          Header: "Company Name",
          accessor: "company_name",
        },
        {
          Header: "Contact Address",
          accessor: "contact_address",
        },
        {
          Header: "Contact Person",
          accessor: "contact_person",
        },
        {
          Header: "Contact Phone",
          accessor: "contact_phone",
        },
        {
          Header: "Email Address",
          accessor: "email_address",
        },
      ]}
      data={vendorsList}
    />
  );
};

export default Vendors;
