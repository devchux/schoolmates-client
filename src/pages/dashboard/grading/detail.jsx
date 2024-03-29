import React, { useEffect } from "react";
import { useForm } from "react-formid";
import { Col, Row } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import DetailView from "../../../components/views/detail-view";
import { useGrading } from "../../../hooks/useGrading";

const GradingDetail = () => {
  const { isLoading, postGrading, singleGrading, isEdit, updateGrading } =
    useGrading();
  const { errors, getFieldProps, handleSubmit, setInputs, inputs } = useForm({
    defaultValues: {
      score_from: "",
      score_to: "",
      grade: "",
      remark: "",
    },
    validation: {
      score_from: {
        required: true,
      },
      score_to: {
        required: true,
      },
      grade: {
        required: true,
      },
      remark: {
        required: true,
      },
    },
  });

  const onSubmit = (data) => {
    if (isEdit)
      return updateGrading({
        id: singleGrading.id,
        ...data,
      });
    postGrading(data);
  };

  useEffect(() => {
    if (singleGrading) {
      setInputs({ ...inputs, ...singleGrading });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleGrading]);

  return (
    <DetailView
      isLoading={isLoading}
      pageTitle="Create Grading"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Score From"
            hasError={!!errors.score_from}
            {...getFieldProps("score_from")}
          />
          {!!errors.score_from && (
            <p className="error-message">{errors.score_from}</p>
          )}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Score To"
            hasError={!!errors.score_to}
            {...getFieldProps("score_to")}
          />
          {!!errors.score_to && (
            <p className="error-message">{errors.score_to}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Grade"
            hasError={!!errors.grade}
            {...getFieldProps("grade")}
          />
          {!!errors.grade && <p className="error-message">{errors.grade}</p>}
        </Col>
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthInput
            label="Remark"
            hasError={!!errors.remark}
            {...getFieldProps("remark")}
          />
          {!!errors.remark && <p className="error-message">{errors.remark}</p>}
        </Col>
      </Row>
    </DetailView>
  );
};

export default GradingDetail;
