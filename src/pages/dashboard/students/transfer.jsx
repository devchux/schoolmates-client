import React, { useEffect } from "react";
import { useForm } from "react-formid";
import { Col, Row } from "reactstrap";
import AuthSelect from "../../../components/inputs/auth-select";
import DetailView from "../../../components/views/detail-view";
import { useCampus } from "../../../hooks/useCampus";
import { useClasses } from "../../../hooks/useClasses";
import { useStudent } from "../../../hooks/useStudent";

const TransferStudent = () => {
  const {
    isLoading: studentLoading,
    studentData,
    transferStudent,
  } = useStudent();
  const { campusList, isLoading: campusLoading } = useCampus();

  const { classes, isLoading: classesLoading } = useClasses();
  const {
    handleSubmit,
    setInputs,
    inputs,
    errors,
    handleChange,
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
        present_class: studentData?.present_class,
        sub_class: studentData?.sub_class,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentData]);

  const onSubmit = (data) => {
    transferStudent({
      id: studentData?.id,
      ...data,
    });
  };

  const isLoading = campusLoading || classesLoading || studentLoading;

  return (
    <DetailView
      isLoading={isLoading}
      cancelLink="/app/students"
      pageTitle="Transfer Student"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="my-5">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthSelect
            label="Campus"
            value={inputs.campus}
            name="campus"
            hasError={!!errors.campus}
            onChange={handleChange}
            options={(campusList || []).map((x) => ({
              value: x?.name,
              title: x?.name,
            }))}
          />
          {!!errors.campus && <p className="error-message">{errors.campus}</p>}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthSelect
            label="Present Class"
            value={inputs.present_class}
            name="present_class"
            hasError={!!errors.present_class}
            onChange={(e) => {
              setInputs({
                ...inputs,
                present_class: e.target.value,
                sub_class: "",
              });
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
      </Row>
      <Row className="my-5">
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

export default TransferStudent;
