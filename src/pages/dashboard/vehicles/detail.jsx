import React, { useEffect } from "react";
import { useForm } from "react-formid";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import DetailView from "../../../components/views/detail-view";
import { useVehicles } from "../../../hooks/useVehicles";

const VehicleDetail = () => {
  const { isLoading, addVehicle, handleUpdateVehicle, isEdit, vehicleData } =
    useVehicles();
  const { errors, getFieldProps, handleSubmit, setInputs, inputs } = useForm({
    defaultValues: {
      type: "",
      make: "",
      number: "",
      drivername: "",
    },
    validation: {
      type: {
        required: true,
      },
      make: {
        required: true,
      },
      number: {
        required: true,
      },
      drivername: {
        required: true,
      },
    },
  });

  useEffect(() => {
    if (vehicleData) {
      setInputs({
        ...inputs,
        ...vehicleData,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleData]);

  const onSubmit = (data) => {
    if (isEdit) return handleUpdateVehicle({ id: vehicleData?.id, ...data });
    addVehicle(data);
  };
  return (
    <DetailView
      isLoading={isLoading}
      cancelLink="/app/vehicles"
      pageTitle="Add Vehicle"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Vehicle Type"
            hasError={!!errors.type}
            {...getFieldProps("type")}
          />
          {!!errors.type && <p className="error-message">{errors.type}</p>}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Vehicle Make"
            hasError={!!errors.make}
            {...getFieldProps("make")}
          />
          {!!errors.make && <p className="error-message">{errors.make}</p>}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Vehicle Number"
            hasError={!!errors.number}
            {...getFieldProps("number")}
          />
          {!!errors.number && <p className="error-message">{errors.number}</p>}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Vehicle Driver"
            hasError={!!errors.drivername}
            {...getFieldProps("drivername")}
          />
          {!!errors.drivername && (
            <p className="error-message">{errors.drivername}</p>
          )}
        </Col>
      </Row>
    </DetailView>
  );
};

export default VehicleDetail;
