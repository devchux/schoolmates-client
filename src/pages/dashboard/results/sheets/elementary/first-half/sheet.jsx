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
    // academicDate,
    preSchoolCompiledResults,
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
          setStudentData={setStudentData}
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
                  <h4>Name: {result?.student_fullname}</h4>
                </div>
                <div className="table-data">
                  <h4>Admission No.: {result?.admission_number}</h4>
                </div>
                <div className="table-data">
                  <h4>{result?.term}</h4>
                </div>
              </div>
              <div>
                <div className="table-data">
                  <h4>Chronological Age: 4 years 7 month</h4>
                </div>
                <div className="table-data">
                  <h4>School Section: Nursery</h4>
                </div>
                <div className="table-data">
                  <h4>Class: {result?.class_name}</h4>
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
                  <h4>20</h4>
                </div>
              </div>
              <div className="table-row">
                <div className="table-data">
                    <p>Communication Skill</p>
                </div>
                <div className="table-data">
                  <p>20</p>
                </div>
              </div>
              <div className="table-row">
                <div className="table-data">
                    <p>Science</p>
                </div>
                <div className="table-data">
                  <p>20</p>
                </div>
              </div>
              <div className="table-row">
                <div className="table-data">
                    <p>Science</p>
                </div>
                <div className="table-data">
                  <p>20</p>
                </div>
              </div>
              <div className="table-row">
                <div className="table-data">
                    <p>Science</p>
                </div>
                <div className="table-data">
                  <p>20</p>
                </div>
              </div>
              <div className="table-row">
                <div className="table-data">
                    <h4>Student&apos;s Total Score: 644</h4>
                </div>
                <div className="table-data">
                  <h4>Student&apos;s Average Score: 19</h4>
                </div>
              </div>
            </div>
            <div className="table-head">
              <h3>Class Teacher's General Comment</h3>
            </div>
            <div className="comment">
              <h4>{result?.teacher_comment}</h4>
              <div className="signature">
                <div>
                  {result?.teacher_signature && (
                    <img src={result?.teacher_signature} alt="" />
                  )}
                  <div className="line" />
                  <h3>{result?.teacher_fullname}</h3>
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
