import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonGroup from "../buttons/button-group";
import CreateWrapper from "../common/create-wrapper";
import PageSheet from "../common/page-sheet";
import CustomTable from "../tables/table";

const PageView = ({
  onStatusToggle,
  onDelete,
  groupedButtonOptions = [],
  hasSortOptions = false,
  ...rest
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <PageSheet>
      <CreateWrapper link={`${location.pathname}/new`} />
      {hasSortOptions && (
        <div className="mt-3 mb-5">
          {groupedButtonOptions.length && (
            <div>
              <ButtonGroup options={groupedButtonOptions} />
            </div>
          )}
        </div>
      )}
      <div>
        <CustomTable
          centered
          onRowStatusToggle={async (data) => await onStatusToggle(data)}
          onRowUpdate={(id) => navigate(`${location.pathname}/edit/${id}`)}
          onRowDelete={async (data) => await onDelete(data)}
          {...rest}
        />
      </div>
    </PageSheet>
  );
};

export default PageView;
