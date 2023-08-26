import React, { useEffect } from "react";
import { useResults } from "../../../../../hooks/useResults";
import { useAppContext } from "../../../../../hooks/useAppContext";
import ProfileImage from "../../../../../components/common/profile-image";
import DetailView from "../../../../../components/views/detail-view";
import { useForm } from "react-formid";
import { Button, Col, FormGroup, Row } from "reactstrap";
import AuthInput from "../../../../../components/inputs/auth-input";
import PageTitle from "../../../../../components/common/title";
import AuthSelect from "../../../../../components/inputs/auth-select";
import Prompt from "../../../../../components/modals/prompt";

const ComputeMidTermResult = () => {
  const { user } = useAppContext("results");
  const {
    idWithComputedResult,
    openPrompt,
    setOpenPrompt,
    selectedComment,
    setSelectedComment,
    teacherComment,
    setTeacherComment,
    hosComment,
    setHosComment,
    comment,
    setComment,
    isLoading,
    setStudentData,
    studentByClassAndSession,
    studentData,
    comments,
    preSchoolSubjectsByClass,
    addPreSchoolResult,
    locationState,
    preSchoolResults,
  } = useResults();

  const {
    getFieldProps,
    inputs,
    setFieldValue,
    handleSubmit,
    errors,
    setInputs,
    reset,
  } = useForm({
    defaultValues: {
      school_opened: "",
      times_present: "",
      times_absent: "",
      teacher_comment: "",
      hos_comment: "",
      evaluation_report: [],
      cognitive_development: [],
    },
    validation: {
      school_opened: {
        required: (val) => !!val || "Field is required",
        isNumber: (val) => !Number.isNaN(val) || "Value must be a number",
      },
      times_present: {
        required: (val) => !!val || "Field is required",
        isNumber: (val) => !Number.isNaN(val) || "Value must be a number",
      },
      times_absent: {
        required: (val) => !!val || "Field is required",
        isNumber: (val) => !Number.isNaN(val) || "Value must be a number",
      },
    },
  });

  const onSubjectChange = (section, subject, topic, score) => {
    const subjectObject = {
      subject,
      topic: [{ topic, score }],
    };

    const findSubject = inputs[section].find(
      (item) => item.subject === subject
    );
    if (findSubject) {
      const filterTopic = findSubject.topic.filter((t) => t.topic !== topic);
      const newSubject = inputs[section].map((item) => {
        if (item.subject === subject) {
          return {
            subject,
            topic: [...filterTopic, ...subjectObject.topic],
          };
        }

        return item;
      });
      setFieldValue(section, newSubject);
    } else {
      setFieldValue(section, [...inputs[section], subjectObject]);
    }
  };

  const getTopicValue = (section, subject, topic) =>
    inputs[section]
      .find((item) => item.subject === subject)
      ?.topic.find((item) => item?.topic === topic)?.score ?? "";

  const submit = async (data) => {
    await addPreSchoolResult({
      ...data,
      student_id: studentData.id,
      student_fullname: `${studentData?.firstname} ${studentData?.surname} ${studentData?.middlename}`,
      admission_number: studentData.admission_number,
      class_name: `${studentData?.present_class} ${studentData?.sub_class}`,
      period: locationState?.creds?.period,
      term: locationState?.creds?.term,
      session: locationState?.creds?.session,
      teacher_comment: teacherComment,
      teacher_id: user?.id,
      hos_comment: hosComment,
      hos_id: comments[0]?.hos_id,
    });
  };

  const updateInputs = (data) => {
    setInputs({
      ...inputs,
      ...data,
    });
  };

  useEffect(() => {
    if (preSchoolResults && preSchoolResults?.length > 0) {
      updateInputs({
        school_opened: preSchoolResults?.[0]?.school_opened,
        times_present: preSchoolResults?.[0]?.times_present,
        times_absent: preSchoolResults?.[0]?.times_absent,
        teacher_comment: preSchoolResults?.[0]?.teacher_comment,
        hos_comment: preSchoolResults?.[0]?.hos_comment,
        evaluation_report: preSchoolResults?.[0]?.evaluation_report,
        cognitive_development: preSchoolResults?.[0]?.cognitive_development,
      });
      setHosComment(preSchoolResults?.[0]?.hos_comment);
      setTeacherComment(preSchoolResults?.[0]?.teacher_comment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preSchoolResults]);

  return (
    <div className="results-sheet">
      {user?.designation_name !== "Student" && (
        <div className="students-wrapper">
          {studentByClassAndSession?.map((x) => (
            <div
              key={x.id}
              onClick={() => {
                setStudentData(x);
                reset();
                setHosComment("");
                setTeacherComment("");
              }}
              className="student"
            >
              <div
                className={`loader ${isLoading ? "is-loading" : ""} ${
                  studentData.id === x.id ? "active" : ""
                }`}
              >
                <ProfileImage src={x?.image} alt={x?.firstname} />
                {idWithComputedResult.includes(x.id) && (
                  <div className="computed" />
                )}
              </div>
              <div>
                <p>{x.firstname}</p>
                <p>{x.surname}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* <DetailView
        hasGoBack={false}
        isLoading={isLoading}
        cancelLink="/app/results/preschool"
        pageTitle={`${studentData?.firstname || "Student"}'s Result`}
        onFormSubmit={handleSubmit(submit)}
      >
        <Row className="mb-0 mb-sm-4">
          <Col sm="6" className="mb-4 mb-sm-0">
            <AuthInput
              label="Number of times school opened"
              hasError={!!errors.school_opened}
              {...getFieldProps("school_opened")}
            />
            {!!errors.school_opened && (
              <p className="error-message">{errors.school_opened}</p>
            )}
          </Col>
          <Col sm="6" className="mb-4 mb-sm-0">
            <AuthInput
              label="Number of times present"
              hasError={!!errors.times_present}
              {...getFieldProps("times_present")}
            />
            {!!errors.times_present && (
              <p className="error-message">{errors.times_present}</p>
            )}
          </Col>
        </Row>
        <Row className="mb-0 mb-sm-4">
          <Col sm="6" className="mb-4 mb-sm-0">
            <AuthInput
              label="Number of times absent"
              hasError={!!errors.times_absent}
              {...getFieldProps("times_absent")}
            />
            {!!errors.times_absent && (
              <p className="error-message">{errors.times_absent}</p>
            )}
          </Col>
        </Row>
        <hr className="my-5" /> */}
        <PageTitle>Assessment Report</PageTitle>
        {preSchoolSubjectsByClass?.[0]?.subjects
          ?.filter(({ category }) => category === "Evaluation Report")
          ?.map((subject, key) => (
            <div key={key}>
              <h4>
                Score
              </h4>
              <div>
                {/* {subject?.topic?.map((topic, i) => ( */}
                  <Row className="my-5" >
                    <Col sm="6" className="mb-4 mb-sm-0">
                      <h5>
                        {/* {i + 1}. {topic.name}: */}
                      </h5>
                    </Col>
                    <Col sm="6" className="mb-4 mb-sm-0">
                      <AuthSelect
                      text="man"
                      value="man"
                        />
                    </Col>
                    <Col sm="6" className="mb-4 mb-sm-0">
                      <AuthSelect
                        />
                    </Col>
                  </Row>
                {/* ))} */}
              </div>
            </div>
          ))}
         <hr className="my-5" />

        {/* <PageTitle>Evaluation Report</PageTitle>
        {preSchoolSubjectsByClass?.[0]?.subjects
          ?.filter(({ category }) => category === "Evaluation Report")
          ?.map((subject, key) => (
            <div key={key}>
              <h4>
                <b>- {subject.subject}</b>
              </h4>
              <div>
                {subject?.topic?.map((topic, i) => (
                  <Row className="my-5" key={i}>
                    <Col sm="6" className="mb-4 mb-sm-0">
                      <h5>
                        {i + 1}. {topic.name}:
                      </h5>
                    </Col>
                    <Col sm="6" className="mb-4 mb-sm-0">
                      <AuthSelect
                        value={getTopicValue(
                          "evaluation_report",
                          subject.subject,
                          topic.name
                        )}
                        onChange={({ target: { value } }) => {
                          onSubjectChange(
                            "evaluation_report",
                            subject.subject,
                            topic.name,
                            value
                          );
                        }}
                        options={[
                          "Needs Improvement",
                          "Fair",
                          "Good",
                          "Excellent",
                        ].map((x) => ({
                          value: x,
                          title: x,
                        }))}
                      />
                    </Col>
                  </Row>
                ))}
              </div>
            </div>
          ))}
        <hr className="my-5" /> */}

        {/* <PageTitle>Effective Development</PageTitle>
        {preSchoolSubjectsByClass?.[0]?.subjects
          ?.filter(({ category }) => category === "Evaluation Report")
          ?.map((subject, key) => (
            <div key={key}>
              <h4>
                <b>- {subject.subject}</b>
              </h4>
              <div>
                {subject?.topic?.map((topic, i) => (
                  <Row className="my-5" key={i}>
                    <Col sm="6" className="mb-4 mb-sm-0">
                      <h5>
                        {i + 1}. {topic.name}:
                      </h5>
                    </Col>
                    <Col sm="6" className="mb-4 mb-sm-0">
                      <AuthSelect
                        value={getTopicValue(
                          "evaluation_report",
                          subject.subject,
                          topic.name
                        )}
                        onChange={({ target: { value } }) => {
                          onSubjectChange(
                            "evaluation_report",
                            subject.subject,
                            topic.name,
                            value
                          );
                        }}
                        options={[
                          "Needs Improvement",
                          "Fair",
                          "Good",
                          "Excellent",
                        ].map((x) => ({
                          value: x,
                          title: x,
                        }))}
                      />
                    </Col>
                  </Row>
                ))}
              </div>
            </div>
          ))}
        <hr className="my-5" /> */}
        {/* <PageTitle>Cognitive Development</PageTitle> */}
        {/* {preSchoolSubjectsByClass?.[0]?.subjects
          ?.filter(({ category }) => category === "Cognitive Development")
          ?.map((subject, key) => (
            <div key={key}>
              <h4>
                <b>- {subject.subject}</b>
              </h4>
              <div>
                {subject?.topic?.map((topic, i) => (
                  <Row className="my-5" key={i}>
                    <Col sm="6" className="mb-4 mb-sm-0">
                      <h5>
                        {i + 1}. {topic.name}:
                      </h5>
                    </Col>
                    <Col sm="6" className="mb-4 mb-sm-0">
                      <AuthSelect
                        value={getTopicValue(
                          "cognitive_development",
                          subject.subject,
                          topic.name
                        )}
                        onChange={({ target: { value } }) => {
                          onSubjectChange(
                            "cognitive_development",
                            subject.subject,
                            topic.name,
                            value
                          );
                        }}
                        options={[
                          "Work in Progress",
                          "Needs Reinforcement",
                          "Archieved",
                        ].map((x) => ({
                          value: x,
                          title: x,
                        }))}
                      />
                    </Col>
                  </Row>
                ))}
              </div>
            </div>
          ))} */}
        {/* <hr className="my-5" />
        <PageTitle>Teacher's Comment</PageTitle> */}
        {/* <div>
          <Button
            onClick={() => {
              setComment("teacher");
              setOpenPrompt(true);
            }}
          >
            Suggest
          </Button>
          <FormGroup>
            <textarea
              className="form-control mt-3"
              rows="5"
              value={teacherComment}
              onChange={({ target: { value } }) => setTeacherComment(value)}
            />
          </FormGroup>
        </div>
        <hr className="my-5" />
        <PageTitle>HOS' Comment</PageTitle>
        <div>
          <Button
            onClick={() => {
              setComment("hos");
              setOpenPrompt(true);
            }}
          >
            Suggest
          </Button>
          <FormGroup>
            <textarea
              className="form-control mt-3"
              rows="5"
              value={hosComment}
              onChange={({ target: { value } }) => setHosComment(value)}
            />
          </FormGroup>
        </div>
      </DetailView>
      <Prompt
        isOpen={openPrompt}
        toggle={() => setOpenPrompt(!openPrompt)}
        singleButtonProps={{
          type: "button",
          isLoading: false,
          disabled: false,
          onClick: () => {
            if (comment === "teacher") {
              setTeacherComment(selectedComment);
            }
            if (comment === "hos") {
              setHosComment(selectedComment);
            }
            setOpenPrompt(false);
            setSelectedComment("");
          },
        }}
        singleButtonText="Continue"
        promptHeader="Select Comment"
      >
        {comments?.map((x, index) => (
          <div key={index} className="modal-result-comment-select-options">
            <input
              type="radio"
              name="selectedComment"
              onChange={({ target: { value } }) => setSelectedComment(value)}
              value={x?.hos_comment}
            />
            <p>{x?.hos_comment}</p>
          </div>
        ))}
      </Prompt>
    </div> */}
    </div>
  );
};

export default ComputeMidTermResult;
