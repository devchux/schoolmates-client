import React from "react";
import { useForm } from "react-formid";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import DetailView from "../../../components/views/detail-view";
import { useAppContext } from "../../../hooks/useAppContext";

const FeeDetail = () => {
  const { apiServices, user } = useAppContext();

  const { isLoading, mutate: createPost } = useMutation(
    apiServices.postFee,
    {
      onSuccess() {
        toast.success("Fee has been created");
      },

      onError(err) {
        apiServices.errorHandler(err);
      },
    }
  );

  const { handleSubmit, errors, getFieldProps } = useForm({
    defaultValues: {
        feetype: "",
        amount: "",
        term: "",
        fee_status: "",
        category: ""
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
      pageTitle="Create Fee"
      onFormSubmit={handleSubmit(onSubmit)}
    >
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
          {!!errors.amount && (
            <p className="error-message">{errors.amount}</p>
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
          {!!errors.term && (
            <p className="error-message">{errors.term}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Fee Status"
            hasError={!!errors.fee_status}
            {...getFieldProps("fee_status")}
          />
          {!!errors.fee_status && (
            <p className="error-message">{errors.fee_status}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Category"
            hasError={!!errors.category}
            {...getFieldProps("category")}
          />
          {!!errors.category && (
            <p className="error-message">{errors.category}</p>
          )}
        </Col>
      </Row>
    </DetailView>
  );
};

export default FeeDetail;
