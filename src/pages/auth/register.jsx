import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/buttons/button";
import AuthInput from "../../components/inputs/auth-input";
import { useForm } from "react-formid";

const Register = () => {
  const navigate = useNavigate();
  const { inputs, handleSubmit, handleChange, errors } = useForm({
    defaultValues: {
      username: "",
      password: "",
      schoolName: "",
      email: "",
      phoneNumber: "",
      confirmPassword: "",
    },
    validation: {
      schoolName: {
        required: (val) => !!val || "School name is required",
      },
      email: {
        required: (val) => !!val || "Email address is required",
        isValid: (val) =>
          /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
            val
          ) || "Email address is invalid",
      },
      username: {
        required: (val) => !!val || "Username is required",
      },
      password: {
        required: (val) => !!val || "Password is required",
        hasMoreThan6Chars: (val) =>
          val.length >= 6 || "Please enter 6 or more characters",
        hasCapsChars: (val) =>
          /[A-Z]/.test(val) || "Please enter at least one capital letter",
        hasLowercaseChars: (val) =>
          /[a-z]/.test(val) || "Please enter at least one lowercase letter",
        hasNumChars: (val) =>
          /[0-9]/.test(val) || "Please enter at least one number",
        hasSpecialChars: (val) =>
          /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val) ||
          "Please enter at least one special character",
      },
      confirmPassword: {
        shouldMatch: (val, { password }) =>
          val === password || "Passwords do not match",
      },
    },
  });

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
