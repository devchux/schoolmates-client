import React, { useEffect } from "react";
import { useForm } from "react-formid";
import { Col, Row } from "reactstrap";
import validator from "validator";
import { isValidPhoneNumber } from "react-phone-number-input";
import AuthInput from "../../../components/inputs/auth-input";
import { useCampus } from "../../../hooks/useCampus";
import DetailView from "../../../components/views/detail-view";

const CampusDetail = () => {
  const {
    getFieldProps,
    inputs,
    setFieldValue,
    handleSubmit,
    errors,
    setInputs,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneno: "+234",
      address: "",
      state: "",
    },
    validation: {
      name: {
        required: (val) => !!val || "Campus name is required",
      },
      email: {
        required: (val) => !!val || "Email address is required",
        isValid: (val) => validator.isEmail(val) || "Email address is invalid",
      },
      address: {
        required: (val) => !!val || "Address is required",
      },
      phoneNumber: {
        required: (val) => !!val || "Phone number is required",
        isValid: (val) =>
          (typeof val === "string" && isValidPhoneNumber(val)) ||
          "Phone number is invalid",
      },
      state: {
        required: (val) => !!val || "State is required",
      },
    },
  });

  const { addCampus, isLoading, updateCampus, campusData, isEdit } =
    useCampus();

  const onSubmit = async (data) => {
    if (isEdit) {
      return await updateCampus(data);
    }
    await addCampus(data);
  };

  useEffect(() => {
    if (campusData) {
      setInputs({ ...inputs, ...campusData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campusData]);

  return (
    <DetailView
      isLoading={isLoading}
      cancelLink="/app/campus"
      pageTitle={isEdit ? "Edit Campus" : "Add Campus"}
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Campus Name"
            hasError={!!errors.name}
            {...getFieldProps("name")}
          />
          {!!errors.name && <p className="error-message">{errors.name}</p>}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Email Address"
            hasError={!!errors.email}
            {...getFieldProps("email")}
          />
          {!!errors.email && <p className="error-message">{errors.email}</p>}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            isPhone
            label="Phone Number"
            value={inputs.phoneno}
            hasError={!!errors.phoneno}
            onChange={(value) => setFieldValue("phoneno", value || "")}
          />
          {!!errors.phoneno && (
            <p className="error-message">{errors.phoneno}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Address"
            hasError={!!errors.address}
            {...getFieldProps("address")}
          />
          {!!errors.address && (
            <p className="error-message">{errors.address}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="State"
            hasError={!!errors.state}
            {...getFieldProps("state")}
          />
          {!!errors.state && <p className="error-message">{errors.state}</p>}
        </Col>
      </Row>
    </DetailView>
  );
};

export default CampusDetail;
