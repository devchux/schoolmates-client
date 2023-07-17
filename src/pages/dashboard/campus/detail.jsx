import React, { useEffect } from "react";
import { Col, Input, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import { useCampus } from "../../../hooks/useCampus";
import DetailView from "../../../components/views/detail-view";
import ImagePreview from "../../../components/common/image-preview";

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
    handleImageChange,
    filePreview,
    resetFile,
    base64String,
    fileRef,
  } = useCampus();

  const onSubmit = async (data) => {
    const image = isEdit
      ? base64String
        ? base64String
        : campusData.image
      : base64String;
    if (isEdit) {
      return await updateCampus({ ...data, image });
    }
    await addCampus({ ...data, image });
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
      <div className="mb-4 d-flex align-items-center">
        <p>Check if campus is pre-school</p>
        <Input
          type="checkbox"
          className="ms-3"
          checked={inputs.is_preschool === "true"}
          onChange={() =>
            setFieldValue(
              "is_preschool",
              inputs.is_preschool === "true" ? "true" : "false"
            )
          }
        />
      </div>
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
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="file"
            className="px-0"
            wrapperClassName="border-0"
            label="Profile Image"
            onChange={handleImageChange}
            ref={fileRef}
          />
        </Col>
      </Row>
      <ImagePreview
        src={filePreview || campusData?.image}
        centered
        wrapperClassName="my-5"
        reset={resetFile}
      />
    </DetailView>
  );
};

export default CampusDetail;
