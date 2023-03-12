import {
  faBusinessTime,
  faCalendar,
  faPeopleLine,
  faTimeline,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useForm } from "react-formid";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import HomeCard from "../../../components/cards/home-card";
import ProfileCard from "../../../components/cards/profile-card";
import PageTitle from "../../../components/common/title";
import AuthInput from "../../../components/inputs/auth-input";
import AuthSelect from "../../../components/inputs/auth-select";
import Prompt from "../../../components/modals/prompt";
import { useAcademicPeriod } from "../../../hooks/useAcademicPrompt";
import { useAppContext } from "../../../hooks/useAppContext";

const Admin = () => {
  const {
    apiServices: { handleSessionChange },
  } = useAppContext();
  const {
    isLoading,
    postAcademicPeriod,
    academicPeriodPrompt,
    setAcademicPeriodPrompt,
  } = useAcademicPeriod();
  const navigate = useNavigate();
  const { handleChange, inputs, errors, setFieldValue } = useForm({
    defaultValues: {
      period: "First Half",
      session: "",
      term: "First Term",
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

  return (
    <div className="teachers">
      <PageTitle> Admin {isLoading && <Spinner />}</PageTitle>
      <ProfileCard type="admin" />
      <div className="teachers-cards-wrapper">
        <HomeCard
          isBadge
          title="My Students"
          icon={faPeopleLine}
          onClick={() =>
            navigate("/app/students", { state: { status: "myStudents" } })
          }
        />
        <HomeCard isBadge title="Calender" icon={faCalendar} />
        <HomeCard isBadge title="Timetable" icon={faTimeline} />
        <HomeCard
          isBadge
          title="Academic Period"
          icon={faBusinessTime}
          onClick={() => setAcademicPeriodPrompt(true)}
        />
      </div>
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
    </div>
  );
};

export default Admin;
