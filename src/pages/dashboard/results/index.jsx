import { faEye, faPen, faSchool } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import PageView from "../../../components/views/table-view";
import { ResultIcon } from "../../../assets/svgs"

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
    </div>
  );
};

export default Results;
