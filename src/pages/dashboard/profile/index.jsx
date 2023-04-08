import React from "react";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import ImagePreview from "../../../components/common/image-preview";
import AuthInput from "../../../components/inputs/auth-input";
import AuthSelect from "../../../components/inputs/auth-select";
import DetailView from "../../../components/views/detail-view";
import { useDepartments } from "../../../hooks/useDepartments";
import { useProfile } from "../../../hooks/useProfile";

const Profile = () => {
  const {
    user,
    getFieldProps,
    inputs,
    handleSubmit,
    errors,
    handleChange,
    isLoading: profileLoading,
    updateProfile,
    handleImageChange,
    filePreview,
    base64String,
    fileRef,
    reset,
    convertBase64,
    setFieldValue,
  } = useProfile();

  const { isLoading: departmentsListLoading, departmentsList } =
    useDepartments();

  const isLoading = profileLoading || departmentsListLoading;

  const onSubmit = async (data) => {
    const image = base64String ? base64String : inputs.image;
    const { signature, signaturePreview, ...others } = data;
    let res = { ...others, image };
    if (["Teacher", "Principal"].includes(user.designation_name)) {
      res["signature"] = signature;
    }
    await updateProfile(res);
  };

  return (
    <DetailView
      isLoading={isLoading}
      pageTitle="My Profile"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4">
        <ImagePreview
          src={filePreview || inputs?.image}
          wrapperClassName="my-5"
          reset={reset}
        />
        <AuthInput
          type="file"
          className="px-0"
          wrapperClassName="border-0"
          onChange={handleImageChange}
          ref={fileRef}
        />
      </div>
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
            hasError={!!errors.surname}
            value={inputs.surname}
            name="new_password"
            onChange={handleChange}
          />
          {!!errors.surname && (
            <p className="error-message">{errors.surname}</p>
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
      <Row className="mb-0 mb-sm-4"></Row>
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
            name="phoneno"
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
      {["Teacher", "Principal"].includes(user.designation_name) && (
        <Row className="mb-0 mb-sm-4">
          <Col sm="6" className="mb-4 mb-sm-0">
            <ImagePreview
              src={inputs?.signaturePreview || inputs?.signature}
              wrapperClassName="mb-3 w-25 h-100"
              reset={() => {
                setFieldValue("signaturePreview", "");
                setFieldValue("signature", "");
              }}
            />
            <AuthInput
              label="Signature"
              type="file"
              className="px-0"
              wrapperClassName="border-0"
              onChange={async (e) => {
                const file = e.target.files[0];
                const file_types = ["image/png", "image/jpeg", "image/jpg"];

                if (!file) return;

                if (!file_types.includes(file.type)) {
                  toast.error(`File can either be ${file_types.join(" ")}`);
                  return;
                }

                if (file.size > 3000000) {
                  toast.error("File should not be greater than 3mb");
                  return;
                }

                const photoData = await convertBase64(file);

                setFieldValue("signaturePreview", URL.createObjectURL(file));
                setFieldValue("signature", photoData);
              }}
            />
          </Col>
        </Row>
      )}
    </DetailView>
  );
};

export default Profile;
