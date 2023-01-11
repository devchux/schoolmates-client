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
      pageTitle="Change Password"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="password"
            label="Old Password"
            hasError={!!errors.old_password}
            value={inputs.old_password}
            name="old_password"
            onChange={handleChange}
          />
          {!!errors.old_password && (
            <p className="error-message">{errors.old_password}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="password"
            label="New Password"
            hasError={!!errors.new_password}
            value={inputs.new_password}
            name="new_password"
            onChange={handleChange}
          />
          {!!errors.new_password && (
            <p className="error-message">{errors.new_password}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="password"
            label="Confirm New Password"
            hasError={!!errors.confirm_password}
            value={inputs.confirm_password}
            name="confirm_password"
            onChange={handleChange}
          />
          {!!errors.confirm_password && (
            <p className="error-message">{errors.confirm_password}</p>
          )}
        </Col>
      </Row>
    </DetailView>
  );
};

export default ChangePassword;
