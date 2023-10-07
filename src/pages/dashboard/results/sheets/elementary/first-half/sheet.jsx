import React from "react";
import StudentsResults from "../../../../../../components/common/students-results";
import PageSheet from "../../../../../../components/common/page-sheet";
import Button from "../../../../../../components/buttons/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ResultHeader from "../../../../../../components/common/result-header";
import { useResults } from "../../../../../../hooks/useResults";
import { useAppContext } from "../../../../../../hooks/useAppContext";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

const ElementaryFirstHalfSheet = () => {
  const { user } = useAppContext("results");
  const {
    idWithComputedResult,
    isLoading,
    setStudentData,
    pdfExportComponent,
    handlePrint,
    studentByClassAndSession,
    studentData,
    maxScores,
    locationState,
    subjects,
    preSchoolCompiledResults,
    getTotalScores,
    additionalCreds,
  } = useResults();

  const result =
    preSchoolCompiledResults?.find(
      ({ student_id }) => student_id === studentData.id
    ) ?? null;

  return (
    <div className="results-sheet">
      {user?.designation_name !== "Student" && (
        <StudentsResults
          studentByClassAndSession={studentByClassAndSession}
          onProfileSelect={(x) => setStudentData(x)}
          isLoading={isLoading}
          studentData={studentData}
          idWithComputedResult={idWithComputedResult}
        />
      )}
      <PageSheet>
        <div className="mb-3">
          <Button
            onClick={() => {
              if (pdfExportComponent.current) {
                handlePrint();
              }
            }}
          >
            <FontAwesomeIcon icon={faPrint} /> Print
          </Button>
        </div>

        <div
          ref={pdfExportComponent}
          className="first-level-results-sheet preschool first-half"
        >
          <ResultHeader user={user} />
          <div className="preschool-result-table">
            <div className="table-head">
              <h3>{result?.sesson} Academic Session</h3>
            </div>
            <div className="student-creds">
              <div>
                <div className="table-data">
                  <h4>
                    Name: {additionalCreds?.student_fullname}
                  </h4>
                </div>
                <div className="table-data">
                  <h4>Admission No.: {studentData?.admission_number}</h4>
                </div>
                <div className="table-data">
                  <h4>{locationState?.creds?.term}</h4>
                </div>
              </div>
              <div>
                <div className="table-data">
                  <h4>
                    Chronological Age: {studentData?.age}
                  </h4>
                </div>
                <div className="table-data">
                  <h4>School Section: {user?.campus}</h4>
                </div>
                <div className="table-data">
                  <h4>
                    Class:{" "}
                    {`${studentData?.present_class} ${studentData?.sub_class}`}
                  </h4>
                </div>
              </div>
            </div>
            <div className="table-head">
              <h3>Assessment Report</h3>
            </div>
            <div className="first-half-result-table">
              <div className="table-row">
                <div className="table-data"></div>
                <div className="table-data">
                  <h4>First Assessment Scores</h4>
                </div>
              </div>
              <div className="table-row">
                <div className="table-data">
                  <h4>Max Score Obtainable</h4>
                </div>
                <div className="table-data">
                  <h4>{maxScores?.midterm}</h4>
                </div>
              </div>
              {additionalCreds?.results?.map((x, index) => (
                <div className="table-row" key={index}>
                  <div className="table-data">
                    <p>{x.subject}</p>
                  </div>
                  <div className="table-data">
                    <p>{x.score}</p>
                  </div>
                </div>
              ))}
              <div className="table-row">
                <div className="table-data">
                  <h4>Student&apos;s Total Score: {getTotalScores()}</h4>
                </div>
                <div className="table-data">
                  <h4>
                    Student&apos;s Average Score:{" "}
                    {getTotalScores() / (subjects?.length || 1)}
                  </h4>
                </div>
              </div>
            </div>
            <div className="table-head">
              <h3>Class Teacher's General Comment</h3>
            </div>
            <div className="comment">
              <h4>{additionalCreds?.teacher_comment}</h4>
              <div className="signature">
                <div>
                  {additionalCreds?.teacher_signature && (
                    <img src={additionalCreds?.teacher_signature} alt="" />
                  )}
                  <div className="line" />
                  <h3>{additionalCreds?.teacher_fullname}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageSheet>
    </div>
  );
};

export default ElementaryFirstHalfSheet;
