import React from "react";
import { useQuery } from "react-query";
import queryKeys from "../../utils/queryKeys";
import { useAppContext } from "../../hooks/useAppContext";
import { Spinner } from "reactstrap";

const AuditCard = () => {
  const { apiServices } = useAppContext();
  const { data, isLoading } = useQuery(
    [queryKeys.GET_AUDIT_LOGS],
    apiServices.getAuditLogs,
    {
      select: apiServices.formatData,
      onError: apiServices.errorHandler,
    }
  );

  return (
    <div className="audit-card-wrapper">
      <h4>Audit Logs {isLoading && <Spinner />}</h4>
      <div className="content">
        {data?.map((item) => (
          <div key={item.id}>
            <h4>
              {item.user_id} {item.event}{" "}
              {item.auditable_type
                .split("\\")[2]
                .replace(/([a-z])([A-Z])/g, "$1 $2")}
            </h4>
            <p>{item.updated_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditCard;
