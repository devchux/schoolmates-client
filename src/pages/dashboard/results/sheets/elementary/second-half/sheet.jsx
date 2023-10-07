import React from "react";
import StudentsResults from "../../../../../../components/common/students-results";
import PageSheet from "../../../../../../components/common/page-sheet";
import Button from "../../../../../../components/buttons/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ResultHeader from "../../../../../../components/common/result-header";
import { useResults } from "../../../../../../hooks/useResults";
import { useAppContext } from "../../../../../../hooks/useAppContext";
import { faCheck, faPrint } from "@fortawesome/free-solid-svg-icons";
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
    academicDate,
    locationState,
    additionalCreds,
    studentMidResult,
    maxScores,
    cummulativeScores,
    getScoreRemark,
    grading,
    yearlyClassAverage,
    setInitGetExistingSecondHalfResult,
    classAverage,
  } = useResults();

  const getTotalYearlyScores = () => {
    return cummulativeScores?.reduce((a, item) => {
      return a + Number(item["Total Score"]);
    }, 0);
  };

  const chartTitle =
    locationState?.creds?.term !== "Third Term"
      ? {
          first: "Highest Score",
          second: "Average Score",
          third: "Total Score",
        }
      : {
          first: "First Term",
          second: "Second Term",
          third: "Third Term",
        };

  const generateChartData = () => {
    const unit =
      locationState?.creds?.term !== "Third Term"
        ? {
            first: "Highest",
            second: "Average Score",
            third: "Total Score",
          }
        : {
            first: "First Term",
            second: "Second Term",
            third: "Third Term",
          };

    return cummulativeScores?.reduce((a, item) => {
      const first = [];
      const second = [];
      const third = [];
      const categories = [];

      first.push(Number(item[unit.first]).toFixed(0));
      second.push(Number(item[unit.second]).toFixed(0));
      third.push(Number(item[unit.third]).toFixed(0));
      categories.push(item.subject);

      a = {
        ...a,
        first: [...(a.first || []), ...first],
        second: [...(a.second || []), ...second],
        third: [...(a.third || []), ...third],
        categories: [...(a.categories || []), ...categories],
      };

      return a;
    }, {});
  };

  return (
    <div className="results-sheet">
      {user?.designation_name !== "Student" && (
        <StudentsResults
          studentByClassAndSession={studentByClassAndSession}
          onProfileSelect={(x) => {
            setStudentData(x);
            setInitGetExistingSecondHalfResult(true);
          }}
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
              <h3>{locationState?.creds?.session} Academic Session</h3>
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
                  <h4>
                    {studentData?.firstname} {studentData?.surname}{" "}
                    {studentData?.middlename}
                  </h4>
                </div>
                <div className="table-data">
                  <h4>{studentData?.gender}</h4>
                </div>
                <div className="table-data">
                  <h4>{locationState?.creds?.term}</h4>
                </div>
                <div className="table-data">
                  <h4>
                    {studentData?.present_class} {studentData?.sub_class}
                  </h4>
                </div>
                <div className="table-data">
                  <h4>{studentData?.admission_number}</h4>
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
                  <h4>{additionalCreds?.school_opened}</h4>
                </div>
                <div className="table-data">
                  <h4>{additionalCreds?.times_present}</h4>
                </div>
                <div className="table-data">
                  <h4>{additionalCreds?.times_absent}</h4>
                </div>
                <div className="table-data">
                  <h4>{academicDate?.session_ends}</h4>
                </div>
                <div className="table-data">
                  <h4>{academicDate?.session_resumes}</h4>
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
                  <h4>{maxScores?.midterm}</h4>
                </div>
                <div className="table-data">
                  <h4>{maxScores?.exam}</h4>
                </div>
                <div className="table-data">
                  <h4>{maxScores?.total}</h4>
                </div>
                <div className="table-data">
                  <h4>A+</h4>
                </div>
                <div className="table-data">
                  <h4>Excellent</h4>
                </div>
              </div>
              {additionalCreds?.results?.map((s, index) => (
                <div className="table-row" key={index}>
                  <div className="table-data">
                    <p>{s?.subject}</p>
                  </div>
                  <div className="table-data">
                    <p>
                      {studentMidResult?.find((x) => x.subject === s.subject)
                        ?.score || 0}
                    </p>
                  </div>
                  <div className="table-data">
                    <p>{s.score}</p>
                  </div>
                  <div className="table-data">
                    <p>
                      {(
                        Number(
                          studentMidResult?.find((x) => x.subject === s.subject)
                            ?.score || 0
                        ) + Number(s?.score ?? 0)
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div className="table-data">
                    <p>
                      {
                        getScoreRemark(
                          Number(
                            studentMidResult?.find(
                              (x) => x.subject === s.subject
                            )?.score || 0
                          ) + Number(s.score)
                        )?.grade
                      }
                    </p>
                  </div>
                  <div className="table-data">
                    <p>
                      {
                        getScoreRemark(
                          Number(
                            studentMidResult?.find(
                              (x) => x.subject === s.subject
                            )?.score || 0
                          ) + Number(s.score)
                        )?.remark
                      }
                    </p>
                  </div>
                </div>
              ))}
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
                  <p>
                    {Number(classAverage?.["Class Average"] || 0).toFixed(2)}
                  </p>
                </div>
                <div className="table-data">
                  <p>
                    {Number(classAverage?.["Student Average"] || 0).toFixed(2)}
                  </p>
                </div>
                <div className="table-data">
                  <p>{classAverage?.["Grade"]}</p>
                </div>
              </div>
            </div>
            <div className="table-head">
              <h3>Academic Rating</h3>
            </div>
            <div className="second-half-academic-rating text-center">
              {grading?.map((grade) => (
                <div key={grade?.id} className="table-data">
                  <p>
                    {grade?.grade} - [{grade?.score_from} - {grade?.score_to}% -{" "}
                    {grade?.remark}]
                  </p>
                </div>
              ))}
            </div>
            <div className="table-head">
              <h3>Cummulative Scores</h3>
            </div>
            <div className="first-half-result-table second-half-cummulative-scores-table">
              <div className="table-row">
                <div className="table-data">
                  <h4>Subjects</h4>
                </div>
                <div className="right-data">
                  <div className="table-data">
                    <h4>First Term</h4>
                  </div>
                  {locationState?.creds?.term !== "First Term" && (
                    <div className="table-data">
                      <h4>Second Term</h4>
                    </div>
                  )}
                  {!(
                    locationState?.creds?.term === "First Term" ||
                    locationState?.creds?.term === "Second Term"
                  ) ? (
                    <div className="table-data">
                      <h4>Third Term</h4>
                    </div>
                  ) : null}
                  {!(
                    locationState?.creds?.term === "First Term" ||
                    locationState?.creds?.term === "Second Term"
                  ) ? (
                    <div className="table-data">
                      <h4>Total</h4>
                    </div>
                  ) : null}
                  <div className="table-data">
                    <h4>Average</h4>
                  </div>
                  <div className="table-data">
                    <h4>Remark</h4>
                  </div>
                  <div className="table-data">
                    <h4>Rank</h4>
                  </div>
                  <div className="table-data">
                    <h4>Class Average</h4>
                  </div>
                  <div className="table-data">
                    <h4>Highest</h4>
                  </div>
                  <div className="table-data">
                    <h4>Lowest</h4>
                  </div>
                </div>
              </div>
              <div className="table-row">
                <div className="table-data">
                  <h4>Max Scores</h4>
                </div>
                <div className="right-data">
                  <div className="table-data">
                    <h4>100</h4>
                  </div>
                  {locationState?.creds?.term !== "First Term" && (
                    <div className="table-data">
                      <h4>100</h4>
                    </div>
                  )}
                  {!(
                    locationState?.creds?.term === "First Term" ||
                    locationState?.creds?.term === "Second Term"
                  ) ? (
                    <div className="table-data">
                      <h4>100</h4>
                    </div>
                  ) : null}
                  {!(
                    locationState?.creds?.term === "First Term" ||
                    locationState?.creds?.term === "Second Term"
                  ) ? (
                    <div className="table-data">
                      <h4>100</h4>
                    </div>
                  ) : null}
                  <div className="table-data">
                    <h4>100.00</h4>
                  </div>
                  <div className="table-data">
                    <h4>Excellent</h4>
                  </div>
                  <div className="table-data">
                    <h4>
                      N<sup>th</sup>
                    </h4>
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
                </div>
              </div>
              {cummulativeScores?.map((score, key) => (
                <div className="table-row" key={key}>
                  <div className="table-data">
                    <p>{score.subject}</p>
                  </div>
                  <div className="right-data">
                    <div className="table-data">
                      <p>{score["First Term"]}</p>
                    </div>
                    {locationState?.creds?.term !== "First Term" && (
                      <div className="table-data">
                        <p>{score["Second Term"]}</p>
                      </div>
                    )}
                    {!(
                      locationState?.creds?.term === "First Term" ||
                      locationState?.creds?.term === "Second Term"
                    ) ? (
                      <div className="table-data">
                        <p>{score["Third Term"]}</p>
                      </div>
                    ) : null}
                    {!(
                      locationState?.creds?.term === "First Term" ||
                      locationState?.creds?.term === "Second Term"
                    ) ? (
                      <div className="table-data">
                        <p>{score["Total Score"]}</p>
                      </div>
                    ) : null}
                    <div className="table-data">
                      <p>{Number(score["Average Score"]).toFixed(2)}</p>
                    </div>
                    <div className="table-data">
                      <p>{score["Remark"]}</p>
                    </div>
                    <div className="table-data">
                      <h4>{score["Rank"]}</h4>
                    </div>
                    <div className="table-data">
                      <h4>{score["Class Average"]}</h4>
                    </div>
                    <div className="table-data">
                      <h4>{score["Highest"]}</h4>
                    </div>
                    <div className="table-data">
                      <h4>{score["Lowest"]}</h4>
                    </div>
                  </div>
                </div>
              ))}
              {locationState?.creds?.term === "Third Term" && (
                <div className="table-row year-total-score">
                  <div className="table-data">
                    <p>End of year total score</p>
                  </div>
                  <div className="right-data">
                    <div className="table-data"></div>
                    <div className="table-data"></div>
                    <div className="table-data"></div>
                    <div className="table-data">
                      <p>{getTotalYearlyScores()}</p>
                    </div>
                    <div className="table-data"></div>
                    <div className="table-data"></div>
                    <div className="table-data"></div>
                    <div className="table-data"></div>
                    <div className="table-data"></div>
                    <div className="table-data"></div>
                  </div>
                </div>
              )}
              <div className="table-data">
                <br />
                <br />
              </div>
            </div>
            {locationState?.creds?.term === "Third Term" && (
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
                    <p>
                      {Number(
                        yearlyClassAverage?.["Class Average"] || 0
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div className="table-data">
                    <p>
                      {Number(
                        yearlyClassAverage?.["Student Average"] || 0
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div className="table-data">
                    <p>{yearlyClassAverage?.["Grade"]}</p>
                  </div>
                </div>
              </div>
            )}
            <div className="table-data performance-remark">
              <h1>Performance Remark: </h1>
              <h1>{additionalCreds?.performance_remark}</h1>
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
              {additionalCreds?.affective_disposition?.map((skill, key) => (
                <div className="table-row" key={key}>
                  <div className="table-data">{skill?.name}</div>
                  <div className="table-data">
                    <p>
                      {Number(skill?.score) === 5 && (
                        <FontAwesomeIcon icon={faCheck} color="green" />
                      )}
                    </p>
                  </div>
                  <div className="table-data">
                    <p>
                      {Number(skill?.score) === 4 && (
                        <FontAwesomeIcon icon={faCheck} color="green" />
                      )}
                    </p>
                  </div>
                  <div className="table-data">
                    <p>
                      {Number(skill?.score) === 3 && (
                        <FontAwesomeIcon icon={faCheck} color="green" />
                      )}
                    </p>
                  </div>
                  <div className="table-data">
                    <p>
                      {Number(skill?.score) < 3 && (
                        <FontAwesomeIcon icon={faCheck} color="green" />
                      )}
                    </p>
                  </div>
                </div>
              ))}
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
              {additionalCreds?.psychomotor_skills?.map((skill, key) => (
                <div className="table-row" key={key}>
                  <div className="table-data">{skill?.name}</div>
                  <div className="table-data">
                    <p>
                      {Number(skill?.score) === 5 && (
                        <FontAwesomeIcon icon={faCheck} color="green" />
                      )}
                    </p>
                  </div>
                  <div className="table-data">
                    <p>
                      {Number(skill?.score) === 4 && (
                        <FontAwesomeIcon icon={faCheck} color="green" />
                      )}
                    </p>
                  </div>
                  <div className="table-data">
                    <p>
                      {Number(skill?.score) === 3 && (
                        <FontAwesomeIcon icon={faCheck} color="green" />
                      )}
                    </p>
                  </div>
                  <div className="table-data">
                    <p>
                      {Number(skill?.score) < 3 && (
                        <FontAwesomeIcon icon={faCheck} color="green" />
                      )}
                    </p>
                  </div>
                </div>
              ))}
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
                <p>{Object.values(chartTitle).join(", ")}</p>

                <div className="table-chart">
                  <ColumnChart
                    xTitle="Subjects"
                    yTitle="Scores"
                    categories={generateChartData()?.categories || []}
                    data={[
                      {
                        name: chartTitle.first,
                        data: generateChartData()?.first || [],
                      },
                      {
                        name: chartTitle.second,
                        data: generateChartData()?.second || [],
                      },
                      {
                        name: chartTitle.third,
                        data: generateChartData()?.third || [],
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
            <div className="table-head">
              <h3>Principal's Comment</h3>
            </div>
            <div className="comment">
              <h4>{additionalCreds?.hos_comment}</h4>
              <div className="signature">
                <div>
                  {additionalCreds?.hos_signature && (
                    <img src={additionalCreds?.hos_signature} alt="" />
                  )}
                  <div className="line" />
                  <h3>{additionalCreds?.hos_fullname}</h3>
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
