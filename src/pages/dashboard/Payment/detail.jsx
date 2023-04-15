import React, { useEffect } from "react";
import { useForm } from "react-formid";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import AuthSelect from "../../../components/inputs/auth-select";
import DetailView from "../../../components/views/detail-view";
import { useAcademicSession } from "../../../hooks/useAcademicSession";
import { useAppContext } from "../../../hooks/useAppContext";
import { useStudent } from "../../../hooks/useStudent";

const PaymentDetail = () => {
  const { apiServices } = useAppContext();
  const {
    handleSubmit,
    errors,
    getFieldProps,
    setInputs,
    inputs,
    handleChange,
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
      session: { required: true },
      bank_name: { required: true },
      account_name: { required: true },
      student_id: { required: true },
      student_fullname: { required: true },
      payment_method: { required: true },
      amount_paid: { required: true },
      total_amount: { required: true },
      remark: { required: true },
    },
  });

  const { data: sessions } = useAcademicSession();
  const { isLoading: loadStudent, studentData, isEdit } = useStudent();
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
    createPost(data);
  };

  useEffect(() => {
    if (isEdit) {
      setInputs({
        ...inputs,
        student_fullname: `${studentData?.firstname} ${studentData?.surname} ${studentData?.middlename}`,
        student_id: studentData?.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, studentData]);

  return (
    <DetailView
      isLoading={isLoading || loadStudent}
      pageTitle="Make Payment"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            disabled
            label="Student ID"
            hasError={!!errors.student_id}
            {...getFieldProps("student_id")}
          />
          {!!errors.student_id && (
            <p className="error-message">{errors.student_id}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            disabled
            label="Student Full Name"
            hasError={!!errors.student_fullname}
            {...getFieldProps("student_fullname")}
          />
          {!!errors.student_fullname && (
            <p className="error-message">{errors.student_fullname}</p>
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
            label="Payment Method"
            hasError={!!errors.payment_method}
            {...getFieldProps("payment_method")}
          />
          {!!errors.payment_method && (
            <p className="error-message">{errors.payment_method}</p>
          )}
        </Col>
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
          <AuthSelect
            label="Term"
            value={inputs.term}
            name="term"
            hasError={!!errors.term}
            onChange={handleChange}
            options={[
              { value: "First Term", title: "First Term" },
              { value: "Second Term", title: "Second Term" },
              { value: "Third Term", title: "Third Term" },
            ]}
          />
          {!!errors.term && <p className="error-message">{errors.term}</p>}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthSelect
            label="Session"
            value={inputs.session}
            name="session"
            hasError={!!errors.session}
            onChange={handleChange}
            options={(sessions || [])?.map((session) => ({
              value: session?.academic_session,
              title: session?.academic_session,
            }))}
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
          {!!errors.remark && <p className="error-message">{errors.remark}</p>}
        </Col>
      </Row>
    </DetailView>
  );
};

export default PaymentDetail;
