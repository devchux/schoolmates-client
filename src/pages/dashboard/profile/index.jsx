import React from "react";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import DetailView from "../../../components/views/detail-view";

import AuthSelect from "../../../components/inputs/auth-select";
import { roleMap } from "../../../utils/constants";
import { useChangePassword } from "../../../hooks/useChangePassword";
import { useStaff } from "../../../hooks/useStaff";

const Profile = () => {
  const {
    inputs,
    handleChange,
    handleSubmit,
    errors,
    changePasswordLoading,
    changePassword,
  } = useChangePassword();
  const {
    designations,
    getFieldProps,
  } = useStaff();

  const onSubmit = async (data) => {
    await changePassword(data);
  };

  return (
    <DetailView
      isLoading={changePasswordLoading}
      pageTitle="Profile"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="firstname"
            label="First Name"
            hasError={!!errors.firstname}
            value={inputs.firstname}
            name="firstname"
            onChange={handleChange}
          />
          {!!errors.firstname && (
            <p className="error-message">{errors.firstname}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="Surname"
            label="Surname"
            hasError={!!errors.Surname}
            value={inputs.Surname}
            name="new_password"
            onChange={handleChange}
          />
          {!!errors.Surname && (
            <p className="error-message">{errors.Surname}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="middlename"
            label="Middle Name"
            hasError={!!errors.middlename}
            value={inputs.middlename}
            name="middlename"
            onChange={handleChange}
          />
          {!!errors.middlename && (
            <p className="error-message">{errors.middlename}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="username"
            label="Username"
            hasError={!!errors.username}
            value={inputs.username}
            name="username"
            onChange={handleChange}
          />
          {!!errors.username && (
            <p className="error-message">{errors.username}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        </Row>
        <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="email"
            label="Email Address"
            hasError={!!errors.email}
            value={inputs.email}
            name="email"
            onChange={handleChange}
          />
          {!!errors.email && <p className="error-message">{errors.email}</p>}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            isPhone
            label="Phone Number"
            value={inputs.phoneno}
            hasError={!!errors.phoneno}
            onChange={handleChange}
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
          <AuthInput
            label="Department"
            hasError={!!errors.department}
            {...getFieldProps("department")}
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
          <AuthSelect
            label="Status"
            value={inputs.status}
            name="status"
            hasError={!!errors.status}
            onChange={handleChange}
            options={[
              { value: "avtive", title: "Active" },
              { value: "probation", title: "Probation" },
            ]}
          />
          {!!errors.status && <p className="error-message">{errors.status}</p>}
        </Col>
      </Row>
      
    </DetailView>
  );
};

export default Profile;
