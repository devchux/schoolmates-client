import React from "react";
import { useForm } from "react-formid";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import validator from "validator";
import { isValidPhoneNumber } from "react-phone-number-input";
import ButtonGroup from "../../../components/buttons/button-group";
import GoBack from "../../../components/common/go-back";
import PageSheet from "../../../components/common/page-sheet";
import PageTitle from "../../../components/common/title";
import AuthInput from "../../../components/inputs/auth-input";
import { useCampus } from "../../../hooks/useCampus";

const CampusDetail = () => {
  const navigate = useNavigate();
  const { getFieldProps, inputs, setFieldValue, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneno: "+234",
      address: "",
      state: "",
    },
    validation: {
      name: {
        required: (val) => !!val || "Campus name is required",
      },
      email: {
        required: (val) => !!val || "Email address is required",
        isValid: (val) => validator.isEmail(val) || "Email address is invalid",
      },
      address: {
        required: (val) => !!val || "Address is required",
      },
      phoneNumber: {
        required: (val) => !!val || "Phone number is required",
        isValid: (val) =>
          (typeof val === "string" && isValidPhoneNumber(val)) ||
          "Phone number is invalid",
      },
      state: {
        required: (val) => !!val || "State is required",
      },
    },
  });

  const { addCampus, isLoading } = useCampus();

  const onSubmit = async (data) => {
    await addCampus(data);
  };
  return (
    <div>
      <GoBack />
      <PageSheet>
        <PageTitle>Add Campus</PageTitle>
        <form
          className="form-wrapper"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Row className="mb-0 mb-sm-4">
            <Col sm="6" className="mb-4 mb-sm-0">
              <AuthInput label="Campus Name" {...getFieldProps("name")} />
            </Col>
            <Col sm="6" className="mb-4 mb-sm-0">
              <AuthInput label="Email Address" {...getFieldProps("email")} />
            </Col>
          </Row>
          <Row className="mb-0 mb-sm-4">
            <Col sm="6" className="mb-4 mb-sm-0">
              <AuthInput
                isPhone
                label="Phone Number"
                value={inputs.phoneno}
                onChange={(value) => setFieldValue("phoneno", value || "")}
              />
            </Col>
            <Col sm="6" className="mb-4 mb-sm-0">
              <AuthInput label="Address" {...getFieldProps("address")} />
            </Col>
          </Row>
          <Row className="mb-0 mb-sm-4">
            <Col sm="6" className="mb-4 mb-sm-0">
              <AuthInput label="State" {...getFieldProps("state")} />
            </Col>
          </Row>
          <div className="mb-5 d-flex justify-content-end">
            <ButtonGroup
              options={[
                {
                  title: "Cancel",
                  variant: "outline",
                  onClick: () => navigate("/app/campus"),
                },
                { title: "Save", type: "submit", isLoading },
              ]}
            />
          </div>
        </form>
      </PageSheet>
    </div>
  );
};

export default CampusDetail;
