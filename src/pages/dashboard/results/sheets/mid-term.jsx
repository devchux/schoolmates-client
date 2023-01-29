import React from "react";
import { Col, Row } from "reactstrap";
import Button from "../../../../components/buttons/button";
import PageSheet from "../../../../components/common/page-sheet";
import logoImage from "../../../../assets/images/logo.jpeg";
import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import ButtonGroup from "../../../../components/buttons/button-group";
import { useNavigate } from "react-router-dom";

const MidTerm = ({ isCompute = false }) => {
  const navigate = useNavigate();
  const pdfExportComponent = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => pdfExportComponent.current,
  });
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

      <div ref={pdfExportComponent} className="first-level-results-sheet">
        <div className="school-details">
          <div className="image">
            <img src={logoImage} alt="school" />
          </div>
          <h3 className="name">GOSHEN PILLARS MONTESSORI SCHOOL</h3>
          <p className="address">PLOT 313 Durbar Road, Amuwo Odofin, Lagos.</p>
          <p className="tel">Tel: 08066870246, 08105565900, 08034092723</p>
          <p className="email">Email: goshenpillarsmontessori@gmail.com</p>
          <p className="web">Website: www.gpmsportal.com.ng</p>
          <h4 className="title">
            FIRST TERM MID-TERM REPORT 2021/2022 SESSION
          </h4>
        </div>
        <div className="student-details">
          <Row>
            <Col>
              <div className="detail">
                <h5>Name:</h5>
                <input type="text" value="AMADIKE IFUNANYA PRECIOUS" disabled />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="detail">
                <h5>Class:</h5>
                <input type="text" value="YEAR 3 RUBY" disabled />
              </div>
            </Col>
            <Col>
              <div className="detail">
                <h5>Gender:</h5>
                <input type="text" value="FEMALE" disabled />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="detail">
                <h5>Date:</h5>
                <input type="text" value="28/01/2023" disabled={!isCompute} />
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
                    {isCompute && <Button className="ms-3">&#43; Add</Button>}
                  </div>
                </th>
                <th>MID TERM TEST</th>
              </tr>
              <tr>
                <th>MARKS OBTAINABLE</th>
                <th>40 MARKS</th>
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
                <td>
                  <input
                    type="text"
                    value="30"
                    className="form-control"
                    disabled={!isCompute}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    {isCompute && (
                      <Button variant="danger" className="me-3">
                        &#8722;
                      </Button>
                    )}
                    ENGLISH STUDIES
                  </div>
                </td>
                <td>
                  <input
                    type="text"
                    value="35"
                    className="form-control"
                    disabled={!isCompute}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    {isCompute && (
                      <Button variant="danger" className="me-3">
                        &#8722;
                      </Button>
                    )}
                    BASIC SCIENCE AND TECHNOLOGY
                  </div>
                </td>
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
            <tfoot>
              <tr>
                <th>TOTAL SCORES</th>
                <th>539</th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="results-remark">
          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>Ogene Onyinye</td>
                <td>Sign:</td>
                <td></td>
                <td>Date:</td>
                <td>28/10/2021</td>
              </tr>
              <tr>
                <td />
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
      </div>
    </PageSheet>
  );
};

export default MidTerm;
