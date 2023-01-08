import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import { useCampus } from "../../../hooks/useCampus";
import DetailView from "../../../components/views/detail-view";

const CampusDetail = () => {
  const {
    addCampus,
    isLoading,
    updateCampus,
    campusData,
    isEdit,
    getFieldProps,
    inputs,
    setFieldValue,
    handleSubmit,
    errors,
    setInputs,
  } = useCampus();

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
