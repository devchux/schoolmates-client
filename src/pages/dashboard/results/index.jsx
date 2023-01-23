import { faEye, faPen, faSchool } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import PageView from "../../../components/views/table-view";
import { ResultIcon } from "../../../assets/svgs"
import Prompt from "../../../components/modals/prompt";
import AuthSelect from "../../../components/inputs/auth-select";

const Results = () => {
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
            onClick: null,
          },
          {
            title: (
              <>
                <FontAwesomeIcon icon={faEye} /> View
              </>
            ),
            variant: "outline",
            type: "button",
            onClick: null,
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
        isOpen={false}
        toggle={() => null}
        singleButtonProps={{
          type: "button",
          isLoading: false,
          disabled: false,
          onClick: null,
        }}
        singleButtonText="Continue"
        promptHeader="Generate Report"
      >
        <div className="form-group mb-4">
          <AuthSelect
            label="Type"
            // value={inputs.type}
            name="type"
            // hasError={!!errors.type}
            // onChange={handleChange}
            options={[
              { value: "income", title: "Income Report" },
              { value: "expense", title: "Expenses Report" },
            ]}
          />
          {/* {!!errors.term && <p className="error-message">{errors.term}</p>} */}
        </div>
        <div className="form-group mb-4">
          <AuthSelect
            label="Term"
            // value={inputs.term}
            name="term"
            // hasError={!!errors.term}
            // onChange={handleChange}
            options={[
              { value: "First Term", title: "First Term" },
              { value: "Second Term", title: "Second Term" },
              { value: "Third Term", title: "Third Term" },
            ]}
          />
          {/* {!!errors.term && <p className="error-message">{errors.term}</p>} */}
        </div>
      </Prompt>
    </div>
  );
};

export default Results;
