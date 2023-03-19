import React, { useEffect } from "react";
import { useForm } from "react-formid";
import { Col, Row } from "reactstrap";
import AuthSelect from "../../../components/inputs/auth-select";
import DetailView from "../../../components/views/detail-view";
import { useClasses } from "../../../hooks/useClasses";
import { useStudent } from "../../../hooks/useStudent";

const PromoteStudent = () => {
  const { isLoading, studentData, promoteStudent } = useStudent();

  const { classes } = useClasses();
  const {
    handleSubmit,
    setInputs,
    inputs,
    errors,
    handleChange,
    setFieldValue,
  } = useForm({
    defaultValues: {
      campus: "",
      present_class: "",
      sub_class: "",
    },
  });

  useEffect(() => {
    if (studentData) {
      setInputs({
        ...inputs,
        campus: studentData?.campus,
        present_class: studentData?.present_class,
        sub_class: studentData?.sub_class,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentData]);

  const onSubmit = (data) => {
    promoteStudent({
      id: studentData?.id,
      ...data,
    });
  };
  return (
    <DetailView
      isLoading={isLoading}
      cancelLink="/app/students"
      pageTitle="Promote Student"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="my-5">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthSelect
            label="Present Class"
            value={inputs.present_class}
            name="present_class"
            hasError={!!errors.present_class}
            onChange={(e) => {
              handleChange(e);
              setFieldValue("sub_class", "");
            }}
            options={(classes || []).map((x) => ({
              value: x?.class_name,
              title: x?.class_name,
            }))}
          />
          {!!errors.present_class && (
            <p className="error-message">{errors.present_class}</p>
          )}
        </Col>
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
    </DetailView>
  );
};

export default PromoteStudent;
