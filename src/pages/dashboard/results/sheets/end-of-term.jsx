import { faCheck, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/buttons/button";
import PageSheet from "../../../../components/common/page-sheet";
import logoImage from "../../../../assets/images/logo.jpeg";
import { Col, Row, Table } from "reactstrap";
import ButtonGroup from "../../../../components/buttons/button-group";
import Prompt from "../../../../components/modals/prompt";
import { useResults } from "../../../../hooks/useResults";

const AffectiveDispositionTableRow = ({ isCompute, title }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>
        {isCompute ? (
          <input type="radio" />
        ) : (
          <FontAwesomeIcon icon={faCheck} color="green" />
        )}
      </td>
      <td>
        {isCompute ? (
          <input type="radio" />
        ) : (
          <FontAwesomeIcon icon={faCheck} color="green" />
        )}
      </td>
      <td>
        {isCompute ? (
          <input type="radio" />
        ) : (
          <FontAwesomeIcon icon={faCheck} color="green" />
        )}
      </td>
      <td>
        {isCompute ? (
          <input type="radio" />
        ) : (
          <FontAwesomeIcon icon={faCheck} color="green" />
        )}
      </td>
      <td>
        {isCompute ? (
          <input type="radio" />
        ) : (
          <FontAwesomeIcon icon={faCheck} color="green" />
        )}
      </td>
    </tr>
  );
};

