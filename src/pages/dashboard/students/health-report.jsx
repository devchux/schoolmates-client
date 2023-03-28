import React from "react";
import { useForm } from "react-formid";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import DetailView from "../../../components/views/detail-view";
import { useStudent } from "../../../hooks/useStudent";

const HealthReport = () => {
  const { isLoading, studentData, postHealthReport, apiServices } =
    useStudent();
  const { handleSubmit, errors, getFieldProps } = useForm({
    defaultValues: {
      date_of_incident: "",
      time_of_incident: "",
      condition: "",
      state: "",
      report_details: "",
      action_taken: "",
      recommendation: "",
    },
  });

  const onSubmit = (data) =>
    postHealthReport({
      ...data,
      date_of_incident: apiServices.formatDate(
        data.date_of_incident,
        "DD-MM-YYY"
      ),
      student_id: studentData.id,
      student_fullname: `${studentData.firstname} ${studentData.surname} ${studentData.middlename}`,
      admission_number: studentData.admission_number,
    });
  return (
    <DetailView
      isLoading={isLoading}
      cancelLink="/app/students"
      pageTitle={`${studentData.firstname} ${studentData.surname}'s Health Report`}
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="date"
            label="Date of Incident"
            hasError={!!errors.date_of_incident}
            {...getFieldProps("date_of_incident")}
          />
          {!!errors.date_of_incident && (
            <p className="error-message">{errors.date_of_incident}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="time"
            label="Time of Incident"
            hasError={!!errors.time_of_incident}
            {...getFieldProps("time_of_incident")}
          />
          {!!errors.time_of_incident && (
            <p className="error-message">{errors.time_of_incident}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Condition"
            hasError={!!errors.condition}
            {...getFieldProps("condition")}
          />
          {!!errors.condition && (
            <p className="error-message">{errors.condition}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="State"
            hasError={!!errors.state}
            {...getFieldProps("state")}
          />
          {!!errors.state && <p className="error-message">{errors.state}</p>}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <label className="mb-2">Report Details</label>
          <textarea
            className="form-control"
            rows="5"
            {...getFieldProps("report_details")}
          />
          {!!errors.report_details && (
            <p className="error-message">{errors.report_details}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <label className="mb-2">Action Taken</label>
          <textarea
            className="form-control"
            rows="5"
            {...getFieldProps("action_taken")}
          />
          {!!errors.action_taken && (
            <p className="error-message">{errors.action_taken}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <label className="mb-2">Recommendation</label>
          <textarea
            className="form-control"
            rows="5"
            {...getFieldProps("recommendation")}
          />
          {!!errors.recommendation && (
            <p className="error-message">{errors.recommendation}</p>
          )}
        </Col>
      </Row>
    </DetailView>
  );
};

export default HealthReport;
