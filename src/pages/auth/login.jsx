import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/buttons/button";
import AuthInput from "../../components/inputs/auth-input";
import { useForm } from "react-formid";
// import AuthSelect from "../../components/inputs/auth-select";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const { inputs, handleSubmit, handleChange, errors } = useForm({
    defaultValues: { username: "", password: "" },
    validation: {
      password: {
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
    },
  });

  const { login, loginLoading } = useAuth();

  const onSubmit = async (data) => {
    await login({ email: data.username, password: "12345678" });
  };
  return (
    <div className="login-page">
      <div className="page-content-wrapper">
        <h3 className="page-title">Welcome!</h3>
        <p className="page-subtitle">Enter details to login.</p>
        <form
          className="form-wrapper"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
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
          {/* <div>
            <AuthSelect
              value={inputs.role}
              name="role"
              onChange={handleChange}
              options={[
                { value: "super-admin", title: "Super Admin" },
                { value: "admin", title: "Admin" },
                { value: "principal", title: "Principal" },
                { value: "teacher", title: "Teacher" },
                { value: "alumni", title: "Alumni (Old Student)" },
                { value: "student", title: "Student" },
                { value: "accountant", title: "Accountant" },
                { value: "store-keeper", title: "Store Keeper" },
                { value: "manage-portal", title: "Manage Portal" },
              ]}
            />
          </div> */}
          <div className="form-group">
            <Link to="/" className="forgot-password-text">
              Forgot PASSWORD?
            </Link>
          </div>
          <div className="form-group">
            <Button
              block
              disabled={loginLoading}
              isLoading={loginLoading}
              type="submit"
            >
              Log In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
