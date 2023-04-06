import React from "react";
import { useForm } from "react-formid";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import DetailView from "../../../components/views/detail-view";
import { useAppContext } from "../../../hooks/useAppContext";


const InvoiceDetail = () => {
  const {
    apiServices,
    user,
  } = useAppContext();
  const {
    handleSubmit,
    errors,
    getFieldProps,
  } = useForm({
    defaultValues: {
      session: "",
      term: "First Term",
      admission_number: "",
      fullname: "",
      student_id: "",
      class: "",
      feetype: "",
      amount: "",
      discount: "",
      discount_amount: "",
    },
  });
  const { isLoading, mutate: createInvoicePost } = useMutation(
    apiServices.postInvoice,
    {
      onSuccess() {
        toast.success("Invoice Successful");
      },

      onError(err) {
        apiServices.errorHandler(err);
      },
    }
  );

  const onSubmit = (data) => {
    
    createInvoicePost({
      body: {
        ...data,
        id: user.id,
      },
    });
  };

  return (
    <DetailView
      isLoading={isLoading}
      pageTitle="Create Invoice"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Student_id"
            hasError={!!errors.student_id}
            {...getFieldProps("student_id")}
          />
          {!!errors.student_id && (
            <p className="error-message">{errors.student_id}</p>
          )}
        </Col>

        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Full Name"
            hasError={!!errors.fullname}
            {...getFieldProps("fullname")}
          />
          {!!errors.fullname && (
            <p className="error-message">{errors.fullname}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Class"
            hasError={!!errors.class}
            {...getFieldProps("class")}
          />
          {!!errors.class && <p className="error-message">{errors.class}</p>}
        </Col>

        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Admission Number"
            hasError={!!errors.admission_number}
            {...getFieldProps("admission_number")}
          />
          {!!errors.admission_number && (
            <p className="error-message">{errors.admission_number}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Fee Type"
            hasError={!!errors.feetype}
            {...getFieldProps("feetype")}
          />
          {!!errors.feetype && (
            <p className="error-message">{errors.feetype}</p>
          )}
        </Col>

        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Amount"
            hasError={!!errors.amount}
            {...getFieldProps("amount")}
          />
          {!!errors.amount && <p className="error-message">{errors.amount}</p>}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Discount"
            hasError={!!errors.discount}
            {...getFieldProps("discount")}
          />
          {!!errors.discount && (
            <p className="error-message">{errors.discount}</p>
          )}
        </Col>

        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Discount Amount"
            hasError={!!errors.discount_amount}
            {...getFieldProps("discount_amount")}
          />
          {!!errors.discount_amount && (
            <p className="error-message">{errors.discount_amount}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Term"
            hasError={!!errors.term}
            {...getFieldProps("term")}
          />
          {!!errors.term && <p className="error-message">{errors.term}</p>}
        </Col>
        
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Session"
            hasError={!!errors.session}
            {...getFieldProps("session")}
          />
          {!!errors.session && (
            <p className="error-message">{errors.session}</p>
          )}
        </Col>
      </Row>
    </DetailView>
  );
};

export default InvoiceDetail;
