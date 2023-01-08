import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CreateWrapper from "../common/create-wrapper";
import PageSheet from "../common/page-sheet";
import CustomTable from "../tables/table";

const PageView = ({ onStatusToggle, onDelete, ...rest }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <PageSheet>
      <CreateWrapper link={`${location.pathname}/new`} />
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
