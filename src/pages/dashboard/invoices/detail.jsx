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

const InvoiceDetail = () => {
  const { apiServices } = useAppContext();
  const {
    handleSubmit,
    errors,
    getFieldProps,
    setInputs,
    inputs,
    handleChange,
    setFieldValue,
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
      discount: "0",
    },
    validation: {
      session: { required: true },
      admission_number: { required: true },
      fullname: { required: true },
      student_id: { required: true },
      class: { required: true },
      feetype: { required: true },
      amount: { required: true },
      discount: { required: true },
    },
  });

  const { data: sessions } = useAcademicSession();
  const { isLoading: loadStudent, studentData, isEdit } = useStudent();
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
    const amount = data.amount.replace(/,/g, "");
    const discount_amount =
      Number(amount) - (Number(amount) * Number(data.discount)) / 100;
    createInvoicePost({
      body: {
        ...data,
        discount_amount,
      },
    });
  };

  useEffect(() => {
    if (isEdit) {
      setInputs({
        ...inputs,
        admission_number: studentData?.admission_number,
        fullname: `${studentData?.firstname} ${studentData?.surname} ${studentData?.middlename}`,
        student_id: studentData?.id,
        class: studentData?.class,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, studentData]);

  return (
    <DetailView
      isLoading={isLoading || loadStudent}
      pageTitle="Create Invoice"
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
            disabled
            label="Class"
            hasError={!!errors.class}
            {...getFieldProps("class")}
          />
          {!!errors.class && <p className="error-message">{errors.class}</p>}
        </Col>

        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            disabled
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
            name="amount"
            value={inputs.amount}
            onChange={(e) =>
              apiServices.onAmountChange(
                e,
                handleChange,
                setFieldValue,
                "amount"
              )
            }
          />
          {!!errors.amount && <p className="error-message">{errors.amount}</p>}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="number"
            label="Discount (%)"
            hasError={!!errors.discount}
            {...getFieldProps("discount")}
          />
          {!!errors.discount && (
            <p className="error-message">{errors.discount}</p>
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
      </Row>
    </DetailView>
  );
};

export default InvoiceDetail;
