import React from "react";
import DetailView from "../../../components/views/detail-view";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import { usePreSchool } from "../../../hooks/usePreSchool";
import { useForm } from "react-formid";

const PreSchoolDetail = () => {
  const { getFieldProps, errors, handleSubmit } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const { isLoading, createPreSchool } = usePreSchool();

  const onSubmit = async (data) => {
    await createPreSchool(data);
  };
  return (
    <DetailView
      isLoading={isLoading}
      pageTitle="Create Pre School"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Name"
            hasError={!!errors.name}
            {...getFieldProps("name")}
          />
          {!!errors.name && <p className="error-message">{errors.name}</p>}
        </Col>
      </Row>
    </DetailView>
  );
};

export default PreSchoolDetail;
