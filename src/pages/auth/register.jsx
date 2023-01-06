import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/buttons/button";
import AuthInput from "../../components/inputs/auth-input";
import { useForm } from "react-formid";
import validator from "validator";
import { isValidPhoneNumber } from "react-phone-number-input";

const Register = () => {
  const navigate = useNavigate();
  const { inputs, handleSubmit, handleChange, errors, setFieldValue } = useForm(
    {
      defaultValues: {
        username: "",
        password: "",
        schoolName: "",
        email: "",
        phoneNumber: "+234",
        confirmPassword: "",
      },
      validation: {
        schoolName: {
          required: (val) => !!val || "School name is required",
        },
        email: {
          required: (val) => !!val || "Email address is required",
          isValid: (val) =>
            validator.isEmail(val) || "Email address is invalid",
        },
        username: {
          required: (val) => !!val || "Username is required",
        },
        phoneNumber: {
          required: (val) => !!val || "Phone number is required",
          isValid: (val) =>
            (typeof val === "string" && isValidPhoneNumber(val)) ||
            "Phone number is invalid",
        },
        password: {
          required: (val) => !!val || "Password is required",
          hasMoreThan6Chars: (val) =>
            val.length >= 8 || "Please enter 8 or more characters",
        },
        confirmPassword: {
          shouldMatch: (val, { password }) =>
            val === password || "Passwords do not match",
        },
      },
    }
  );

  const onSubmit = (data) => {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    document.cookie = `username=${data.username}; expires=${d.toUTCString()}`;
    navigate("/");
  };
  return (
    <div className="login-page register-page">
      <div className="page-content-wrapper">
        <h3 className="page-title">Sign Up</h3>
        <p className="page-subtitle">Enter details to register.</p>
        <form
          className="form-wrapper"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <AuthInput
              type="text"
              placeholder="School Name"
              hasError={!!errors.schoolName}
              value={inputs.schoolName}
              name="schoolName"
              onChange={handleChange}
            />
            {!!errors.schoolName && (
              <p className="error-message">{errors.schoolName}</p>
            )}
          </div>
          <div className="form-group">
            <AuthInput
              type="text"
              placeholder="Username"
              hasError={!!errors.username}
              value={inputs.username}
              name="username"
              onChange={handleChange}
            />
            {!!errors.username && (
              <p className="error-message">{errors.username}</p>
            )}
          </div>
          <div className="form-group">
            <AuthInput
              type="email"
              placeholder="Email Address"
              hasError={!!errors.email}
              value={inputs.email}
              name="email"
              onChange={handleChange}
            />
            {!!errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div>
            <AuthInput
              isPhone
              value={inputs.phoneNumber}
              onChange={(value) => setFieldValue("phoneNumber", value || '')}
            />
          </div>
          <div className="form-group">
            <AuthInput
              type="password"
              placeholder="Password"
              hasError={!!errors.password}
              value={inputs.password}
              name="password"
              onChange={handleChange}
            />
            {!!errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>
          <div className="form-group">
            <AuthInput
              type="password"
              placeholder="Confirm Password"
              hasError={!!errors.confirmPassword}
              value={inputs.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
            />
            {!!errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="form-group">
            <Link to="/auth" className="forgot-password-text">
              Sign in?
            </Link>
          </div>
          <div className="form-group">
            <Button block type="submit">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
