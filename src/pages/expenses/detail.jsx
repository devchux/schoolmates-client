

import React from "react";
import { useForm } from "react-formid";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import AuthInput from "../../components/inputs/auth-input";
import DetailView from "../../components/views/detail-view";
import { useAppContext } from "../../hooks/useAppContext";

const ExpensesDetail = () => {
  const { apiServices, user } = useAppContext();

  const { isLoading, mutate: createPost } = useMutation(
    apiServices.postExpense,
    {
      onSuccess() {
        toast.success("Expense has been created");
      },

      onError(err) {
        apiServices.errorHandler(err);
      },
    }
  );

  const { handleSubmit, errors, getFieldProps } = useForm({
    defaultValues: {
        term: "",
        session: "",
        expense_category: "",
        bank_name: "",
        account_name: "",
        payment_type: "",
        beneficiary: "",
        transaction_id: "",
        amount: "",
        purpose: ""
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
      pageTitle="Expense"
      onFormSubmit={handleSubmit(onSubmit)}
    >
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
            label="Session"
            hasError={!!errors.session}
            {...getFieldProps("session")}
          />
          {!!errors.session && (
            <p className="error-message">{errors.session}</p>
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
            label="Bank Name "
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
            label="Account Name"
            hasError={!!errors.account_name}
            {...getFieldProps("account_name")}
          />
          {!!errors.account_name && (
            <p className="error-message">{errors.account_name}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Payment Type"
            hasError={!!errors.payment_type}
            {...getFieldProps("payment_type")}
          />
          {!!errors.payment_type && (
            <p className="error-message">{errors.payment_type}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Beneficiary"
            hasError={!!errors.beneficiary}
            {...getFieldProps("beneficiary")}
          />
          {!!errors.beneficiary && (
            <p className="error-message">{errors.beneficiary}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Transaction Id"
            hasError={!!errors.transaction_id}
            {...getFieldProps("transaction_id")}
          />
          {!!errors.transaction_id && (
            <p className="error-message">{errors.transaction_id}</p>
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
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Purpose"
            hasError={!!errors.purpose}
            {...getFieldProps("purpose")}
          />
          {!!errors.purpose && (
            <p className="error-message">{errors.purpose}</p>
          )}
        </Col>
      </Row>
    </DetailView>
  );
};

export default ExpensesDetail;
