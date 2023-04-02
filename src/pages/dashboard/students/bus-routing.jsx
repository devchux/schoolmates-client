import React from "react";
import { useForm } from "react-formid";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import DetailView from "../../../components/views/detail-view";
import { useFile } from "../../../hooks/useFile";
import { useStudent } from "../../../hooks/useStudent";

const BusRouting = () => {
  const { postBusRouting, isLoading, studentData } = useStudent();
  const { asyncHandleImageChange } = useFile();
  const { handleSubmit, errors, getFieldProps, setFieldValue, inputs } =
    useForm({
      defaultValues: {
        admission_number: "",
        student_id: "",
        bus_type: "",
        bus_number: "",
        driver_name: "",
        driver_phonenumber: "",
        driver_image: "",
        conductor_name: "",
        conductor_phonenumber: "",
        conductor_image: "",
        route: "",
        ways: "",
        pickup_time: "",
        dropoff_time: "",
      },
    });

  const onSubmit = (data) =>
    postBusRouting({
      ...data,
      admission_number: studentData.admission_number,
      student_id: studentData.id,
    });
  return (
    <DetailView
      isLoading={isLoading}
      cancelLink="/app/students"
      pageTitle={`Bus Routing`}
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Bus Type"
            hasError={!!errors.bus_type}
            {...getFieldProps("bus_type")}
          />
          {!!errors.bus_type && (
            <p className="error-message">{errors.bus_type}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Bus Number"
            hasError={!!errors.bus_number}
            {...getFieldProps("bus_number")}
          />
          {!!errors.bus_number && (
            <p className="error-message">{errors.bus_number}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Route"
            hasError={!!errors.route}
            {...getFieldProps("route")}
          />
          {!!errors.route && <p className="error-message">{errors.route}</p>}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Ways"
            hasError={!!errors.ways}
            {...getFieldProps("ways")}
          />
          {!!errors.ways && <p className="error-message">{errors.ways}</p>}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Pick Up Time"
            hasError={!!errors.pickup_time}
            {...getFieldProps("pickup_time")}
          />
          {!!errors.pickup_time && (
            <p className="error-message">{errors.pickup_time}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Drop Off Time"
            hasError={!!errors.dropoff_time}
            {...getFieldProps("dropoff_time")}
          />
          {!!errors.dropoff_time && (
            <p className="error-message">{errors.dropoff_time}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Driver's Name"
            hasError={!!errors.driver_name}
            {...getFieldProps("driver_name")}
          />
          {!!errors.driver_name && (
            <p className="error-message">{errors.driver_name}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Driver's Photo"
            type="file"
            className="px-0"
            wrapperClassName="border-0"
            hasError={!!errors.driver_image}
            onChange={async (e) => {
              const file = await asyncHandleImageChange(e);

              setFieldValue("driver_image", file.base64);
            }}
          />
          {!!errors.driver_image && (
            <p className="error-message">{errors.driver_image}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Conductor's Name"
            hasError={!!errors.conductor_name}
            {...getFieldProps("conductor_name")}
          />
          {!!errors.conductor_name && (
            <p className="error-message">{errors.conductor_name}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Conductor's Photo"
            type="file"
            className="px-0"
            wrapperClassName="border-0"
            hasError={!!errors.conductor_image}
            onChange={async (e) => {
              const file = await asyncHandleImageChange(e);

              setFieldValue("conductor_image", file.base64);
            }}
          />
          {!!errors.conductor_image && (
            <p className="error-message">{errors.conductor_image}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            isPhone
            label="Conductor's Phone Number"
            value={inputs.conductor_phonenumber}
            hasError={!!errors.conductor_phonenumber}
            onChange={(value) =>
              setFieldValue("conductor_phonenumber", value || "")
            }
          />
          {!!errors.conductor_phonenumber && (
            <p className="error-message">{errors.conductor_phonenumber}</p>
          )}
        </Col>
      </Row>
    </DetailView>
  );
};

export default BusRouting;
