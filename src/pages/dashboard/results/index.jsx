import { faEye, faPen, faSchool } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import PageView from "../../../components/views/table-view";
import { ResultIcon } from "../../../assets/svgs";
import Prompt from "../../../components/modals/prompt";
import AuthSelect from "../../../components/inputs/auth-select";
import { useForm } from "react-formid";

const Results = () => {
  const [promptStatus, setPromptStatus] = useState("compute");
  const [loginPrompt, setLoginPrompt] = useState(false);
  const { inputs, errors, handleChange } = useForm({
    defaultValues: {
      period: "",
      term: "",
      session: "",
    },
  });

  const promptMapper = {
    compute: {
      title: "Compute Result",
      onFormSubmit: () => null,
    },
    view: {
      title: "View Result",
      onFormSubmit: () => null,
    },
  };

  const displayPrompt = (status) => {
    setPromptStatus(status);
    setLoginPrompt(true);
  };
  return (
    <div>
      <PageView
        hasSortOptions
        showIllustration
        svgIllustrationBanner={ResultIcon}
        hideTable
        groupedButtonOptions={[
          {
            title: (
              <>
                <FontAwesomeIcon icon={faPen} /> Compute
              </>
            ),
            variant: "outline",
            type: "button",
            onClick: () => displayPrompt('compute'),
          },
          {
            title: (
              <>
                <FontAwesomeIcon icon={faEye} /> View
              </>
            ),
            variant: "outline",
            type: "button",
            onClick: () => displayPrompt('view'),
          },
          {
            title: (
              <>
                <FontAwesomeIcon icon={faSchool} /> Pre School
              </>
            ),
            variant: "outline",
            type: "button",
            onClick: null,
          },
        ]}
        canCreate={false}
        isLoading={false}
      />
      <Prompt
        isOpen={loginPrompt}
        toggle={() => setLoginPrompt(!loginPrompt)}
        singleButtonProps={{
          type: "button",
          isLoading: false,
          disabled: false,
          onClick: promptMapper[promptStatus].onFormSubmit,
        }}
        singleButtonText="Continue"
        promptHeader={promptMapper[promptStatus].title}
      >
        <div className="form-group mb-4">
          <AuthSelect
            label="Period"
            value={inputs.period}
            name="period"
            hasError={!!errors.period}
            onChange={handleChange}
            options={[
              { value: "income", title: "Income Report" },
              { value: "expense", title: "Expenses Report" },
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
            options={[
              { value: "2020/2021", title: "2020/2021" },
              { value: "2021/2022", title: "2021/2022" },
              { value: "2022/2023", title: "2022/2023" },
            ]}
          />
          {!!errors.session && (
            <p className="error-message">{errors.session}</p>
          )}
        </div>
      </Prompt>
    </div>
  );
};

export default Results;
