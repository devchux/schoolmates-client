import React from "react";
import { useQuery } from "react-query";
import PageView from "../../../components/views/table-view";
import { useAppContext } from "../../../hooks/useAppContext";
import queryKeys from "../../../utils/queryKeys";

const DressCode = () => {
  const { apiServices, errorHandler, user } = useAppContext();

  const { isLoading: dressCodeLoading, data: dressCodeData } = useQuery(
    [queryKeys.GET_DRESS_CODE],
    apiServices.getDressCode,
    {
      enabled: ["Teacher", "Student"].includes(user?.designation_name),
      retry: 3,
      onError(err) {
        errorHandler(err);
      },
      select: (data) => data?.data?.map((x) => ({ ...x.attributes })),
    }
  );

  return (
    <PageView
      canCreate={false}
      isLoading={dressCodeLoading}
      columns={[
        {
          Header: "day",
          accessor: "day",
        },
        {
          Header: "description",
          accessor: "description",
        },
        {
          Header: "wear",
          accessor: "wear",
        },
      ]}
      data={dressCodeData}
    />
  );
};

export default DressCode;
