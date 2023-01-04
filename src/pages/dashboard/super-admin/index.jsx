import React from "react";
import { Col, Row, Button as RSButton } from "reactstrap";
import PageSheet from "../../../components/common/page-sheet";
import GoBack from "../../../components/common/go-back";
import AuthInput from "../../../components/inputs/auth-input";
import Button from "../../../components/buttons/button";
import ButtonGroup from "../../../components/buttons/button-group";

const SuperAdmin = () => {
  return (
    <div>
      <GoBack />
      <PageSheet>
        <ButtonGroup
          options={[
            { title: "Cancel", variant: "outline", onClick: null },
            { title: "Save", onClick: null },
          ]}
        />
        <Row className="mb-0 mb-sm-4">
          <Col sm="6" className="mb-4 mb-sm-0">
            <AuthInput label="Email Address" />
          </Col>
          <Col sm="6" className="mb-4 mb-sm-0">
            <label className="mb-2">Email</label>
            <AuthInput />
          </Col>
        </Row>
        <Row className="mb-0 mb-sm-4">
          <Col sm="6" className="mb-4 mb-sm-0">
            <AuthInput label="Email Address" />
          </Col>
          <Col sm="6" className="mb-4 mb-sm-0">
            <label className="mb-2">Email</label>
            <AuthInput />
          </Col>
        </Row>
        <Button>Save</Button>
        <RSButton>Save</RSButton>
      </PageSheet>
    </div>
  );
};

export default SuperAdmin;
