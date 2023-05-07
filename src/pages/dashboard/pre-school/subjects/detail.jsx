import React, { useState } from "react";
import PageSheet from "../../../../components/common/page-sheet";
import AuthInput from "../../../../components/inputs/auth-input";
import Button from "../../../../components/buttons/button";
import Prompt from "../../../../components/modals/prompt";
import AuthSelect from "../../../../components/inputs/auth-select";
import { useForm } from "react-formid";
import { useAcademicSession } from "../../../../hooks/useAcademicSession";
import { Col, Form, Row, Button as Btn } from "reactstrap";
import PageTitle from "../../../../components/common/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBucket, faPen } from "@fortawesome/free-solid-svg-icons";
import ButtonGroup from "../../../../components/buttons/button-group";
import { useNavigate } from "react-router-dom";
import { usePreSchool } from "../../../../hooks/usePreSchool";

const PreSchoolSubjectDetail = () => {
  const [openPeriodPrompt, setPeriodPrompt] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);
  const navigate = useNavigate();
  const { isLoading, createPreSchoolSubject } = usePreSchool();

  const {
    handleChange: handlePeriodChange,
    inputs: periodInputs,
    errors: periodErrors,
    handleSubmit: handlePeriodSubmit,
  } = useForm({
    defaultValues: {
      period: "First Half",
      session: "",
      term: "First Term",
    },
    validation: {
      period: {
        required: true,
      },
      session: {
        required: true,
      },
      term: {
        required: true,
      },
    },
  });

  const { inputs, errors, handleSubmit, handleChange, setFieldValue } = useForm(
    {
      defaultValues: {
        name: "",
        topics: [""],
      },
      validation: {
        name: { required: true },
        topics: {
          shouldHaveContents: (val) => val.length > 0 && val?.every((x) => !!x),
        },
      },
    }
  );

  const { isLoading: loadingSessions, data: sessions } = useAcademicSession();

  const onSubmit = () => {
    setPeriodPrompt(false);
    setShowSubjects(true);
  };

  const onFinalSubmit = (data) => {
    const finalData = {
      ...periodInputs,
      subject: data.name,
      topic: data.topics.map((t) => ({ name: t })),
    };

    createPreSchoolSubject(finalData);
  };

  return (
    <PageSheet>
      <PageTitle>Pre School Subject</PageTitle>
      <div className={`mt-3 mb-5`}>
        <Button onClick={() => setPeriodPrompt(true)}>Enter Period</Button>
      </div>
      {showSubjects && (
        <Form onSubmit={handleSubmit(onFinalSubmit)}>
          <Row className="mb-0 mb-sm-4">
            <Col sm="6" className="mb-4 mb-sm-0">
              <AuthInput
                type="text"
                placeholder="Enter Subject Title"
                hasError={!!errors.name}
                value={inputs.name}
                name="name"
                onChange={handleChange}
              />
              {!!errors.name && <p className="error-message">{errors.name}</p>}
            </Col>
          </Row>
          <hr />
          {inputs.topics.map((input, index) => (
            <Row key={index} className="my-5">
              <Col className="col-6 mb-4 mb-sm-0">
                <AuthInput
                  type="text"
                  placeholder="Enter Topic Here..."
                  value={input}
                  name="firstname"
                  onChange={({ target: { value } }) => {
                    const format = inputs.topics.map((x, k) => {
                      if (k === index) return value;
                      return x;
                    });

                    setFieldValue("topics", format);
                  }}
                />
              </Col>
              <Col className="col-2 mb-4 mb-sm-0">
                {inputs.topics.length > 1 && (
                  <Btn
                    outline
                    type="button"
                    color="danger"
                    className="me-3"
                    onClick={() => {
                      const format = inputs.topics.filter(
                        (_, k) => k !== index
                      );

                      setFieldValue("topics", format);
                    }}
                  >
                    <FontAwesomeIcon icon={faBucket} />
                  </Btn>
                )}
                {inputs.topics.length === index + 1 && (
                  <Btn
                    type="button"
                    color="primary"
                    disabled={!input}
                    onClick={() =>
                      setFieldValue("topics", [...inputs.topics, ""])
                    }
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </Btn>
                )}
              </Col>
            </Row>
          ))}
          <div className="mb-5 d-flex justify-content-end">
            <ButtonGroup
              options={[
                {
                  title: "Cancel",
                  type: "button",
                  variant: "outline",
                  onClick: () => navigate(-1),
                },
                {
                  title: "Save",
                  type: "submit",
                  isLoading,
                  disabled: isLoading,
                },
              ]}
            />
          </div>
        </Form>
      )}
      <Prompt
        isOpen={openPeriodPrompt}
        toggle={() => setPeriodPrompt(false)}
        singleButtonProps={{
          type: "button",
          isLoading: loadingSessions,
          disabled: loadingSessions,
          onClick: handlePeriodSubmit(onSubmit),
        }}
        singleButtonText="Continue"
        promptHeader="Academic Period"
      >
        <div className="form-group mb-4">
          <AuthSelect
            label="Period"
            value={periodInputs.period}
            name="period"
            hasError={!!periodErrors.period}
            onChange={handlePeriodChange}
            options={[
              { value: "First Half", title: "First Half/Mid Term" },
              { value: "Second Half", title: "Second Half/End of Term" },
            ]}
          />
          {!!periodErrors.period && (
            <p className="error-message">{periodErrors.period}</p>
          )}
        </div>
        <div className="form-group mb-4">
          <AuthSelect
            label="Term"
            value={periodInputs.term}
            name="term"
            hasError={!!periodErrors.term}
            onChange={handlePeriodChange}
            options={[
              { value: "First Term", title: "First Term" },
              { value: "Second Term", title: "Second Term" },
              { value: "Third Term", title: "Third Term" },
            ]}
          />
          {!!periodErrors.term && (
            <p className="error-message">{periodErrors.term}</p>
          )}
        </div>
        <div className="form-group mb-4">
          <AuthSelect
            label="Session"
            value={periodInputs.session}
            name="session"
            hasError={!!periodErrors.session}
            onChange={handlePeriodChange}
            options={(sessions || [])?.map((session) => ({
              value: session?.academic_session,
              title: session?.academic_session,
            }))}
          />
          {!!periodErrors.session && (
            <p className="error-message">{periodErrors.session}</p>
          )}
        </div>
      </Prompt>
    </PageSheet>
  );
};

export default PreSchoolSubjectDetail;
