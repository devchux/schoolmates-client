import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/buttons/button";
import AuthInput from "../../components/inputs/auth-input";
import { useForm } from "react-formid";
import validator from "validator";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const { inputs, handleSubmit, handleChange, errors, setFieldValue } = useForm(
    {
      defaultValues: {
        username: "",
        password: "",
        name: "",
        email: "",
        phoneno: "+234",
        password_confirmation: "",
      },
      validation: {
        name: {
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
        phoneno: {
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
        password_confirmation: {
          shouldMatch: (val, { password }) =>
            val === password || "Passwords do not match",
        },
      },
    }
  );

  const { register, isLoading } = useAuth();

  const onSubmit = async (data) => {
    await register(data);
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
              hasError={!!errors.name}
              value={inputs.name}
              name="name"
              onChange={handleChange}
            />
            {!!errors.name && <p className="error-message">{errors.name}</p>}
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
          <div className="form-group">
            <AuthInput
              isPhone
              value={inputs.phoneno}
              onChange={(value) => setFieldValue("phoneno", value || "")}
            />
            {!!errors.phoneno && <p className="error-message">{errors.phoneno}</p>}
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
              hasError={!!errors.password_confirmation}
              value={inputs.password_confirmation}
              name="password_confirmation"
              onChange={handleChange}
            />
            {!!errors.password_confirmation && (
              <p className="error-message">{errors.password_confirmation}</p>
            )}
          </div>
          <div className="form-group">
            <Link to="/auth" className="forgot-password-text">
              Sign in?
            </Link>
          </div>
          <div className="form-group">
            <Button
              block
              isLoading={isLoading}
              disabled={isLoading}
              type="submit"
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
