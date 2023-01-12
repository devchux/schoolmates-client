import React from "react";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import DetailView from "../../../components/views/detail-view";
import { useChangePassword } from "../../../hooks/useChangePassword";

const ChangePassword = () => {
  const {
    inputs,
    handleChange,
    handleSubmit,
    errors,
    changePasswordLoading,
    changePassword,
  } = useChangePassword();

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
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="email"
            label="Email Address"
            hasError={!!errors.email}
            value={inputs.email}
            name="email"
            onChange={handleChange}
          />
          {!!errors.email && (
            <p className="error-message">{errors.email}</p>
          )}
        </Col>
      </Row>
    </DetailView>
  );
};

export default ChangePassword;

