import React from "react";
import { Col, Row } from "reactstrap";
import Button from "../../../../components/buttons/button";
import PageSheet from "../../../../components/common/page-sheet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import ButtonGroup from "../../../../components/buttons/button-group";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../../../../components/common/profile-image";
import moment from "moment";
import { useResults } from "../../../../hooks/useResults";
import Prompt from "../../../../components/modals/prompt";
import AuthSelect from "../../../../components/inputs/auth-select";

const MidTerm = ({ isCompute = false }) => {
  const navigate = useNavigate();

  const {
    isLoading,
    // permission,
    openPrompt,
    setOpenPrompt,
    pdfExportComponent,
    handlePrint,
    maxScores,
    user,
    studentData,
    setStudentData,
    locationState,
    subjects,
    subjectsByClass,
    setSubjects,
    getTotalScores,
    removeSubject,
    studentByClassAndSession,
    createMidTermResult,
    setInitGetExistingResult,
  } = useResults();

  const getAddSubjectSelectOptions = () => {
    const mapSubjects = subjectsByClass?.map((x) => ({
      title: x.subject,
      value: { ...x, grade: "0" },
    }));

    const options = mapSubjects?.filter(
      (x) => !subjects?.some((s) => s.subject === x.title)
    );

    return options;
  };

  return (
    <div className="results-sheet">
      {user?.designation_name !== "Student" && (
        <div className="students-wrapper">
          {studentByClassAndSession?.map((x) => (
            <div
              key={x.id}
              onClick={() => {
                setStudentData(x);
                setInitGetExistingResult(true);
              }}
              className="student"
            >
              <div
                className={`loader ${isLoading ? "is-loading" : ""} ${
                  studentData.id === x.id ? "active" : ""
                }`}
              >
                <ProfileImage src={x?.image} alt={x.firstname} />
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

        <div ref={pdfExportComponent} className="first-level-results-sheet">
          <div className="school-details">
            <div className="image">
              <img src={user?.school?.schlogo} alt="school" />
            </div>
            <h3 className="name">{user?.school?.schname}</h3>
            <p className="address">{user?.school?.schaddr}</p>
            <p className="tel">Tel: {user?.school?.schphone}</p>
            <p className="email">Email: {user?.school?.schemail}</p>
            <p className="web">Website: {user?.school?.schwebsite}</p>
            <h4 className="title">
              {locationState?.creds?.term} MID-TERM REPORT{" "}
              {locationState?.creds?.session} SESSION
            </h4>
          </div>
          <div className="student-details">
            <Row>
              <Col>
                <div className="detail">
                  <h5>Name:</h5>
                  <input
                    type="text"
                    value={`${studentData?.firstname} ${studentData?.surname} ${studentData?.middlename}`}
                    disabled
                    onChange={() => null}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="detail">
                  <h5>Class:</h5>
                  <input
                    type="text"
                    value={`${studentData?.present_class} ${studentData?.sub_class}`}
                    disabled
                    onChange={() => null}
                  />
                </div>
              </Col>
              <Col>
                <div className="detail">
                  <h5>Gender:</h5>
                  <input
                    type="text"
                    value={studentData?.gender}
                    disabled
                    onChange={() => null}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="detail">
                  <h5>Date:</h5>
                  <input
                    type="text"
                    value={moment(new Date()).format("DD/MM/YYYY")}
                    disabled
                    onChange={() => null}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div className="results-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>
                    <div className="d-flex align-items-center">
                      SUBJECTS
                      {isCompute && (
                        <Button
                          className="ms-3"
                          onClick={() => setOpenPrompt(true)}
                        >
                          &#43; Add
                        </Button>
                      )}
                    </div>
                  </th>
                  <th>MID TERM TEST</th>
                </tr>
                <tr>
                  <th>MARKS OBTAINABLE</th>
                  <th>{maxScores?.midterm} MARKS</th>
                </tr>
              </thead>
              <tbody>
                {subjects?.map((x, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center">
                        {isCompute && (
                          <Button
                            variant="danger"
                            className="me-3"
                            onClick={() => removeSubject(x.subject)}
                          >
                            &#8722;
                          </Button>
                        )}
                        {x.subject}
                      </div>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={x.grade}
                        className="form-control"
                        disabled={!isCompute}
                        onChange={({ target: { value } }) => {
                          if (Number.isNaN(Number(value))) return;

                          if (Number(value) > Number(maxScores?.midterm))
                            return;

                          const fd = subjects.map((s) => ({
                            ...s,
                            grade: s.subject === x.subject ? value : s.grade,
                          }));

                          setSubjects(fd);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>TOTAL SCORES</th>
                  <th>{getTotalScores()}</th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="results-remark">
            <table>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td className="text-capitalize">Ogene Onyinye</td>
                  <td>Sign:</td>
                  <td></td>
                  <td>Date:</td>
                  <td>{moment(new Date()).format("DD/MM/YYYY")}</td>
                </tr>
                <tr>
                  <td />
                </tr>
                <tr>
                  <td>Name:</td>
                  <td className="text-capitalize">
                    {user?.firstname} {user?.surname}
                  </td>
                  <td>Sign:</td>
                  <td></td>
                  <td>Date:</td>
                  <td>{moment(new Date()).format("DD/MM/YYYY")}</td>
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
                    isLoading: isLoading,
                    disabled: isLoading || subjects.length === 0,
                    onClick: createMidTermResult,
                  },
                ]}
              />
            </div>
          )}
        </div>
        <Prompt
          isOpen={openPrompt}
          toggle={() => setOpenPrompt(!openPrompt)}
          singleButtonProps={{
            type: "button",
            isLoading: false,
            disabled: false,
            onClick: () => setOpenPrompt(false),
          }}
          singleButtonText="OK"
          promptHeader="Add Subject"
        >
          <AuthSelect
            advanced
            isMulti
            options={getAddSubjectSelectOptions()}
            onChange={(item) => {
              const fd = item?.map((x) => ({ ...x.value }));

              setSubjects([...subjects, ...fd]);
            }}
          />
        </Prompt>
      </PageSheet>
    </div>
  );
};

export default MidTerm;