const EndOfTerm = ({ isCompute = false }) => {
  const navigate = useNavigate();
  const {
    // isLoading,
    academicDate,
    // permission,
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
    pdfExportComponent,
    handlePrint,
    maxScores,
  } = useResults();

  return (
    <PageSheet>
      {!isCompute && (
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
      )}

      <div
        ref={pdfExportComponent}
        className="first-level-results-sheet end-term"
      >
        <div className="school-details">
          <div>
            <div className="image">
              <img src={logoImage} alt="school" />
            </div>
            <div className="text">
              <h3 className="name">
                GOSHEN PILLARS GOSHEN PILLARS GOSHEN PILLARS GOSHEN PILLARS
                MONTESSORI SCHOOL
              </h3>
              <p className="motto">(Motto: Brighter Future Begins Here)</p>
              <p className="address">
                PLOT 313 Durbar Road, Amuwo Odofin, Lagos.
              </p>
              <p className="tel">Tel: 08066870246, 08105565900, 08034092723</p>
              <p className="email">Email: goshenpillarsmontessori@gmail.com</p>
              <p className="web">Website: www.gpmsportal.com.ng</p>
            </div>
            <div className="image">
              <img src={logoImage} alt="school" />
            </div>
          </div>
          <h4 className="title">2021/2022 FIRST TERM REPORT SHEET</h4>
        </div>
        <div className="student-details">
          <Row>
            <Col>
              <div className="detail">
                <h5>Pupil's Name:</h5>
                <h5> AMADIKE IFUNANYA PRECIOUS</h5>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="detail">
                <h5>Admission No:</h5>
                <h5> Gpms/21/22/00498</h5>
              </div>
            </Col>
            <Col>
              <div className="detail">
                <h5>Date of Birth:</h5>
                <h5> 12 MAY 2015</h5>
              </div>
            </Col>
            <Col>
              <div className="detail">
                <h5>Class: </h5>
                <h5> YEAR 3 RUBY</h5>
              </div>
            </Col>
          </Row>
        </div>
        <div className="attendance-wrapper">
          <h4 className="title">1. Attendance Record</h4>
          <div className="table-wrapper">
            <Row>
              <Col>
                <Table>
                  <tbody>
                    <tr>
                      <td>No. of Times School Opened</td>
                      <td>
                        <input
                          type="text"
                          value="40"
                          className="form-control"
                          disabled={!isCompute}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>No. of Times Present</td>
                      <td>
                        <input
                          type="text"
                          value="40"
                          className="form-control"
                          disabled={!isCompute}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>No. of Times Absent</td>
                      <td>
                        <input
                          type="text"
                          value="40"
                          className="form-control"
                          disabled={!isCompute}
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col>
                <Table>
                  <tbody>
                    <tr>
                      <td>First Term 2021/2022 Academic Session Ends:</td>
                      <td>{academicDate?.session_ends}</td>
                    </tr>
                    <tr>
                      <td>Second Term 2021/2022 Academic Session Resumes:</td>
                      <td>{academicDate?.session_resumes}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
        </div>
        <div className="results-table-wrapper">
          <h4 className="title">2. COGNITIVE PERFORMANCE</h4>
          <Table>
            <thead>
              <tr>
                <th>
                  <div className="d-flex align-items-center">
                    SUBJECTS
                    {isCompute && <Button className="ms-3">&#43; Add</Button>}
                  </div>
                </th>
                <th>MID TERM TEST</th>
                <th>EXAM SCORES</th>
                <th>TOTAL SCORES</th>
                <th>REMARKS</th>
              </tr>
              <tr>
                <th>MAXIMUM SCORES</th>
                <th>{maxScores?.midterm}</th>
                <th>{maxScores?.exam}</th>
                <th>{maxScores?.total}</th>
                <th>EXCELLENT</th>
              </tr>
              <tr>
                <th />
                <th />
                <th />
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    {isCompute && (
                      <Button variant="danger" className="me-3">
                        &#8722;
                      </Button>
                    )}
                    MATHEMATICS
                  </div>
                </td>
                <td>34</td>
                <td>
                  <input
                    type="text"
                    value="30"
                    className="form-control"
                    disabled={!isCompute}
                  />
                </td>
                <td>64</td>
                <td>VERY GOOD</td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    {isCompute && (
                      <Button variant="danger" className="me-3">
                        &#8722;
                      </Button>
                    )}
                    CITIZENSHIP EDUCATION
                  </div>
                </td>
                <td>34</td>
                <td>
                  <input
                    type="text"
                    value="30"
                    className="form-control"
                    disabled={!isCompute}
                  />
                </td>
                <td>64</td>
                <td>ABOVE AVERAGE</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>TOTAL SCORES</th>
                <th>539</th>
                <th>539</th>
                <th>539</th>
                <th></th>
              </tr>
              <tr>
                <th />
                <th />
                <th />
                <th />
                <th />
              </tr>
              <tr>
                <th>STUDENT’S OVERALL AVERAGE</th>
                <th>91.2</th>
                <th>STUDENT’S OVERALL GRADE POINT </th>
                <th>A</th>
                <th></th>
              </tr>
            </tfoot>
          </Table>
        </div>
        <div className="mb-5 socials-wrapper">
          <Row>
            <Col>
              <h4 className="title">3. AFFECTIVE DISPOSITION</h4>
              <Table>
                <thead>
                  <tr>
                    <th>Behaviours</th>
                    <th colSpan="5">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td />
                    <td>5</td>
                    <td>4</td>
                    <td>3</td>
                    <td>2</td>
                    <td>1</td>
                  </tr>
                  <AffectiveDispositionTableRow
                    isCompute={isCompute}
                    title="Attentiveness"
                  />
                  <AffectiveDispositionTableRow
                    isCompute={isCompute}
                    title="Cooperation with others"
                  />
                  <AffectiveDispositionTableRow
                    isCompute={isCompute}
                    title="Emotional Stability"
                  />
                  <AffectiveDispositionTableRow
                    isCompute={isCompute}
                    title="Helping others"
                  />
                  <AffectiveDispositionTableRow
                    isCompute={isCompute}
                    title="Honesty"
                  />
                  <AffectiveDispositionTableRow
                    isCompute={isCompute}
                    title="Leadership"
                  />
                  <AffectiveDispositionTableRow
                    isCompute={isCompute}
                    title="Neatness"
                  />
                  <AffectiveDispositionTableRow
                    isCompute={isCompute}
                    title="Perseverance"
                  />
                  <AffectiveDispositionTableRow
                    isCompute={isCompute}
                    title="Politeness"
                  />
                  <AffectiveDispositionTableRow
                    isCompute={isCompute}
                    title="Punctuality"
                  />
                </tbody>
              </Table>
            </Col>
            <Col>
              <h4 className="title">4. PSYCHOMOTOR SKILLS</h4>
              <Table>
                <thead>
                  <tr>
                    <th>Behaviours</th>
                    <th colSpan="5">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td />
                    <td>5</td>
                    <td>4</td>
                    <td>3</td>
                    <td>2</td>
                    <td>1</td>
                  </tr>
                  <AffectiveDispositionTableRow
                    isCompute={isCompute}
                    title="Handling Tools"
                  />
                  <AffectiveDispositionTableRow
                    isCompute={isCompute}
                    title="Games"
                  />
                  <AffectiveDispositionTableRow
                    isCompute={isCompute}
                    title="Music"
                  />
                  <AffectiveDispositionTableRow
                    isCompute={isCompute}
                    title="Sports"
                  />
                  <AffectiveDispositionTableRow
                    isCompute={isCompute}
                    title="Verbal Fluency"
                  />
                </tbody>
              </Table>
              <p className="text-center">
                Keys: 5 = Excellent 4 = Good 3 = Fair 2 = Poor 1 = Very Poor
              </p>
            </Col>
          </Row>
        </div>
        <div className="results-remark">
          <table>
            <tbody>
              <tr>
                <td colSpan="6">Teacher's Comment</td>
              </tr>
              <tr>
                <td colSpan="6">
                  {isCompute ? (
                    <>
                      <textarea
                        className="form-control"
                        type="text"
                        value={teacherComment}
                        onChange={({ target: { value } }) =>
                          setTeacherComment(value)
                        }
                      />
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setComment("teacher");
                          setOpenPrompt(true);
                        }}
                      >
                        suggest
                      </button>
                    </>
                  ) : (
                    teacherComment
                  )}
                </td>
              </tr>
              <tr>
                <td>Name:</td>
                <td>Ogene Onyinye</td>
                <td>Sign:</td>
                <td></td>
                <td>Date:</td>
                <td>28/10/2021</td>
              </tr>
              <tr>
                <td colSpan="6" />
              </tr>
              <tr>
                <td colSpan="6">HOS's Comment</td>
              </tr>
              <tr>
                <td colSpan="6">
                  {isCompute ? (
                    <>
                      <textarea
                        className="form-control"
                        value={hosComment}
                        onChange={({ target: { value } }) =>
                          setHosComment(value)
                        }
                      />
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setComment("hos");
                          setOpenPrompt(true);
                        }}
                      >
                        suggest
                      </button>
                    </>
                  ) : (
                    hosComment
                  )}
                </td>
              </tr>
              <tr>
                <td>Name:</td>
                <td>Ogene Onyinye</td>
                <td>Sign:</td>
                <td></td>
                <td>Date:</td>
                <td>28/10/2021</td>
              </tr>
            </tbody>
          </table>
        </div>
        {isCompute && (
          <div className="mt-3 d-flex justify-content-end">
            <ButtonGroup
              options={[
                {
                  title: "Cancel",
                  variant: "outline",
                  onClick: () => navigate(-1 || "/"),
                },
                {
                  title: "Save",
                  type: "submit",
                  isLoading: false,
                  disabled: false,
                },
              ]}
            />
          </div>
        )}
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
          <div className="modal-result-comment-select-options">
            <input
              type="radio"
              name="selectedComment"
              onChange={({ target: { value } }) => setSelectedComment(value)}
              value="Although Kene's academic performance is quite commendable, however, she still lacks the basic life skills to make expected progress in the future. More support from the home front is required."
            />
            <p>
              Although Kene's academic performance is quite commendable,
              however, she still lacks the basic life skills to make expected
              progress in the future. More support from the home front is
              required.
            </p>
          </div>
          <div className="modal-result-comment-select-options">
            <input
              type="radio"
              name="selectedComment"
              onChange={({ target: { value } }) => setSelectedComment(value)}
              value="Lekan was not able to prove himself in this academic session. It is hoped that in the next class, he will put in more effort. Promoted on trial."
            />
            <p>
              Lekan was not able to prove himself in this academic session. It
              is hoped that in the next class, he will put in more effort.
              Promoted on trial.
            </p>
          </div>
          <div className="modal-result-comment-select-options">
            <input
              type="radio"
              name="selectedComment"
              onChange={({ target: { value } }) => setSelectedComment(value)}
              value="Chioma's outstanding performance has earned her this move to the next class. promoted. Congratulations!"
            />
            <p>
              Chioma's outstanding performance has earned her this move to the
              next class. promoted. Congratulations!
            </p>
          </div>
          <div className="modal-result-comment-select-options">
            <input
              type="radio"
              name="selectedComment"
              onChange={({ target: { value } }) => setSelectedComment(value)}
              value="....has progressed nicely in all learning areas. I have no doubt that he is ready for the next level. promoted to the next class. Congratulations."
            />
            <p>
              ....has progressed nicely in all learning areas. I have no doubt
              that he is ready for the next level. promoted to the next class.
              Congratulations.
            </p>
          </div>
        </Prompt>
      </div>
    </PageSheet>
  );
};

export default EndOfTerm;
