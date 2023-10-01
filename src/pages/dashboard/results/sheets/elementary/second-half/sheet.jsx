import React from "react";
import StudentsResults from "../../../../../../components/common/students-results";
import PageSheet from "../../../../../../components/common/page-sheet";
import Button from "../../../../../../components/buttons/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ResultHeader from "../../../../../../components/common/result-header";
import { useResults } from "../../../../../../hooks/useResults";
import { useAppContext } from "../../../../../../hooks/useAppContext";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import ColumnChart from "../../../../../../components/charts/column-chart";

const ElementarySecondHalfSheet = () => {
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
            <div className="student-creds text-center">
              <div>
                <div className="table-data">
                  <h4>STUDENT'S NAME</h4>
                </div>
                <div className="table-data">
                  <h4>GENDER</h4>
                </div>
                <div className="table-data">
                  <h4>TERM</h4>
                </div>
                <div className="table-data">
                  <h4>CLASS</h4>
                </div>
                <div className="table-data">
                  <h4>ADMISSION NUMBER</h4>
                </div>
              </div>
              <div>
                <div className="table-data">
                  <h4>{result?.student_fullname}</h4>
                </div>
                <div className="table-data">
                  <h4>MALE</h4>
                </div>
                <div className="table-data">
                  <h4>{result?.term}</h4>
                </div>
                <div className="table-data">
                  <h4>{result?.class_name}</h4>
                </div>
                <div className="table-data">
                  <h4>{result?.admission_number}</h4>
                </div>
              </div>
            </div>
            <div className="table-head">
              <h3>Attendance Record</h3>
            </div>
            <div className="student-creds text-center">
              <div>
                <div className="table-data">
                  <h4>NUMBER OF TIMES SCHOOL OPENED</h4>
                </div>
                <div className="table-data">
                  <h4>NUMBER OF TIMES PRESENT</h4>
                </div>
                <div className="table-data">
                  <h4>NUMBER OF TIMES ABSENT</h4>
                </div>
                <div className="table-data">
                  <h4>TERM ENDS</h4>
                </div>
                <div className="table-data">
                  <h4>TERM BEGINS</h4>
                </div>
              </div>
              <div>
                <div className="table-data">
                  <h4>98</h4>
                </div>
                <div className="table-data">
                  <h4>94</h4>
                </div>
                <div className="table-data">
                  <h4>4</h4>
                </div>
                <div className="table-data">
                  <h4>17 Jul 2023</h4>
                </div>
                <div className="table-data">
                  <h4>11 Sep 2023</h4>
                </div>
              </div>
            </div>
            <div className="table-head">
              <h3>Evaluation Report</h3>
            </div>
            <div className="first-half-result-table second-half-result-table">
              <div className="table-row">
                <div className="table-data"></div>
                <div className="table-data">
                  <h4>Assessment</h4>
                </div>
                <div className="table-data">
                  <h4>Exam</h4>
                </div>
                <div className="table-data">
                  <h4>Total Score</h4>
                </div>
                <div className="table-data">
                  <h4>Grade</h4>
                </div>
                <div className="table-data">
                  <h4>Remark</h4>
                </div>
              </div>
              <div className="table-row">
                <div className="table-data">
                  <h4>Max Score Obtainable</h4>
                </div>
                <div className="table-data">
                  <h4>40</h4>
                </div>
                <div className="table-data">
                  <h4>60</h4>
                </div>
                <div className="table-data">
                  <h4>100</h4>
                </div>
                <div className="table-data">
                  <h4>A+</h4>
                </div>
                <div className="table-data">
                  <h4>Excellent</h4>
                </div>
              </div>
              <div className="table-row">
                <div className="table-data">
                  <p>ICT</p>
                </div>
                <div className="table-data">
                  <p>20</p>
                </div>
                <div className="table-data">
                  <p>30</p>
                </div>
                <div className="table-data">
                  <p>50</p>
                </div>
                <div className="table-data">
                  <p>C</p>
                </div>
                <div className="table-data">
                  <p>Good</p>
                </div>
              </div>
            </div>
            <div className="table-data">
              <br />
              <br />
            </div>
            <div className="first-half-result-table text-center">
              <div className="table-row">
                <div className="table-data">
                  <h4>Class Average</h4>
                </div>
                <div className="table-data">
                  <h4>Student's Average</h4>
                </div>
                <div className="table-data">
                  <h4>Student's Grade</h4>
                </div>
              </div>
              <div className="table-row">
                <div className="table-data">
                  <h4>90</h4>
                </div>
                <div className="table-data">
                  <h4>98</h4>
                </div>
                <div className="table-data">
                  <h4>A+</h4>
                </div>
              </div>
            </div>
            <div className="table-head">
              <h3>Academic Rating</h3>
            </div>
            <div className="second-half-academic-rating">
              <div className="table-data"></div>
              <div className="table-data"></div>
              <div className="table-data"></div>
              <div className="table-data"></div>
              <div className="table-data"></div>
              <div className="table-data"></div>
              <div className="table-data"></div>
              <div className="table-data"></div>
              <div className="table-data"></div>
              <div className="table-data"></div>
            </div>
            <div className="table-head">
              <h3>Cummulative Scores</h3>
            </div>
            <div className="first-half-result-table second-half-cummulative-scores-table">
              <div className="table-row">
                <div className="table-data">
                  <h4>Subjects</h4>
                </div>
                <div className="table-data">
                  <h4>First Term</h4>
                </div>
                <div className="table-data">
                  <h4>Second Term</h4>
                </div>
                <div className="table-data">
                  <h4>Third Term</h4>
                </div>
                <div className="table-data">
                  <h4>Year Score</h4>
                </div>
                <div className="table-data">
                  <h4>Year AVG.</h4>
                </div>
                <div className="table-data">
                  <h4>Remark</h4>
                </div>
              </div>
              <div className="table-row">
                <div className="table-data">
                  <h4>Max Scores</h4>
                </div>
                <div className="table-data">
                  <h4>100</h4>
                </div>
                <div className="table-data">
                  <h4>100</h4>
                </div>
                <div className="table-data">
                  <h4>100</h4>
                </div>
                <div className="table-data">
                  <h4>400</h4>
                </div>
                <div className="table-data">
                  <h4>100.00</h4>
                </div>
                <div className="table-data">
                  <h4>Excellent</h4>
                </div>
              </div>
              <div className="table-row">
                <div className="table-data">
                  <p>ICT</p>
                </div>
                <div className="table-data">
                  <p>87</p>
                </div>
                <div className="table-data">
                  <p>95</p>
                </div>
                <div className="table-data">
                  <p>96</p>
                </div>
                <div className="table-data">
                  <p>278</p>
                </div>
                <div className="table-data">
                  <p>92.67</p>
                </div>
                <div className="table-data">
                  <p>Good</p>
                </div>
              </div>
              <div className="table-row year-total-score">
                <div className="table-data">
                  <p>End of year total score</p>
                </div>
                <div className="table-data"></div>
                <div className="table-data"></div>
                <div className="table-data"></div>
                <div className="table-data">
                  <p>278</p>
                </div>
                <div className="table-data"></div>
                <div className="table-data"></div>
              </div>
              <div className="table-data">
                <br />
                <br />
              </div>
            </div>
            <div className="first-half-result-table text-center">
              <div className="table-row">
                <div className="table-data">
                  <h4>End of Year Class Average</h4>
                </div>
                <div className="table-data">
                  <h4>End of Year Pupil's Average</h4>
                </div>
                <div className="table-data">
                  <h4>End of Year Pupil's Grade</h4>
                </div>
              </div>
              <div className="table-row">
                <div className="table-data">
                  <p>88</p>
                </div>
                <div className="table-data">
                  <p>88</p>
                </div>
                <div className="table-data">
                  <p>88</p>
                </div>
              </div>
            </div>
            <div className="table-data performance-remark">
              <h1>Performance Remark: Promoted to the next class</h1>
            </div>
            <div className="table-data">
              <br />
              <br />
            </div>
            <div className="table-head">
              <h3>Pupil's monitoring data</h3>
            </div>
            <div className="first-half-result-table skills-table">
              <div className="table-row">
                <div className="table-data"></div>
                <div className="table-data">
                  <p>Excellent</p>
                </div>
                <div className="table-data">
                  <p>Good</p>
                </div>
                <div className="table-data">
                  <p>Fair</p>
                </div>
                <div className="table-data">
                  <p>Need Improvement</p>
                </div>
              </div>
            </div>
            <div className="table-data">
              <br />
              <br />
              <br />
              <br />
            </div>
            <div className="table-head">
              <h3>Psychomotor Performance</h3>
            </div>
            <div className="first-half-result-table skills-table">
              <div className="table-row">
                <div className="table-data"></div>
                <div className="table-data">
                  <p>Excellent</p>
                </div>
                <div className="table-data">
                  <p>Good</p>
                </div>
                <div className="table-data">
                  <p>Fair</p>
                </div>
                <div className="table-data">
                  <p>Need Improvement</p>
                </div>
              </div>
            </div>
            <div className="table-data">
              <br />
              <br />
              <br />
              <br />
            </div>
            <div className="table-data">
              <div className="table-chart-wrapper">
                <h4>Performance Chart</h4>
                <div className="table-chart">
                  <ColumnChart
                    xTitle="Subjects"
                    yTitle="Scores"
                    categories={[
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                    ]}
                    data={[
                      {
                        name: "Net Profit",
                        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
                      },
                      {
                        name: "Revenue",
                        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
                      },
                      {
                        name: "Free Cash Flow",
                        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
                      },
                    ]}
                  />
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
            <div className="table-head">
              <h3>Principal's Comment</h3>
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

export default ElementarySecondHalfSheet;
