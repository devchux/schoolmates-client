import React, { Fragment } from "react";
import { useResults } from "../../../../../../hooks/useResults";
import { useAppContext } from "../../../../../../hooks/useAppContext";
import DetailView from "../../../../../../components/views/detail-view";
import { Button, Col, FormGroup, Row } from "reactstrap";
import AuthInput from "../../../../../../components/inputs/auth-input";
import PageTitle from "../../../../../../components/common/title";
import Prompt from "../../../../../../components/modals/prompt";
import { useSkills } from "../../../../../../hooks/useSkills";
import AuthSelect from "../../../../../../components/inputs/auth-select";
import StudentsResults from "../../../../../../components/common/students-results";

const ComputeElementarySecondHalfResult = () => {
  const { user } = useAppContext("results");
  const { isLoading: skillLoading, skills } = useSkills();
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
    maxScores,
    subjects,
    setSubjects,
    additionalCreds,
    setAdditionalCreds,
    createEndOfTermResult,
    performanceRemark,
    setPerformanceRemark,
    setInitGetExistingSecondHalfResult,
  } = useResults();

  const handleSocialChecks = (property, type, value) => {
    if (additionalCreds[property]) {
      const find = additionalCreds[property].find((x) => x.name === type);
      if (find) {
        setAdditionalCreds({
          ...additionalCreds,
          [property]: additionalCreds[property].map((x) => {
            if (x.name === type)
              return {
                name: type,
                score: value,
              };
            return x;
          }),
        });
      } else {
        setAdditionalCreds({
          ...additionalCreds,
          [property]: [
            ...additionalCreds[property],
            {
              name: type,
              score: value,
            },
          ],
        });
      }
    } else {
      setAdditionalCreds({
        ...additionalCreds,
        [property]: [
          {
            name: type,
            score: value,
          },
        ],
      });
    }
  };

  return (
    <div className="results-sheet">
      {user?.designation_name !== "Student" && (
        <StudentsResults
          studentByClassAndSession={studentByClassAndSession}
          onProfileSelect={(x) => {
            setStudentData(x);
            setHosComment("");
            setTeacherComment("");
            setInitGetExistingSecondHalfResult(true);
          }}
          isLoading={isLoading}
          studentData={studentData}
          idWithComputedResult={idWithComputedResult}
        />
      )}
      <DetailView
        hasGoBack={false}
        isLoading={isLoading || skillLoading}
        cancelLink="/app/results/preschool"
        pageTitle={`${studentData?.firstname || "Student"}'s Result`}
        onFormSubmit={(e) => {
          e.preventDefault();
          createEndOfTermResult();
        }}
      >
        <Row className="mb-0 mb-sm-4">
          <Col sm="6" className="mb-4 mb-sm-0">
            <AuthInput
              label="Number of times school opened"
              value={additionalCreds?.school_opened ?? "0"}
              onChange={({ target: { value } }) => {
                if (Number.isNaN(Number(value))) return;
                setAdditionalCreds({
                  ...additionalCreds,
                  school_opened: value,
                });
              }}
            />
          </Col>
          <Col sm="6" className="mb-4 mb-sm-0">
            <AuthInput
              label="Number of times present"
              value={additionalCreds?.times_present ?? "0"}
              onChange={({ target: { value } }) => {
                if (Number.isNaN(Number(value))) return;
                setAdditionalCreds({
                  ...additionalCreds,
                  times_present: value,
                });
              }}
            />
          </Col>
        </Row>
        <Row className="mb-0 mb-sm-4">
          <Col sm="6" className="mb-4 mb-sm-0">
            <AuthInput
              label="Number of times absent"
              value={additionalCreds?.times_absent ?? "0"}
              onChange={({ target: { value } }) => {
                if (Number.isNaN(Number(value))) return;
                setAdditionalCreds({
                  ...additionalCreds,
                  times_absent: value,
                });
              }}
            />
          </Col>
        </Row>
        <hr className="my-5" />

        <PageTitle>Evaluation Report</PageTitle>
        <div>
          <div>
            {subjects?.map((x, key) => (
              <Row key={key} className="my-5 ">
                <Col sm="6" className="mb- mb-sm-0">
                  <h5>
                    {key + 1}. {x.subject}:
                  </h5>
                </Col>
                <Col sm="6" className="mb-1 mb-sm-0">
                  <AuthInput
                    value={x.grade}
                    onChange={({ target: { value } }) => {
                      if (Number.isNaN(Number(value))) return;

                      if (Number(value) > Number(maxScores?.midterm)) return;

                      const fd = subjects.map((s) => ({
                        ...s,
                        grade: s.subject === x.subject ? value : s.grade,
                      }));

                      setSubjects(fd);
                    }}
                  />
                </Col>
              </Row>
            ))}
          </div>
        </div>
        <hr className="my-5" />
        {skills?.map((skill, index) => (
          <Fragment key={skill.id}>
            {index !== 0 && <hr className="my-5" />}
            <PageTitle>{skill.skill_type}</PageTitle>
            <div>
              <div>
                {skill.attribute.map((attr, i) => (
                  <Row key={attr.name} className="my-5">
                    <Col sm="6" className="mb-4 mb-sm-0">
                      <h5>
                        {i + 1}. {attr.name}:
                      </h5>
                    </Col>
                    <Col sm="6" className="mb-1 mb-sm-0">
                      <AuthSelect
                        options={[
                          { title: 1, value: 1 },
                          { title: 2, value: 2 },
                          { title: 3, value: 3 },
                          { title: 4, value: 4 },
                          { title: 5, value: 5 },
                        ]}
                        value={
                          additionalCreds[
                            skill.skill_type.toLowerCase().split(" ").join("_")
                          ]?.find((x) => x.name === attr.name)?.score || ""
                        }
                        onChange={({ target: { value } }) => {
                          handleSocialChecks(
                            skill.skill_type.toLowerCase().split(" ").join("_"),
                            attr.name,
                            value
                          );
                        }}
                      />
                    </Col>
                  </Row>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
        <hr className="my-5" />
        <PageTitle>Performance Remark</PageTitle>
        <div>
          <FormGroup>
            <textarea
              className="form-control mt-3"
              rows="5"
              value={performanceRemark}
              onChange={({ target: { value } }) => setPerformanceRemark(value)}
            />
          </FormGroup>
        </div>

        <hr className="my-5" />
        <PageTitle>Teacher's Comment</PageTitle>
        <div>
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
    </div>
  );
};

export default ComputeElementarySecondHalfResult;
