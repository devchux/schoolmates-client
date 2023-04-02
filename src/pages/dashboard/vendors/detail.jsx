import React from "react";
import { useForm } from "react-formid";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import DetailView from "../../../components/views/detail-view";
import { useAppContext } from "../../../hooks/useAppContext";

const VendorDetail = () => {
  const { apiServices, user } = useAppContext();

  const { isLoading, mutate: createPost } = useMutation(
    apiServices.postVendor,
    {
      onSuccess() {
        toast.success("Vendor has been created");
      },

      onError(err) {
        apiServices.errorHandler(err);
      },
    }
  );

  const { handleSubmit, errors, getFieldProps } = useForm({
    defaultValues: {
      vendor_type: "",
      initial_balance: "",
      expense_category: "",
      vendor_name: "",
      company_name: "",
      contact_address: "",
      contact_person: "",
      email_address: "",
      contact_phone: ""
    },
  });

  const onSubmit = (data) => {
    createPost({
      body: {
        ...data,
        id: user.id,
      },
    });
  };
  
  return (
    <DetailView
      isLoading={isLoading}
      pageTitle="Create Vendor"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Vendor Type"
            hasError={!!errors.vendor_type}
            {...getFieldProps("vendor_type")}
          />
          {!!errors.vendor_type && (
            <p className="error-message">{errors.vendor_type}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Initial Balance"
            hasError={!!errors.initial_balance}
            {...getFieldProps("initial_balance")}
          />
          {!!errors.initial_balance && (
            <p className="error-message">{errors.initial_balance}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Expense Category"
            hasError={!!errors.expense_category}
            {...getFieldProps("expense_category")}
          />
          {!!errors.expense_category && (
            <p className="error-message">{errors.expense_category}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Vendor Name"
            hasError={!!errors.vendor_name}
            {...getFieldProps("vendor_name")}
          />
          {!!errors.vendor_name && (
            <p className="error-message">{errors.vendor_name}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Company Name"
            hasError={!!errors.company_name}
            {...getFieldProps("company_name")}
          />
          {!!errors.company_name && (
            <p className="error-message">{errors.company_name}</p>
          )}
        </Col>
      
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Contact Address"
            hasError={!!errors.contact_address}
            {...getFieldProps("contact_address")}
          />
          {!!errors.contact_address && (
            <p className="error-message">{errors.contact_address}</p>
          )}
        </Col>
        </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Contact Person"
            hasError={!!errors.contact_person}
            {...getFieldProps("contact_person")}
          />
          {!!errors.contact_person && (
            <p className="error-message">{errors.contact_person}</p>
          )}
        </Col>
      
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Contact Phone"
            hasError={!!errors.contact_phone}
            {...getFieldProps("contact_phone")}
          />
          {!!errors.contact_phone && (
            <p className="error-message">{errors.contact_phone}</p>
          )}
        </Col>
        </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Email Address"
            hasError={!!errors.email_address}
            {...getFieldProps("email_address")}
          />
          {!!errors.email_address && (
            <p className="error-message">{errors.email_address}</p>
          )}
        </Col>
      </Row>
    </DetailView>
  );
};

export default VendorDetail;
