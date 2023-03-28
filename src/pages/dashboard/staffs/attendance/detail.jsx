import React from "react";
import { useForm } from "react-formid";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../../components/inputs/auth-input";
import DetailView from "../../../../components/views/detail-view";
import { useStaff } from "../../../../hooks/useStaff";

const StaffAttendanceDetail = () => {
  const { isLoading, addStaffAttendance, staffData, apiServices } = useStaff();
  const { handleSubmit, errors, getFieldProps } = useForm({
    defaultValues: {
      staff_id: "",
      time_in: "",
      date_in: "",
      time_out: "",
      date_out: "",
    },
  });

  const onSubmit = (data) => {
    addStaffAttendance({
      ...data,
      staff_id: staffData?.id,
      date_in: apiServices.formatDate(data.date_in, "DD-MM-YYYY"),
      date_out: apiServices.formatDate(data.date_out, "DD-MM-YYYY"),
    });
  };
  return (
    <DetailView
      isLoading={isLoading}
      pageTitle="Staff Attendance"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="date"
            label="Date In"
            hasError={!!errors.date_in}
            {...getFieldProps("date_in")}
          />
          {!!errors.date_in && (
            <p className="error-message">{errors.date_in}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="time"
            label="Time In"
            hasError={!!errors.time_in}
            {...getFieldProps("time_in")}
          />
          {!!errors.time_in && (
            <p className="error-message">{errors.time_in}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="date"
            label="Date Out"
            hasError={!!errors.date_out}
            {...getFieldProps("date_out")}
          />
          {!!errors.date_out && (
            <p className="error-message">{errors.date_out}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="time"
            label="Time Out"
            hasError={!!errors.time_out}
            {...getFieldProps("time_out")}
          />
          {!!errors.time_out && (
            <p className="error-message">{errors.time_out}</p>
          )}
        </Col>
      </Row>
    </DetailView>
  );
};

export default StaffAttendanceDetail;
