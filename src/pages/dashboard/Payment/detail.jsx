import React from "react";
import { useForm } from "react-formid";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import DetailView from "../../../components/views/detail-view";
import { useAppContext } from "../../../hooks/useAppContext";

const PaymentDetail = () => {
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
      bank_name: "",
      account_name: "",
      student_id: "",
      student_fullname: "",
      payment_method: "",
      amount_paid: "",
      total_amount: "",
      remark: "",
    },
    validation: {
    },
  });
  const { isLoading, mutate: createPost } = useMutation(
    apiServices.postPayment,
    {
      onSuccess() {
        toast.success("Payment Successful");
      },

      onError(err) {
        apiServices.errorHandler(err);
      },
    }
  );

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
      pageTitle="Make Payment"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
      <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Student Id"
            hasError={!!errors.student_id}
            {...getFieldProps("student_id")}
          />
          {!!errors.student_id && (
            <p className="error-message">{errors.student_id}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Account Name"
            hasError={!!errors.account_name}
            {...getFieldProps("account_name")}
          />
          {!!errors.account_name && (
            <p className="error-message">{errors.account_name}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Bank Name"
            hasError={!!errors.bank_name}
            {...getFieldProps("bank_name")}
          />
          {!!errors.bank_name && (
            <p className="error-message">{errors.bank_name}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label=" Student Fullname"
            hasError={!!errors.student_fullname}
            {...getFieldProps(" student_fullname")}
          />
          {!!errors.student_fullname && (
            <p className="error-message">{errors.student_fullname}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Payment Method"
            hasError={!!errors.payment_method}
            {...getFieldProps("payment_method")}
          />
          {!!errors.payment_method && (
            <p className="error-message">{errors.payment_method}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Amount Paid"
            hasError={!!errors.amount_paid}
            {...getFieldProps("amount_paid")}
          />
          {!!errors.amount_paid && (
            <p className="error-message">{errors.amount_paid}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Total Amount"
            hasError={!!errors.total_amount}
            {...getFieldProps("total_amount")}
          />
          {!!errors.total_amount && (
            <p className="error-message">{errors.total_amount}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Term"
            hasError={!!errors.term}
            {...getFieldProps("term")}
          />
          {!!errors.term && <p className="error-message">{errors.term}</p>}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
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
        
        <Col sm="6" className="mb-4 mb-sm-0">
          <label className="mb-2">Remark</label>
          <textarea
            className="form-control"
            rows="5"
            {...getFieldProps("remark")}
          />
          {!!errors.remark && (
            <p className="error-message">{errors.remark}</p>
          )}
        </Col>
      </Row>
    </DetailView>
  );
};

export default PaymentDetail;
