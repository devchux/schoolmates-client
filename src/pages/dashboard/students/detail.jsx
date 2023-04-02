import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import { useStudent } from "../../../hooks/useStudent";
import DetailView from "../../../components/views/detail-view";
import AuthSelect from "../../../components/inputs/auth-select";
import { useClasses } from "../../../hooks/useClasses";
import { countryListSelect } from "../../../utils/constants";
import { useAppContext } from "../../../hooks/useAppContext";
import ImagePreview from "../../../components/common/image-preview";
import Button from "../../../components/buttons/button";
import {
  faMinusCircle,
  faPlusCircle,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Prompt from "../../../components/modals/prompt";

const StudentDetail = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);
  const {
    addStudent,
    isLoading,
    onUpdateStudent,
    studentData,
    isEdit,
    getFieldProps,
    inputs,
    setFieldValue,
    handleSubmit,
    errors,
    setInputs,
    handleChange,
    handleImageChange,
    filePreview,
    base64String,
    resetFile,
    fileRef,
    withdrawStudent,
    acceptStudent,
    graduateStudent,
  } = useStudent();

  const { classes } = useClasses();

  const {
    apiServices: { formatDate, handleSessionChange },
  } = useAppContext();

  const onSubmit = async (data) => {
    const image = isEdit
      ? base64String
        ? base64String
        : studentData.image
      : base64String;
    if (isEdit) {
      return await onUpdateStudent({
        ...data,
        image,
        dob: formatDate(data.dob, "DD-MM-YYYY"),
      });
    }
    await addStudent({
      ...data,
      image,
      password: "12345678",
      password_confirmation: "12345678",
      dob: formatDate(data.dob, "DD-MM-YYYY"),
    });
  };

  const studentStatus = () => {
    switch (studentData?.status) {
      case "withdrawn":
        return {
          icon: faPlusCircle,
          text: "Accept",
          variant: "outline-dark",
          action: async () =>
            studentData?.id && (await acceptStudent({ id: studentData.id })),
        };

      default:
        return {
          icon: faMinusCircle,
          text: "Withdraw",
          variant: "dark",
          action: async () =>
            studentData?.id && (await withdrawStudent({ id: studentData.id })),
        };
    }
  };

  useEffect(() => {
    if (studentData) {
      setInputs({
        ...inputs,
        ...studentData,
        dob: formatDate(studentData?.dob, "YY-MM-DD"),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentData]);

  return (
    <DetailView
      isLoading={isLoading}
      cancelLink="/app/students"
      pageTitle={isEdit ? "Edit Student" : "Add Student"}
      onFormSubmit={handleSubmit(onSubmit)}
    >
      {isEdit && (
        <div className="mb-5 d-flex justify-content-end gap-3">
          <Button
            type="button"
            disabled={isLoading}
            isLoading={isLoading}
            variant={studentStatus().variant}
            onClick={toggleModal}
          >
            <FontAwesomeIcon icon={studentStatus().icon} className="me-2" />{" "}
            {studentStatus().text}
          </Button>
          {studentData?.status !== "graduated" && (
            <Button
              type="button"
              disabled={isLoading}
              isLoading={isLoading}
              variant="dark"
              onClick={() => graduateStudent({ id: studentData.id })}
            >
              <FontAwesomeIcon icon={faUserGraduate} className="me-2" />{" "}
              Graduate Student
            </Button>
          )}
        </div>
      )}

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
            hasError={!!errors.email_address}
            {...getFieldProps("email_address")}
          />
          {!!errors.email_address && (
            <p className="error-message">{errors.email_address}</p>
          )}
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
            label="Admission Number"
            hasError={!!errors.admission_number}
            {...getFieldProps("admission_number")}
          />
          {!!errors.admission_number && (
            <p className="error-message">{errors.admission_number}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            isPhone
            label="Phone Number"
            value={inputs.phone_number}
            hasError={!!errors.phone_number}
            onChange={(value) => setFieldValue("phone_number", value || "")}
          />
          {!!errors.phone_number && (
            <p className="error-message">{errors.phone_number}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Address"
            hasError={!!errors.home_address}
            {...getFieldProps("home_address")}
          />
          {!!errors.home_address && (
            <p className="error-message">{errors.home_address}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthSelect
            label="Nationality"
            value={inputs.nationality}
            name="nationality"
            hasError={!!errors.nationality}
            onChange={handleChange}
            options={countryListSelect}
          />
          {!!errors.nationality && (
            <p className="error-message">{errors.nationality}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="State"
            hasError={!!errors.state}
            {...getFieldProps("state")}
          />
          {!!errors.state && <p className="error-message">{errors.state}</p>}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthSelect
            label="Genotype"
            value={inputs.genotype}
            name="genotype"
            hasError={!!errors.genotype}
            onChange={handleChange}
            options={[
              { value: "AA", title: "AA" },
              { value: "AS", title: "AS" },
              { value: "AC", title: "AC" },
              { value: "SS", title: "SS" },
              { value: "SC", title: "SC" },
            ]}
          />
          {!!errors.genotype && (
            <p className="error-message">{errors.genotype}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthSelect
            label="Blood Group"
            value={inputs.blood_group}
            name="blood_group"
            hasError={!!errors.blood_group}
            onChange={handleChange}
            options={[
              { value: "A+", title: "A+" },
              { value: "A-", title: "A-" },
              { value: "B+", title: "B+" },
              { value: "B-", title: "B-" },
              { value: "O+", title: "O+" },
              { value: "O-", title: "O-" },
              { value: "AB+", title: "AB+" },
              { value: "AB-", title: "AB-" },
            ]}
          />
          {!!errors.blood_group && (
            <p className="error-message">{errors.blood_group}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthSelect
            label="Gender"
            value={inputs.gender}
            name="gender"
            hasError={!!errors.gender}
            onChange={handleChange}
            options={[
              { value: "female", title: "Female" },
              { value: "male", title: "Male" },
            ]}
          />
          {!!errors.gender && <p className="error-message">{errors.gender}</p>}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Date of Birth"
            type="date"
            hasError={!!errors.dob}
            {...getFieldProps("dob")}
          />
          {!!errors.dob && <p className="error-message">{errors.dob}</p>}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Session Admitted"
            placeholder="2021/2022"
            hasError={!!errors.session_admitted}
            value={inputs.session_admitted}
            onChange={({ target: { value } }) =>
              handleSessionChange(value, "session_admitted", setFieldValue)
            }
          />
          {!!errors.session_admitted && (
            <p className="error-message">{errors.session_admitted}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthSelect
            label="Present Class"
            value={inputs.present_class}
            name="present_class"
            hasError={!!errors.present_class}
            onChange={(e) => {
              handleChange(e)
              setFieldValue("sub_class", "");}}
            options={(classes || []).map((x) => ({
              value: x?.class_name,
              title: x?.class_name,
            }))}
          />
          {!!errors.present_class && (
            <p className="error-message">{errors.present_class}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthSelect
            label="Class"
            value={inputs.class}
            name="class"
            hasError={!!errors.class}
            onChange={(e) => {
              handleChange(e);
            }}
            options={(classes || []).map((x) => ({
              value: x?.class_name,
              title: x?.class_name,
            }))}
          />
          {!!errors.class && <p className="error-message">{errors.class}</p>}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            type="file"
            className="px-0"
            wrapperClassName="border-0"
            label="Profile Image"
            onChange={handleImageChange}
            ref={fileRef}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthSelect
            label="Sub_class"
            value={inputs.sub_class}
            name="sub_class"
            hasError={!!errors.sub_class}
            onChange={handleChange}
            options={classes
              ?.find((x) => x.class_name === inputs.present_class)
              ?.sub_class?.split(",")
              ?.map((x) => ({
                value: x,
                title: x,
              }))}
          />
          {!!errors.sub_class && (
            <p className="error-message">{errors.sub_class}</p>
          )}
        </Col>
      </Row>
      <ImagePreview
        src={filePreview || studentData?.image}
        centered
        wrapperClassName="my-5"
        reset={resetFile}
      />
      <Prompt
        hasGroupedButtons
        groupedButtonProps={[
          { title: "Cancel", onClick: toggleModal, variant: "outline" },
          {
            title: "Proceed",
            onClick: async () => {
              await studentStatus().action();
              toggleModal();
            },
          },
        ]}
        isOpen={modalOpen}
        toggle={toggleModal}
      >
        <p style={{ fontSize: "1.6rem" }}>
          Are you sure you want{" "}
          {studentData?.status === "withdrawn" ? "admit" : "withdraw"}{" "}
          {studentData?.firstname} ({studentData?.username})?
        </p>
      </Prompt>
    </DetailView>
  );
};

export default StudentDetail;
