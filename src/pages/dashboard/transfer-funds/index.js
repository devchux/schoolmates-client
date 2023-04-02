import React from "react";
import { useForm } from "react-formid";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import DetailView from "../../../components/views/detail-view";
import { useTransferFund } from "../../../hooks/useGrading";

const TransferFund = () => {
  const { isLoading, PostTransferFund } = useTransferFund();
  const { errors, getFieldProps, handleSubmit } = useForm({
    defaultValues: {
      from: "",
      to: "",
      amount: "",
      transfer_date: "",
      memo:""
    },
    validation: {
      from: {
        required: true,
      },
      to: {
        required: true,
      },
      amount: {
        required: true,
      },
      memo: {
        required: true,
      },
      transfer_date:{
          required: true,
      }
    },
  });

  const onSubmit = (data) => {
    PostTransferFund(data);
  };

  return (
    <DetailView
      isLoading={isLoading}
      pageTitle="Transfer Fund"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label=" From"
            hasError={!!errors.from}
            {...getFieldProps("from")}
          />
          {!!errors.from && (
            <p className="error-message">{errors.from}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label=" To"
            hasError={!!errors.to}
            {...getFieldProps("to")}
          />
          {!!errors.to && (
            <p className="error-message">{errors.to}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Amount"
            hasError={!!errors.amount}
            {...getFieldProps("amount")}
          />
          {!!errors.amount && <p className="error-message">{errors.amount}</p>}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Transfer Date"
            hasError={!!errors.transfer_date}
            {...getFieldProps("transfer_date")}
          />
          {!!errors.transfer_date && <p className="error-message">{errors.transfer_date}</p>}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <label className="mb-2">Memo</label>
          <textarea
            className="form-control"
            rows="5"
            {...getFieldProps("memo")}
          />
          {!!errors.memo && (
            <p className="error-message">{errors.memo}</p>
          )}
        </Col>
      </Row>
    </DetailView>
  );
};

export default TransferFund;
