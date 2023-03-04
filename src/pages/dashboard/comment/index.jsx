import React from "react";
import { useQuery } from "react-query";
import PageView from "../../../components/views/table-view";
import { useAppContext } from "../../../hooks/useAppContext";
import queryKeys from "../../../utils/queryKeys";

const Comment = () => {
  const { apiServices, permission } = useAppContext();

  const { data: comments, isLoading: commentsLoading } = useQuery(
    [queryKeys.GET_PRINCIPAL_COMMENTS],
    apiServices.getPrincipalComments,
    {
      onError(err) {
        apiServices.errorHandler(err);
      },
      select: apiServices.formatData,
    }
  );

  return (
    <PageView
      canCreate={permission?.create}
      isLoading={commentsLoading}
      columns={[
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "HOS Full Name",
          accessor: "hos_fullname",
        },
        {
          Header: "HOS Comment",
          accessor: "hos_comment",
        },
      ]}
      data={comments}
    />
  );
};

export default Comment;
