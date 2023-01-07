import React, { useEffect } from "react";
import { useForm } from "react-formid";
import { Col, Row } from "reactstrap";
import validator from "validator";
import { isValidPhoneNumber } from "react-phone-number-input";
import AuthInput from "../../../components/inputs/auth-input";
import { useStaff } from "../../../hooks/useStaff";
import DetailView from "../../../components/views/detail-view";
import AuthSelect from "../../../components/inputs/auth-select";
import { roleMap } from "../../../utils/constants";

const StaffDetail = () => {
  const {
    getFieldProps,
    inputs,
    setFieldValue,
    handleSubmit,
    errors,
    setInputs,
    handleChange,
  } = useForm({
    defaultValues: {
      designation_id: "",
      department: "",
      surname: "",
      firstname: "",
      middlename: "",
      username: "",
      email: "",
      phoneno: "",
      address: "",
      image: "",
      file: null,
      password: "",
      password_confirmation: "",
    },
    validation: {
      surname: { required: true },
      firstname: { required: true },
      middlename: { required: true },
      username: { required: true },
      address: { required: true },
      phoneno: {
        required: (val) => !!val || "Phone number is required",
        isValid: (val) =>
          (typeof val === "string" && isValidPhoneNumber(val)) ||
          "Phone number is invalid",
      },
      email: {
        required: (val) => !!val || "Email address is required",
        isValid: (val) => validator.isEmail(val) || "Email address is invalid",
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
  });

  const {
    addStaff,
    isLoading,
    onUpdateStaff,
    staffData,
    isEdit,
    designations,
  } = useStaff();

  const onSubmit = async (data) => {
    if (isEdit) {
      return await onUpdateStaff(data);
    }
    await addStaff(data);
  };

  useEffect(() => {
    if (staffData) {
      setInputs({ ...inputs, ...staffData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffData]);

  return (
    <DetailView
      isLoading={isLoading}
      cancelLink="/app/staff"
      pageTitle={isEdit ? "Edit Staff" : "Add Staff"}
      onFormSubmit={handleSubmit(onSubmit)}
    >
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
          <AuthInput
            type="password"
            label="Password"
            hasError={!!errors.password}
            value={inputs.password}
            name="password"
            onChange={handleChange}
          />
          {!!errors.firstname && (
            <p className="error-message">{errors.firstname}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="password"
            label="Confirm Password"
            hasError={!!errors.password_confirmation}
            value={inputs.password_confirmation}
            name="password_confirmation"
            onChange={handleChange}
          />
          {!!errors.password_confirmation && (
            <p className="error-message">{errors.password_confirmation}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="file"
            className="px-0"
            wrapperClassName="border-0"
            label="Profile Image"
            name="file"
            hasError={!!errors.file}
            onChange={({ target: { files } }) =>
              setFieldValue("file", files[0])
            }
          />
          {!!errors.file && <p className="error-message">{errors.file}</p>}
        </Col>
      </Row>
    </DetailView>
  );
};

export default StaffDetail;
