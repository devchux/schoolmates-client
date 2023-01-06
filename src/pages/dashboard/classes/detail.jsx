import React, { useEffect } from "react";
import { useForm } from "react-formid";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import DetailView from "../../../components/views/detail-view";
import { useClasses } from "../../../hooks/useClasses";

const ClassDetail = () => {
  const { isLoading, isEdit, onUpdateClass, addClass, classData } =
    useClasses();
  const {
    getFieldProps,
    inputs,
    setFieldValue,
    handleSubmit,
    errors,
    setInputs,
  } = useForm({
    defaultValues: {
      class_name: "",
      subclasses: [],
    },
    validation: {
      class_name: {
        required: (val) => !!val || "Campus name is required",
      },
    },
  });

  const onSubmit = async (data) => {
    if (isEdit) {
      return await onUpdateClass(data);
    }
    await addClass(data);
  };

  useEffect(() => {
    if (classData) {
      setInputs({ ...inputs, ...classData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classData]);
  return (
    <DetailView
      isLoading={isLoading}
      cancelLink="/app/campus"
      pageTitle={isEdit ? "Edit Class" : "Add Class"}
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Class Name"
            hasError={!!errors.class_name}
            {...getFieldProps("class_name")}
          />
          {!!errors.class_name && (
            <p className="error-message">{errors.class_name}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            isMulti
            label="Sub Classes (Click enter after typing sub class to register)"
            value={inputs.subclasses}
            onChange={(value) => setFieldValue("subclasses", value)}
          />
        </Col>
      </Row>
    </DetailView>
  );
};

export default ClassDetail;
