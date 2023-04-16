import React from "react";
import PageView from "../../../../components/views/table-view";
import { useVehicles } from "../../../../hooks/useVehicles";

const VehicleLogs = () => {
  const { isLoading, vehicleLogsList, permission } = useVehicles();

  return (
    <PageView
      canCreate={permission?.createLogs}
      // rowHasUpdate={permission?.update}
      // rowHasDelete={permission?.delete}
      // onDelete={onDeleteClass}
      isLoading={isLoading}
      columns={[
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "Vehicle Number",
          accessor: "vehicle_number",
        },
        {
          Header: "Driver",
          accessor: "driver_name",
        },
        {
          Header: "Mechanic Condition",
          accessor: "mechanic_condition",
        },
        {
          Header: "Purpose",
          accessor: "purpose",
        },
        {
          Header: "Route",
          accessor: "route",
        },
        {
          Header: "Date Out",
          accessor: "date_out",
        },
        {
          Header: "Time Out",
          accessor: "time_out",
        },
        {
          Header: "Add Info",
          accessor: "add_info",
        },
      ]}
      data={vehicleLogsList}
    />
  );
};

export default VehicleLogs;
