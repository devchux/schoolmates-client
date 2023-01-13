import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonGroup from "../buttons/button-group";
import CreateWrapper from "../common/create-wrapper";
import PageSheet from "../common/page-sheet";
import Search from "../inputs/search";
import CustomTable from "../tables/table";
import illustrationImage from "../../assets/images/illustration.png";
import PageTitle from "../common/title";

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
  canCreate = true,
  createLink,
  showIllustration = false,
  hideTable = false,
  showTableTitle = false,
  pageTitle,
  ...rest
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <PageSheet>
      {canCreate && (
        <CreateWrapper link={createLink || `${location.pathname}/new`} />
      )}
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
      {showIllustration && (
        <div className="w-50 mx-auto">
          <img src={illustrationImage} alt="" className="w-100 h-100" />
        </div>
      )}
      {!hideTable && (
        <div>
          {showTableTitle && <PageTitle>{pageTitle}</PageTitle>}
          <CustomTable
            centered
            isLoading={isLoading}
            onRowStatusToggle={async (data) => await onStatusToggle(data)}
            onRowUpdate={(id) => navigate(`${location.pathname}/edit/${id}`)}
            onRowDelete={async (data) => await onDelete(data)}
            {...rest}
          />
        </div>
      )}
    </PageSheet>
  );
};

export default PageView;
