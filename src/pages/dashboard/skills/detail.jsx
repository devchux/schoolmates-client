import React, { useEffect } from "react";
import DetailView from "../../../components/views/detail-view";
import { useSkills } from "../../../hooks/useSkills";
import { Col, Row, Button as Btn } from "reactstrap";
import AuthInput from "../../../components/inputs/auth-input";
import { useForm } from "react-formid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBucket, faPen } from "@fortawesome/free-solid-svg-icons";
import AuthSelect from "../../../components/inputs/auth-select";

const SkillsDetail = () => {
  const { isLoading, addSkill, isEdit, editSkill, skill } = useSkills();

  const {
    inputs,
    errors,
    handleSubmit,
    handleChange,
    setFieldValue,
    setInputs,
  } = useForm({
    defaultValues: {
      skill_type: "",
      attribute: [""],
    },
    validation: {
      skill_type: { required: true },
      attribute: {
        shouldHaveContents: (val) => val.length > 0 && val?.every((x) => !!x),
      },
    },
  });

  const onSubmit = async (data) => {
    if (isEdit) {
      await editSkill({ ...data, id: skill.id });
      return;
    }
    await addSkill(data);
  };

  useEffect(() => {
    if (skill) {
      setInputs({
        ...inputs,
        skill_type: skill.skill_type,
        attribute: skill.attribute,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skill]);

  return (
    <DetailView
      isLoading={isLoading}
      pageTitle="Add Skill"
      onFormSubmit={handleSubmit(onSubmit)}
    >
      <Row className="mb-0 mb-sm-4">
        <Col sm="6" className="mb-4 mb-sm-0">
          <AuthSelect
            placeholder="Select Skill Title"
            hasError={!!errors.skill_type}
            value={inputs.skill_type}
            name="skill_type"
            onChange={handleChange}
            options={[
              {
                value: "AFFECTIVE DISPOSITION",
                title: "AFFECTIVE DISPOSITION",
              },
              { value: "PSYCHOMOTOR SKILLS", title: "PSYCHOMOTOR SKILLS" },
            ]}
          />
          {!!errors.skill_type && (
            <p className="error-message">{errors.skill_type}</p>
          )}
        </Col>
      </Row>
      <hr />
      {inputs.attribute.map((input, index) => (
        <Row key={index} className="my-5">
          <Col className="col-6 mb-4 mb-sm-0">
            <AuthInput
              type="text"
              placeholder="Enter Attributes Here..."
              value={input}
              name="firstname"
              onChange={({ target: { value } }) => {
                const format = inputs.attribute.map((x, k) => {
                  if (k === index) return value;
                  return x;
                });

                setFieldValue("attribute", format);
              }}
            />
          </Col>
          <Col className="col-2 mb-4 mb-sm-0">
            {inputs.attribute.length > 1 && (
              <Btn
                outline
                type="button"
                color="danger"
                className="me-3"
                onClick={() => {
                  const format = inputs.attribute.filter((_, k) => k !== index);

                  setFieldValue("attribute", format);
                }}
              >
                <FontAwesomeIcon icon={faBucket} />
              </Btn>
            )}
            {inputs.attribute.length === index + 1 && (
              <Btn
                type="button"
                color="primary"
                disabled={!input}
                onClick={() =>
                  setFieldValue("attribute", [...inputs.attribute, ""])
                }
              >
                <FontAwesomeIcon icon={faPen} />
              </Btn>
            )}
          </Col>
        </Row>
      ))}
    </DetailView>
  );
};

export default SkillsDetail;
