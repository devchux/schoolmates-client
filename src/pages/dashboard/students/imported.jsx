import React from "react";
import PageView from "../../../components/views/table-view";
import { useQuery } from "react-query";
import queryKeys from "../../../utils/queryKeys";
import { useAppContext } from "../../../hooks/useAppContext";
import { Link } from "react-router-dom";

const ImportedStudents = () => {
  const { apiServices } = useAppContext("students");
  const { isLoading, data } = useQuery(
    [queryKeys.GET_IMPORTED_STUDENTS],
    apiServices.getImportedStudents,
    {
      select: (data) =>
        apiServices.formatData(data)?.map((item) => ({
          ...item,
          file: (
            <Link
              to={item.file}
              className="text-decoration-none text-success"
              download
            >
              Download File
            </Link>
          ),
        })),
      onError: apiServices.errorHandler,
    }
  );

  return (
    <PageView
      canCreate={false}
      isLoading={isLoading}
      columns={[
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "Campus",
          accessor: "campus",
        },
        {
          Header: "File",
          accessor: "file",
        },
      ]}
      data={data}
    />
  );
};

export default ImportedStudents;
