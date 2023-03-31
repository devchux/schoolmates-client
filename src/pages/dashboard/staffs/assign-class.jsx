import React from "react";
import { useForm } from "react-formid";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import AuthSelect from "../../../components/inputs/auth-select";
import DetailView from "../../../components/views/detail-view";
import { useClasses } from "../../../hooks/useClasses";
import { useStaff } from "../../../hooks/useStaff";

const AssignClass = () => {
  const { handleSubmit, errors, inputs, handleChange, setFieldValue } = useForm(
    {
      defaultValues: {
        class_assigned: "",
        sub_class: "",
      },
      validation: {
        class_assigned: { required: true },
        sub_class: { required: true },
      },
    }
  );

  const { assignClass, isLoading, staffData } = useStaff();

  const { classes } = useClasses();

  const onSubmit = (data) => {
    if (staffData.designation_id !== "4")
      return toast.error("Staff is not a teacher");
    assignClass({
      staff_id: staffData.id,
      body: data,
    });
  };

  return (
    <DetailView
      isLoading={isLoading}
      cancelLink="/app/classes"
      pageTitle="Assign Class"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="my-5">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthSelect
            label="Class"
            value={inputs.class_assigned}
            name="class_assigned"
            hasError={!!errors.class_assigned}
            onChange={(e) => {
              handleChange(e);
              setFieldValue("sub_class", "");
            }}
            options={(classes || []).map((x) => ({
              value: x?.class_name,
              title: x?.class_name,
            }))}
          />
          {!!errors.class_assigned && (
            <p className="error-message">{errors.class_assigned}</p>
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
              ?.find((x) => x.class_name === inputs.class_assigned)
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

export default AssignClass;
