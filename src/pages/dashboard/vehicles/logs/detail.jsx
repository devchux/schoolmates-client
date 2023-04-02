import React from "react";
import { useForm } from "react-formid";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../../components/inputs/auth-input";
import DetailView from "../../../../components/views/detail-view";
import { useVehicles } from "../../../../hooks/useVehicles";

const VehicleLogsDetail = () => {
  const { isLoading, addVehicleLogs } = useVehicles();
  const { errors, getFieldProps, handleSubmit } = useForm({
    defaultValues: {
      purpose: "",
      route: "",
      driver_name: "",
      vehicle_number: "",
      mechanic_condition: "",
      add_info: "",
      date_out: "",
      time_out: "",
    },
    validation: {
      purpose: {
        required: true,
      },
      route: {
        required: true,
      },
      driver_name: {
        required: true,
      },
      vehicle_number: {
        required: true,
      },
      mechanic_condition: {
        required: true,
      },
      date_out: {
        required: true,
      },
      time_out: {
        required: true,
      },
    },
  });

  const onSubmit = (data) => {
    addVehicleLogs(data);
  };
  return (
    <DetailView
      isLoading={isLoading}
      pageTitle="Add Vehicle Log"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Vehicle Number"
            hasError={!!errors.vehicle_number}
            {...getFieldProps("vehicle_number")}
          />
          {!!errors.vehicle_number && (
            <p className="error-message">{errors.vehicle_number}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Driver\'s Name"
            hasError={!!errors.driver_name}
            {...getFieldProps("driver_name")}
          />
          {!!errors.driver_name && (
            <p className="error-message">{errors.driver_name}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Vehicle Condition"
            hasError={!!errors.mechanic_condition}
            {...getFieldProps("mechanic_condition")}
          />
          {!!errors.mechanic_condition && (
            <p className="error-message">{errors.mechanic_condition}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Route"
            hasError={!!errors.route}
            {...getFieldProps("route")}
          />
          {!!errors.route && <p className="error-message">{errors.route}</p>}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
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
            label="Time Out"
            hasError={!!errors.time_out}
            {...getFieldProps("time_out")}
          />
          {!!errors.time_out && (
            <p className="error-message">{errors.time_out}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <label className="mb-2">Purpose</label>
          <textarea
            className="form-control"
            rows="5"
            {...getFieldProps("purpose")}
          />
          {!!errors.purpose && (
            <p className="error-message">{errors.purpose}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <label className="mb-2">Additional Information</label>
          <textarea
            className="form-control"
            rows="5"
            {...getFieldProps("add_info")}
          />
          {!!errors.add_info && (
            <p className="error-message">{errors.add_info}</p>
          )}
        </Col>
      </Row>
    </DetailView>
  );
};

export default VehicleLogsDetail;
