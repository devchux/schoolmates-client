import {
  faBusinessTime,
  faCalendar,
  faPeopleLine,
  faTimeline,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useForm } from "react-formid";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { Spinner } from "reactstrap";
import HomeCard from "../../../components/cards/home-card";
import ProfileCard from "../../../components/cards/profile-card";
import PageTitle from "../../../components/common/title";
import AuthInput from "../../../components/inputs/auth-input";
import AuthSelect from "../../../components/inputs/auth-select";
import Prompt from "../../../components/modals/prompt";
import { useAcademicPeriod } from "../../../hooks/useAcademicPrompt";
import { useAppContext } from "../../../hooks/useAppContext";
import { useFile } from "../../../hooks/useFile";
import queryKeys from "../../../utils/queryKeys";
import { Link } from "react-router-dom";

const Admin = () => {
  const [importStudentPrompt, setImportStudentPrompt] = useState(false);
  const {
    user,
    updateUser,
    apiServices: {
      importStudent,
      errorHandler,
      getSchool,
      getTimeTable,
      formatData,
      getAcademicCalender,
      handleSessionChange,
    },
  } = useAppContext();
  const {
    isLoading,
    postAcademicPeriod,
    academicPeriodPrompt,
    setAcademicPeriodPrompt,
  } = useAcademicPeriod();

  const { isLoading: schoolLoading } = useQuery(
    [queryKeys.GET_SCHOOL],
    getSchool,
    {
      retry: 3,
      onSuccess(data) {
        updateUser({
          ...user,
          school: { ...data },
        });
      },
      onError(err) {
        errorHandler(err);
      },
      select: (data) => data?.data[0].attributes,
    }
  );

  const { isLoading: timetableLoading, data: timetableData } = useQuery(
    [queryKeys.GET_TIME_TABLE],
    getTimeTable,
    {
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      select: (data) => (formatData(data)?.length ? formatData(data)[0] : {}),
    }
  );

  const { isLoading: calendarLoading, data: calendarData } = useQuery(
    [queryKeys.GET_ACADEMIC_CALENDER],
    getAcademicCalender,
    {
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      select: (data) => (formatData(data)?.length ? formatData(data)[0] : {}),
    }
  );

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

  const { handleImageChange, base64String, fileRef, reset } = useFile([], true);

  const { mutate: uploadFile, isLoading: uploadLoading } = useMutation(
    importStudent,
    {
      onSuccess() {
        setImportStudentPrompt(false);
        reset();
        toast.success("File has been imported");
      },
      onError: errorHandler,
    }
  );

  return (
    <div className="teachers">
      <PageTitle>
        Admin{" "}
        {(isLoading ||
          uploadLoading ||
          schoolLoading ||
          calendarLoading ||
          timetableLoading) && <Spinner />}
      </PageTitle>
      <ProfileCard type="admin" />
      <div className="teachers-cards-wrapper">
        <HomeCard
          isBadge
          variant="orange"
          title="Import Students"
          icon={faPeopleLine}
          onClick={() => setImportStudentPrompt(!importStudentPrompt)}
        />
        <HomeCard
          variant="purple"
          isBadge
          title="Calender"
          icon={faCalendar}
          isLink
          download
          to={calendarData?.file || "/"}
          target="_blank"
        />
        <HomeCard
          isBadge
          title="Timetable"
          icon={faTimeline}
          to={timetableData?.file || "/"}
          download
          target="_blank"
          isLink
        />
        <HomeCard
          isBadge
          variant="green"
          title="Academic Period"
          icon={faBusinessTime}
          onClick={() => setAcademicPeriodPrompt(true)}
        />
      </div>
      <Prompt
        isOpen={importStudentPrompt}
        toggle={() => setImportStudentPrompt(!importStudentPrompt)}
        singleButtonProps={{
          type: "button",
          isLoading: isLoading || uploadLoading,
          disabled: isLoading || uploadLoading || !base64String,
          onClick: () => uploadFile({ files: base64String }),
        }}
        singleButtonText="Continue"
        promptHeader="Import Student"
      >
        <AuthInput
          type="file"
          className="px-0"
          wrapperClassName="border-0"
          onChange={handleImageChange}
          ref={fileRef}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
        <Link
          to="/app/students/imported"
          className="text-success text-decoration-none"
          style={{ fontSize: "1.2rem" }}
        >
          View file format
        </Link>
      </Prompt>
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
            placeholder="2021/2022"
            hasError={!!errors.session}
            value={inputs.session}
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
