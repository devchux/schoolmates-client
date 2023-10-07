import React from "react";
import { useResults } from "../../../../../../hooks/useResults";
import { useAppContext } from "../../../../../../hooks/useAppContext";
import DetailView from "../../../../../../components/views/detail-view";
import { Button, Col, FormGroup, Row } from "reactstrap";
import AuthInput from "../../../../../../components/inputs/auth-input";
import PageTitle from "../../../../../../components/common/title";
import Prompt from "../../../../../../components/modals/prompt";
import StudentsResults from "../../../../../../components/common/students-results";

const ComputeElementaryFirstHalfResult = () => {
  const { user } = useAppContext("results");
  const {
    idWithComputedResult,
    openPrompt,
    setOpenPrompt,
    selectedComment,
    setSelectedComment,
    teacherComment,
    setTeacherComment,
    setHosComment,
    comment,
    setComment,
    isLoading,
    setStudentData,
    studentByClassAndSession,
    studentData,
    comments,
    createMidTermResult,
    subjects,
    maxScores,
    setSubjects,
  } = useResults();

  return (
    <div className="results-sheet">
      {user?.designation_name !== "Student" && (
        <StudentsResults
          studentByClassAndSession={studentByClassAndSession}
          onProfileSelect={(x) => {
            setStudentData(x);
            setHosComment("");
            setTeacherComment("");
          }}
          isLoading={isLoading}
          studentData={studentData}
          idWithComputedResult={idWithComputedResult}
        />
      )}
      <DetailView
        hasGoBack={false}
        isLoading={isLoading}
        cancelLink="/app/results/preschool"
        pageTitle={`${studentData?.firstname || "Student"}'s Result`}
        onFormSubmit={(e) => {
          e.preventDefault();
          createMidTermResult();
        }}
      >
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

export default ComputeElementaryFirstHalfResult;
