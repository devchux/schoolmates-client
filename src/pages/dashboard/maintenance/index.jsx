import React from "react";
import { useForm } from "react-formid";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import DetailView from "../../../components/views/detail-view";
import { useAppContext } from "../../../hooks/useAppContext";

const VehicleMaintenance = () => {
  const { apiServices, user } = useAppContext();

  const { isLoading, mutate: createPost } = useMutation(
    apiServices.postVendor,
    {
      onSuccess() {
        toast.success("Maintenance has been created");
      },

      onError(err) {
        apiServices.errorHandler(err);
      },
    }
  );

  const { handleSubmit, errors, getFieldProps } = useForm({
    defaultValues: {
        vehicle_type: "",
        vehicle_make: "",
        vehicle_number: "",
        driver_name: "",
        detected_fault: "",
        mechanic_name: "",
        mechanic_phone: "",
        cost_of_maintenance: "",
        initial_payment: ""
    },
  });

  const onSubmit = (data) => {
    createPost({
      body: {
        ...data,
        id: user.id,
      },
    });
  };
  
  return (
    <DetailView
      isLoading={isLoading}
      pageTitle="Vehicle Maintenance"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
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
            label="Driver Name "
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
      </Row>
      <Row className="mb-0 mb-sm-4">
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
      </Row>
      <Row className="mb-0 mb-sm-4">
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

export default VehicleMaintenance;
