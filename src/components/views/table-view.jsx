import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonGroup from "../buttons/button-group";
import CreateWrapper from "../common/create-wrapper";
import PageSheet from "../common/page-sheet";
import Search from "../inputs/search";
import CustomTable from "../tables/table";

const PageView = ({
  onStatusToggle,
  onDelete,
  groupedButtonOptions = [],
  hasSortOptions = false,
  hasSearch,
  onSearch,
  searchPlaceholder,
  isLoading,
  onSearchClear,
  ...rest
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <PageSheet>
      <CreateWrapper link={`${location.pathname}/new`} />
      {hasSortOptions && (
        <div className="mb-5 d-md-flex">
          {groupedButtonOptions.length ? (
            <div className={`me-3`}>
              <ButtonGroup options={groupedButtonOptions} />
            </div>
          ) : null}

          {hasSearch && (
            <Search
              isLoading={isLoading}
              placeholder={searchPlaceholder}
              onSearch={onSearch}
              onClear={onSearchClear}
            />
          )}
        </div>
      )}
      <div>
        <CustomTable
          centered
          isLoading={isLoading}
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
