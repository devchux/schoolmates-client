import React from "react";
import { Col, Row, Spinner } from "reactstrap";
import PageTitle from "../../../../components/common/title";
import HomeCard from "../../../../components/cards/home-card";
import ProfileCard from "../../../../components/cards/profile-card";
import { useHome } from "../../../../hooks/useHome";
import Numeral from "react-numeral";
import {
  useAcademicPeriod,
  useMaintenancePeriod,
} from "../../../../hooks/useAcademicPrompt";
import { useAppContext } from "../../../../hooks/useAppContext";
import { useForm } from "react-formid";
import AuthInput from "../../../../components/inputs/auth-input";
import AuthSelect from "../../../../components/inputs/auth-select";
import Prompt from "../../../../components/modals/prompt";
import DetailView from "../../../../components/views/detail-view";

const Account = () => {
  const {  user } = useAppContext();
  const {
    apiServices: { handleSessionChange },
  } = useAppContext();
  const {
    isLoading,
    outstanding,
    expectedIncome,
    discount,
    totalExpense,
    accountBalance,
    receivedIncome,
    faBusinessTime,
    faCar,
  } = useHome();
  const {
    handleChange,
    inputs,
    errors,
    setFieldValue,
    handleSubmit,
    getFieldProps,
  } = useForm({
    defaultValues: {
      period: "First Half",
      session: "",
      term: "First Term",
   
      vehicle_type: "",
      vehicle_make: "",
      vehicle_number: "",
      driver_name: "",
      detected_fault: "",
      mechanic_name: "",
      mechanic_phone: "",
      cost_of_maintenance: "",
      initial_payment: "",
    },
    validation: {
      period: {
        required: true,
      },
      session: {
        required: true,
      },
      term: {
        required: true,
      },
    },
  });
  const onSubmit = (data) => {
    postMaintenance({
      body: {
        ...data,
        id: user.id,
      },
    });
  };
  const { postAcademicPeriod, academicPeriodPrompt, setAcademicPeriodPrompt } =
    useAcademicPeriod();
  const { maintenancePrompt, setMaintenancePrompt, postMaintenance } =
    useMaintenancePeriod();

  return (
    <div>
      <PageTitle>Accounts {isLoading && <Spinner />}</PageTitle>
      <ProfileCard type="account" />
      <Row className="mt-5">
        <Col sm="6" md="4" className="mb-4">
          <HomeCard
            title="Account Balance"
            amount={
              <>
                &#8358;
                <Numeral value={accountBalance?.data || "0"} format="0,0.00" />
              </>
            }
          />
        </Col>
        <Col sm="6" md="4" className="mb-4">
          <HomeCard
            title="Received Income"
            amount={
              <>
                &#8358;
                <Numeral value={receivedIncome?.data || "0"} format="0,0.00" />
              </>
            }
          />
        </Col>
        <Col sm="6" md="4" className="mb-4">
          <HomeCard
            title="Expected Income"
            amount={
              <>
                &#8358;
                <Numeral value={expectedIncome?.data || "0"} format="0,0.00" />
              </>
            }
          />
        </Col>
        <Col sm="6" md="4" className="mb-4">
          <HomeCard
            title="Expenditure"
            amount={
              <>
                &#8358;
                <Numeral value={totalExpense?.data || "0"} format="0,0.00" />
              </>
            }
          />
        </Col>
        <Col sm="6" md="4" className="mb-4">
          <HomeCard
            title="Discount"
            amount={
              <>
                &#8358;
                <Numeral value={discount?.data || "0"} format="0,0.00" />
              </>
            }
          />
        </Col>
        <Col sm="6" md="4" className="mb-4">
          <HomeCard
            title="Outstanding"
            amount={
              <Numeral value={outstanding?.data || "0"} format="0,0.00" />
            }
          />
        </Col>
        <Col sm="6" md="4" className="mb-4">
          <HomeCard
            title="Academic Period"
            icon={faBusinessTime}
            onClick={() => setAcademicPeriodPrompt(true)}
          />
        </Col>
        <Col sm="6" md="4" className="mb-4">
          <HomeCard
            title="Vehicle Maintenance"
            icon={faCar}
            onClick={() => setMaintenancePrompt(true)}
          />
        </Col>
      </Row>
      <Prompt
        isOpen={academicPeriodPrompt}
        toggle={() => setAcademicPeriodPrompt(!academicPeriodPrompt)}
        singleButtonProps={{
          type: "button",
          isLoading,
          disabled: isLoading || !inputs.session,
          onClick: () => postAcademicPeriod(inputs),
        }}
        singleButtonText="Continue"
        promptHeader="Post Academic Period"
      >
        <div className="form-group mb-4">
          <AuthSelect
            label="Period"
            value={inputs.period}
            name="period"
            hasError={!!errors.period}
            onChange={handleChange}
            options={[
              { value: "First Half", title: "First Half/Mid Term" },
              { value: "Second Half", title: "Second Half/End of Term" },
            ]}
          />
          {!!errors.period && <p className="error-message">{errors.period}</p>}
        </div>
        <div className="form-group mb-4">
          <AuthSelect
            label="Term"
            value={inputs.term}
            name="term"
            hasError={!!errors.term}
            onChange={handleChange}
            options={[
              { value: "First Term", title: "First Term" },
              { value: "Second Term", title: "Second Term" },
              { value: "Third Term", title: "Third Term" },
            ]}
          />
          {!!errors.term && <p className="error-message">{errors.term}</p>}
        </div>
        <div className="form-group mb-4">
          <AuthInput
            label="Session"
            value={inputs.session}
            name="session"
            hasError={!!errors.session}
            onChange={({ target: { value } }) =>
              handleSessionChange(value, "session", setFieldValue)
            }
          />
          {!!errors.session && (
            <p className="error-message">{errors.session}</p>
          )}
        </div>
      </Prompt>

      <Prompt
        isOpen={maintenancePrompt}
        toggle={() => setMaintenancePrompt(!maintenancePrompt)}
        singleButtonProps={{
          type: "button",
          isLoading,
          disabled: isLoading || !inputs.session,
          onClick: () => postMaintenance(inputs),
        }}
        promptHeader="Post Vehicle Maintenance"
      >
        <DetailView
          isLoading={isLoading}
          pageTitle="Vehicle Maintenance"
          onFormSubmit={handleSubmit(onSubmit)}
        >
          <Row className="mb-0 mb-sm-4">
            <Col sm="6" className="mb-4 mb-sm-0">
              <AuthInput
                label="Vehicle Type"
                hasError={!!errors.vehicle_type}
                {...getFieldProps("vehicle_type")}
              />
              {!!errors.vehicle_type && (
                <p className="error-message">{errors.vehicle_type}</p>
              )}
            </Col>
            <Col sm="6" className="mb-4 mb-sm-0">
              <AuthInput
                label="Vehicle Make"
                hasError={!!errors.vehicle_make}
                {...getFieldProps("vehicle_make")}
              />
              {!!errors.vehicle_make && (
                <p className="error-message">{errors.vehicle_make}</p>
              )}
            </Col>
          </Row>
          <Row className="mb-0 mb-sm-4">
            <Col sm="6" className="mb-4 mb-sm-0">
              <AuthInput
                label="Vehicle Number"
                hasError={!!errors.vehicle_number}
                {...getFieldProps("vehicle_number")}
              />
              {!!errors.vehicle_number && (
                <p className="error-message">{errors.vehicle_number}</p>
              )}
            </Col>
            <Col sm="6" className="mb-4 mb-sm-0">
              <AuthInput
                label="Driver Name "
                hasError={!!errors.driver_name}
                {...getFieldProps("driver_name")}
              />
              {!!errors.driver_name && (
                <p className="error-message">{errors.driver_name}</p>
              )}
            </Col>
          </Row>
          <Row className="mb-0 mb-sm-4">
            <Col sm="6" className="mb-4 mb-sm-0">
              <AuthInput
                label="Detected Fault"
                hasError={!!errors.detected_fault}
                {...getFieldProps("detected_fault")}
              />
              {!!errors.detected_fault && (
                <p className="error-message">{errors.detected_fault}</p>
              )}
            </Col>

            <Col sm="6" className="mb-4 mb-sm-0">
              <AuthInput
                label="Mechanic Name"
                hasError={!!errors.mechanic_name}
                {...getFieldProps("mechanic_name")}
              />
              {!!errors.mechanic_name && (
                <p className="error-message">{errors.mechanic_name}</p>
              )}
            </Col>
          </Row>
          <Row className="mb-0 mb-sm-4">
            <Col sm="6" className="mb-4 mb-sm-0">
              <AuthInput
                label="Mechanic Phone"
                hasError={!!errors.mechanic_phone}
                {...getFieldProps("mechanic_phone")}
              />
              {!!errors.mechanic_phone && (
                <p className="error-message">{errors.mechanic_phone}</p>
              )}
            </Col>

            <Col sm="6" className="mb-4 mb-sm-0">
              <AuthInput
                label="Cost Of Maintenance"
                hasError={!!errors.cost_of_maintenance}
                {...getFieldProps("cost_of_maintenance")}
              />
              {!!errors.cost_of_maintenance && (
                <p className="error-message">{errors.cost_of_maintenance}</p>
              )}
            </Col>
          </Row>
          <Row className="mb-0 mb-sm-4">
            <Col sm="6" className="mb-4 mb-sm-0">
              <AuthInput
                label="Initial Payment"
                hasError={!!errors.initial_payment}
                {...getFieldProps("initial_payment")}
              />
              {!!errors.initial_payment && (
                <p className="error-message">{errors.initial_payment}</p>
              )}
            </Col>
          </Row>
        </DetailView>
      </Prompt>
    </div>
  );
};

export default Account;
