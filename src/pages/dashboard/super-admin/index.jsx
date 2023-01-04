import React from "react";
import { Col, Row } from "reactstrap";
import PageSheet from "../../../components/common/page-sheet";
import GoBack from "../../../components/common/go-back";
import AuthInput from "../../../components/inputs/auth-input";

const SuperAdmin = () => {
  return (
    <div>
      <GoBack />
      <PageSheet>
        <Row>
          <Col md="6">
            <AuthInput label="Email Address" />
          </Col>
          <Col md="6">
            <label className="mb-2">Email</label>
            <AuthInput />
          </Col>
        </Row>
      </PageSheet>
    </div>
  );
};

export default SuperAdmin;
