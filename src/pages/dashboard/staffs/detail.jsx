import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import { useStaff } from "../../../hooks/useStaff";
import DetailView from "../../../components/views/detail-view";
import AuthSelect from "../../../components/inputs/auth-select";
import { roleMap } from "../../../utils/constants";
import ImagePreview from "../../../components/common/image-preview";
import { useDepartments } from "../../../hooks/useDepartments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/buttons/button";
import { useNavigate } from "react-router-dom";

const StaffDetail = () => {
  const {
    addStaff,
    isLoading: staffLoading,
    onUpdateStaff,
    staffData,
    isEdit,
    designations,
    getFieldProps,
    inputs,
    setFieldValue,
    handleSubmit,
    errors,
    setInputs,
    handleChange,
    handleImageChange,
    filePreview,
    base64String,
    resetFile,
    fileRef,
  } = useStaff();

  const navigate = useNavigate();

  const { isLoading: departmentsListLoading, departmentsList } =
    useDepartments();

  const isLoading = departmentsListLoading || staffLoading;

  const onSubmit = async (data) => {
    const image = isEdit
      ? base64String
        ? base64String
        : staffData.image
      : base64String;
    if (isEdit) {
      return await onUpdateStaff({ ...data, image });
    }
    await addStaff({ ...data, image, password: "12345678" });
  };

  useEffect(() => {
    if (staffData) {
      setInputs({
        ...inputs,
        ...staffData,
        designation: staffData?.designation_id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffData]);

  console.log(staffData)

  return (
    <DetailView
      isLoading={isLoading}
      cancelLink="/app/staffs"
      pageTitle={isEdit ? "Edit Staff" : "Add Staff"}
      onFormSubmit={handleSubmit(onSubmit)}
    >
      {isEdit && (
        <div className="mb-5 d-flex justify-content-end gap-3">
          {staffData?.designation_id === "4" && (
            <Button
              type="button"
              disabled={isLoading}
              isLoading={isLoading}
              variant="outline-dark"
              onClick={() =>
                navigate(`/app/staffs/assign-class/${staffData?.id}`)
              }
            >
              <FontAwesomeIcon icon={faHandPointer} className="me-2" /> Assign
              Class
            </Button>
          )}
        </div>
      )}
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="First Name"
            hasError={!!errors.firstname}
            {...getFieldProps("firstname")}
          />
          {!!errors.firstname && (
            <p className="error-message">{errors.firstname}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Last Name"
            hasError={!!errors.surname}
            {...getFieldProps("surname")}
          />
          {!!errors.surname && (
            <p className="error-message">{errors.surname}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Middle Name"
            hasError={!!errors.middlename}
            {...getFieldProps("middlename")}
          />
          {!!errors.middlename && (
            <p className="error-message">{errors.middlename}</p>
          )}
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
            label="Username"
            hasError={!!errors.username}
            {...getFieldProps("username")}
          />
          {!!errors.username && (
            <p className="error-message">{errors.username}</p>
          )}
        </Col>
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
      </Row>
      <Row className="mb-0 mb-sm-4">
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
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthSelect
            label="Department"
            hasError={!!errors.department}
            {...getFieldProps("department")}
            options={(departmentsList || []).map((x) => ({
              value: x?.department_name,
              title: x?.department_name,
            }))}
          />
          {!!errors.department && (
            <p className="error-message">{errors.department}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthSelect
            label="Role"
            value={inputs.designation_id}
            name="designation_id"
            hasError={!!errors.designation_id}
            onChange={handleChange}
            options={(designations?.data || []).map((x) => ({
              value: x?.id,
              title: roleMap[x?.attributes?.designation_name],
            }))}
          />
          {!!errors.designation_id && (
            <p className="error-message">{errors.designation_id}</p>
          )}
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
        src={filePreview || staffData?.image}
        centered
        wrapperClassName="my-5"
        reset={resetFile}
      />
    </DetailView>
  );
};

export default StaffDetail;
