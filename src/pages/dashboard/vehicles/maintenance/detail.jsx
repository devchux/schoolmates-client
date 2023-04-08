import React, { useEffect } from "react";
import { useForm } from "react-formid";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../../components/inputs/auth-input";
import DetailView from "../../../../components/views/detail-view";
import { useVehicleMaintenance } from "../../../../hooks/useVehicleMaintenance";

const VehicleMaintenanceDetail = () => {
  const { errors, handleSubmit, getFieldProps, setInputs, inputs } = useForm({
    defaultValues: {
      vehicle_type: "",
      vehicle_make: "",
      vehicle_number: "",
      driver_name: "",
      detected_fault: "",
      mechanic_name: "",
      mechanic_phone: "",
      cost_of_maintenance: "",
      initial_payment: "",
    },
    validation: {
      vehicle_type: { required: true },
      vehicle_make: { required: true },
      vehicle_number: { required: true },
      driver_name: { required: true },
      detected_fault: { required: true },
      mechanic_name: { required: true },
      mechanic_phone: { required: true },
      cost_of_maintenance: { required: true },
      initial_payment: { required: true },
    },
  });
  const { isLoading, postMaintenance, vehicleData, isEdit } =
    useVehicleMaintenance();

  const onSubmit = (data) => {
    postMaintenance(data);
  };

  useEffect(() => {
    if (isEdit) {
      setInputs({
        ...inputs,
        vehicle_type: vehicleData?.type,
        vehicle_make: vehicleData?.make,
        vehicle_number: vehicleData?.number,
        driver_name: vehicleData?.drivername,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, vehicleData]);
  return (
    <DetailView
      isLoading={isLoading}
      pageTitle="Post Vehicle Maintenance"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            disabled
            label="Vehicle Type"
            hasError={!!errors.vehicle_type}
            {...getFieldProps("vehicle_type")}
          />
          {!!errors.vehicle_type && (
            <p className="error-message">{errors.vehicle_type}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            disabled
            label="Vehicle Make"
            hasError={!!errors.vehicle_make}
            {...getFieldProps("vehicle_make")}
          />
          {!!errors.vehicle_make && (
            <p className="error-message">{errors.vehicle_make}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            disabled
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
            disabled
            label="Driver Name"
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
            label="Detected Fault"
            hasError={!!errors.detected_fault}
            {...getFieldProps("detected_fault")}
          />
          {!!errors.detected_fault && (
            <p className="error-message">{errors.detected_fault}</p>
          )}
        </Col>

        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Mechanic Name"
            hasError={!!errors.mechanic_name}
            {...getFieldProps("mechanic_name")}
          />
          {!!errors.mechanic_name && (
            <p className="error-message">{errors.mechanic_name}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Mechanic Phone"
            hasError={!!errors.mechanic_phone}
            {...getFieldProps("mechanic_phone")}
          />
          {!!errors.mechanic_phone && (
            <p className="error-message">{errors.mechanic_phone}</p>
          )}
        </Col>

        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Cost Of Maintenance"
            hasError={!!errors.cost_of_maintenance}
            {...getFieldProps("cost_of_maintenance")}
          />
          {!!errors.cost_of_maintenance && (
            <p className="error-message">{errors.cost_of_maintenance}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Initial Payment"
            hasError={!!errors.initial_payment}
            {...getFieldProps("initial_payment")}
          />
          {!!errors.initial_payment && (
            <p className="error-message">{errors.initial_payment}</p>
          )}
        </Col>
      </Row>
    </DetailView>
  );
};

export default VehicleMaintenanceDetail;
