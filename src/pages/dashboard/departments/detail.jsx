import React, { useEffect } from "react";
import { useForm } from "react-formid";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import DetailView from "../../../components/views/detail-view";
import { useDepartments } from "../../../hooks/useDepartments";

const DepartmentDetail = () => {
  const {
    createDepartment,
    isLoading,
    departmentData,
    isEdit,
    updateDepartment,
  } = useDepartments();
  const { handleSubmit, getFieldProps, errors, setInputs, inputs } = useForm({
    defaultValues: {
      department_id: "",
      department_name: "",
    },
    validation: {
      department_id: {
        required: true,
      },
      department_name: {
        required: true,
      },
    },
  });

  const onSubmit = (data) => {
    if (isEdit) {
      return updateDepartment({
        id: departmentData.id,
        ...data,
      });
    }
    createDepartment(data);
  };

  useEffect(() => {
    if (departmentData) {
      setInputs({
        ...inputs,
        department_id: departmentData.department_id,
        department_name: departmentData.department_name,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentData]);

  return (
    <DetailView
      isLoading={isLoading}
      cancelLink="/app/departments"
      pageTitle="Create Department"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Department ID"
            hasError={!!errors.department_id}
            {...getFieldProps("department_id")}
          />
          {!!errors.department_id && (
            <p className="error-message">{errors.department_id}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Department Name"
            hasError={!!errors.department_name}
            {...getFieldProps("department_name")}
          />
          {!!errors.department_name && (
            <p className="error-message">{errors.department_name}</p>
          )}
        </Col>
      </Row>
    </DetailView>
  );
};

export default DepartmentDetail;
