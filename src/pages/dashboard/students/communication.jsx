import React from "react";
import DetailView from "../../../components/views/detail-view";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import { useForm } from "react-formid";
import { useStudent } from "../../../hooks/useStudent";

const CommunicationBook = () => {
  const { isLoading, studentData, postCommunicationBook } = useStudent();
  const { handleSubmit, errors, getFieldProps } = useForm({
    defaultValues: {
      title: "",
      urgency: "",
      message: "",
    },
  });
  const onSubmit = (data) =>
    postCommunicationBook({
      ...data,
      student_id: studentData.id,
      admission_number: studentData.admission_number,
    });

  return (
    <DetailView
      isLoading={isLoading}
      cancelLink="/app/students"
      pageTitle={`${studentData.firstname} ${studentData.surname}'s Communication Book`}
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Title"
            hasError={!!errors.title}
            {...getFieldProps("title")}
          />
          {!!errors.title && <p className="error-message">{errors.title}</p>}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Urgency"
            hasError={!!errors.urgency}
            {...getFieldProps("urgency")}
          />
          {!!errors.urgency && (
            <p className="error-message">{errors.urgency}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <label className="mb-2">Message</label>
          <textarea
            className="form-control"
            rows="5"
            {...getFieldProps("message")}
          />
          {!!errors.message && (
            <p className="error-message">{errors.message}</p>
          )}
        </Col>
      </Row>
    </DetailView>
  );
};

export default CommunicationBook;
