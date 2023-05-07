import React, { useState } from "react";
import PageView from "../../../../components/views/table-view";
import Prompt from "../../../../components/modals/prompt";
import AuthSelect from "../../../../components/inputs/auth-select";
import { ResultIcon } from "../../../../assets/svgs";
import { useForm } from "react-formid";
import { useAcademicSession } from "../../../../hooks/useAcademicSession";
import { usePreSchool } from "../../../../hooks/usePreSchool";

const PreSchoolSubject = () => {
  const [loginPrompt, setLoginPrompt] = useState(false);
  const [hideTable, setHideTable] = useState(true);
  const { inputs, errors, handleChange } = useForm({
    defaultValues: {
      period: "First Half",
      term: "First Term",
      session: "2020/2021",
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

  const { isLoading: loadingSessions, data: sessions } = useAcademicSession();
  const { setPeriod, preSchoolSubjects, isLoading } = usePreSchool();

  console.log("preSchoolSubjects", preSchoolSubjects);

  const getToggleButtons = () => {
    const arr = [
      {
        title: "Academic Period",
        type: "button",
        onClick: () => setLoginPrompt(true),
      },
    ];

    return arr;
  };

  return (
    <div>
      <PageView
        hasSortOptions
        showIllustration={hideTable}
        svgIllustrationBanner={ResultIcon}
        hideTable={hideTable}
        groupedButtonOptions={getToggleButtons()}
        isLoading={isLoading}
        columns={[
          {
            Header: "id",
            accessor: "id",
          },
        ]}
        data={preSchoolSubjects || []}
      />
      <Prompt
        isOpen={loginPrompt}
        toggle={() => setLoginPrompt(!loginPrompt)}
        singleButtonProps={{
          type: "button",
          isLoading: loadingSessions,
          disabled: loadingSessions,
          onClick: () => {
            setHideTable(false);
            setLoginPrompt(false);
            setPeriod(inputs);
          },
        }}
        singleButtonText="Continue"
        promptHeader="Academic Period"
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
          <AuthSelect
            label="Session"
            value={inputs.session}
            name="session"
            hasError={!!errors.session}
            onChange={handleChange}
            options={(sessions || [])?.map((session) => ({
              value: session?.academic_session,
              title: session?.academic_session,
            }))}
          />
          {!!errors.session && (
            <p className="error-message">{errors.session}</p>
          )}
        </div>
      </Prompt>
    </div>
  );
};

export default PreSchoolSubject;
