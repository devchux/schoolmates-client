import React from "react";
import PageSheet from "../../../../../components/common/page-sheet";
import { useResults } from "../../../../../hooks/useResults";
import ProfileImage from "../../../../../components/common/profile-image";
import { useAppContext } from "../../../../../hooks/useAppContext";
import Button from "../../../../../components/buttons/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPrint } from "@fortawesome/free-solid-svg-icons";

const SubjectTable = ({ subject, header = [], topics = [] }) => {
  return (
    <div className="subject-table">
      <div className="table-subhead">
        <h4>{subject}</h4>
      </div>
      <div className="subject-main-table">
        <div>
          <div className="table-data">
            <h4>{subject}</h4>
          </div>
          <div className="score-part">
            {header.map((h) => (
              <div
                key={h}
                className="table-data subject-head"
                style={{ width: `${100 / header.length}%` }}
              >
                <h4>{h}</h4>
              </div>
            ))}
          </div>
        </div>
        {topics.map((t) => (
          <div key={t.topic}>
            <div className="table-data">
              <h4>{t.topic}</h4>
            </div>
            <div className="score-part">
              {header.map((h) => (
                <div
                  key={h}
                  className="table-data"
                  style={{ width: `${100 / header.length}%` }}
                >
                  {t.score === h && (
                    <FontAwesomeIcon icon={faCheck} color="green" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PreSchoolResult = () => {
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
    preSchoolCompiledResults,
  } = useResults();

  const result =
    preSchoolCompiledResults?.find(
      ({ student_id }) => student_id === studentData.id
    ) ?? null;

  return (
    <div className="results-sheet">
      {user?.designation_name !== "Student" && (
        <div className="students-wrapper">
          {studentByClassAndSession?.map((x) => (
            <div
              key={x.id}
              onClick={() => {
                setStudentData(x);
              }}
              className="student"
            >
              <div
                className={`loader ${isLoading ? "is-loading" : ""} ${
                  studentData.id === x.id ? "active" : ""
                }`}
              >
                <ProfileImage src={x?.image} alt={x.firstname} />
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
          className="first-level-results-sheet preschool"
        >
          <div className="school-details">
            <div className="image">
              {user?.school?.schlogo && (
                <img src={user?.school?.schlogo} alt="school" />
              )}
            </div>
            <div className="text">
              <h3 className="name">{user?.school?.schname}</h3>
              {user?.school?.schnmotto && (
                <p className="motto">({user?.school?.schnmotto})</p>
              )}

              <p className="address">{user?.school?.schaddr}</p>
              <p className="tel">Tel: {user?.school?.schphone}</p>
              <p className="email">Email: {user?.school?.schemail}</p>
              <p className="web">Website: {user?.school?.schwebsite}</p>
            </div>
          </div>
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
              <h3>Attendance Record</h3>
            </div>
            <div className="attendance">
              <div>
                <div className="table-subhead">
                  <h4>Number of Times School Opened</h4>
                </div>
                <div className="table-data">
                  <h4>{result?.school_opened}</h4>
                </div>
              </div>
              <div>
                <div className="table-subhead">
                  <h4>Number of Times Present</h4>
                </div>
                <div className="table-data">
                  <h4>{result?.times_present}</h4>
                </div>
              </div>
              <div>
                <div className="table-subhead">
                  <h4>Number of Times Absent</h4>
                </div>
                <div className="table-data">
                  <h4>{result?.times_absent}</h4>
                </div>
              </div>
              <div>
                <div className="table-subhead">
                  <h4>This Term Ends</h4>
                </div>
                <div className="table-data">
                  <h4>{academicDate?.session_ends}</h4>
                </div>
              </div>
              <div>
                <div className="table-subhead">
                  <h4>Next Term Begins</h4>
                </div>
                <div className="table-data">
                  <h4>{academicDate?.session_resumes}</h4>
                </div>
              </div>
            </div>
            <div className="table-head">
              <h3>Evaluation Report</h3>
            </div>
            <div className="reports">
              <div>
                {result?.evaluation_report
                  ?.slice(0, Math.round(result?.evaluation_report?.length / 2))
                  ?.map((subject, key) => (
                    <SubjectTable
                      key={key}
                      subject={subject.subject}
                      header={[
                        "Needs Improvement",
                        "Fair",
                        "Good",
                        "Excellent",
                      ]}
                      topics={subject.topic}
                    />
                  ))}
              </div>
              <div>
                {result?.evaluation_report
                  ?.slice(Math.round(result?.evaluation_report?.length / 2))
                  ?.map((subject, key) => (
                    <SubjectTable
                      key={key}
                      subject={subject.subject}
                      header={[
                        "Needs Improvement",
                        "Fair",
                        "Good",
                        "Excellent",
                      ]}
                      topics={subject.topic}
                    />
                  ))}
              </div>
            </div>
            <div className="table-head">
              <h3>Cognitive Report</h3>
            </div>
            <div className="reports">
              <div>
                {result?.cognitive_development
                  ?.slice(0, Math.round(result?.evaluation_report?.length / 2))
                  ?.map((subject, key) => (
                    <SubjectTable
                      key={key}
                      subject={subject.subject}
                      header={[
                        "Work in Progress",
                        "Needs Reinforcement",
                        "Archieved",
                      ]}
                      topics={subject.topic}
                    />
                  ))}
              </div>
              <div>
                {result?.cognitive_development
                  ?.slice(Math.round(result?.evaluation_report?.length / 2))
                  ?.map((subject, key) => (
                    <SubjectTable
                      key={key}
                      subject={subject.subject}
                      header={[
                        "Work in Progress",
                        "Needs Reinforcement",
                        "Archieved",
                      ]}
                      topics={subject.topic}
                    />
                  ))}
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
              <h3>Head Teacher's (Pre-School) Comment</h3>
            </div>
            <div className="comment">
              <h4>{result?.hos_comment}</h4>
              <div className="signature">
                <div>
                  {result?.hos_signature && (
                    <img src={result?.hos_signature} alt="" />
                  )}
                  <div className="line" />
                  <h3>{result?.hos_fullname}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageSheet>
    </div>
  );
};

export default PreSchoolResult;
