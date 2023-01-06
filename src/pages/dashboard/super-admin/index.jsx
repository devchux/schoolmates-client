import React from "react";
import { Col, Row, Button as RSButton } from "reactstrap";
import PageSheet from "../../../components/common/page-sheet";
import GoBack from "../../../components/common/go-back";
import AuthInput from "../../../components/inputs/auth-input";
import Button from "../../../components/buttons/button";
import ButtonGroup from "../../../components/buttons/button-group";
import CustomTable from "../../../components/tables/table";

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
        <div>
          <CustomTable
            columns={[
              {
                Header: "Column 1",
                accessor: "col1",
              },
              {
                Header: "Column 2",
                accessor: "col2",
              },
              {
                Header: "Column 3",
                accessor: "col3",
              },
              {
                Header: "Column 4",
                accessor: "col4",
              },
              {
                Header: "Column 5",
                accessor: "col5",
              },
            ]}
            data={[
              {
                col1: "Hello",
                col2: "World",
                col3: "World",
                col4: "World",
                col5: "World",
              },
              {
                col1: "react-table react-table react-table react-table react-table",
                col2: "rocks react-table react-table react-table react-table react-table",
                col3: "World react-table react-table react-table react-table react-table react-table react-table react-table react-table react-table react-table react-table",
                col4: "World react-table react-table react-table react-table react-table react-table",
                col5: "World",
              },
              {
                col1: "whatever",
                col2: "you want",
                col3: "World",
                col4: "World",
                col5: "World",
              },
            ]}
          />
        </div>
      </PageSheet>
    </div>
  );
};

export default SuperAdmin;
