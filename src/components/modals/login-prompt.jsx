import React from "react";
import { useForm } from "react-formid";
import { useAppContext } from "../../hooks/useAppContext";
import { useAuth } from "../../hooks/useAuth";
import AuthInput from "../inputs/auth-input";
import Prompt from "./prompt";

const LoginPrompt = () => {
  const { loginPrompt, toggleLoginPrompt, user } = useAppContext();
  const { inputs, handleSubmit, handleChange, errors } = useForm({
    defaultValues: { password: "" },
    validation: {
      password: {
        required: true,
      },
    },
  });

  const { login, isLoading } = useAuth();

  const onSubmit = (data) => {
    login({ ...data, username: user.username }).then(() => toggleLoginPrompt());
  };

  return (
    <Prompt
      isOpen={loginPrompt}
      toggle={toggleLoginPrompt}
      singleButtonProps={{
        type: "button",
        isLoading,
        disabled: isLoading,
        onClick: handleSubmit(onSubmit),
      }}
      singleButtonText="Continue"
      promptHeader="Session Expired"
    >
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
    </Prompt>
  );
};

export default LoginPrompt;
