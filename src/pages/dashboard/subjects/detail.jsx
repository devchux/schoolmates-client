import React from "react";
import { useForm } from "react-formid";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import AuthSelect from "../../../components/inputs/auth-select";
import DetailView from "../../../components/views/detail-view";
import { useClasses } from "../../../hooks/useClasses";
import { useSubject } from "../../../hooks/useSubjects";

const SubjectDetail = () => {
  const { isLoading, addSubject, subjectData } = useSubject();

  const { classes } = useClasses();
  const { handleSubmit, inputs, errors, handleChange, getFieldProps } = useForm(
    {
      defaultValues: {
        class_name: "",
        subject: "",
      },
    }
  );

  console.log(subjectData);

  const onSubmit = (data) => {
    addSubject(data);
  };
  return (
    <DetailView
      isLoading={isLoading}
      cancelLink="/app/subjects"
      pageTitle="Create Subject"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="my-5">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthSelect
            label="Class"
            value={inputs.class_name}
            name="class_name"
            hasError={!!errors.class_name}
            onChange={handleChange}
            options={(classes || []).map((x) => ({
              value: x?.class_name,
              title: x?.class_name,
            }))}
          />
          {!!errors.class_name && (
            <p className="error-message">{errors.class_name}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Subject"
            hasError={!!errors.subject}
            {...getFieldProps("subject")}
          />
          {!!errors.subject && (
            <p className="error-message">{errors.subject}</p>
          )}
        </Col>
      </Row>
    </DetailView>
  );
};

export default SubjectDetail;
