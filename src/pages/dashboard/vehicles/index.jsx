import React from "react";
import PageView from "../../../components/views/table-view";
import { useVehicles } from "../../../hooks/useVehicles";

const Vehicles = () => {
  const {
    isLoading,
    indexStatus,
    setIndexStatus,
    vehiclesList,
    vehicleLogsList,
    handleDeleteVehicle,
    permission,
  } = useVehicles();

  const dataMapper = {
    all: {
      columns: [
        {
          Header: "id",
          accessor: "id",
        },
        {
          Header: "Vehicle Number",
          accessor: "number",
        },
        {
          Header: "Driver",
          accessor: "drivername",
        },
        {
          Header: "Type",
          accessor: "type",
        },
        {
          Header: "Make",
          accessor: "make",
        },
      ],
      data: vehiclesList,
    },
    logs: {
      columns: [
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
      ],
      data: vehicleLogsList,
    },
  };

  const getSortButtonOptions = () => {
    let arr = [];

    if (permission?.read) {
      arr.push({
        title: "All",
        type: "button",
        variant: indexStatus !== "all" ? "outline" : null,
        onClick: () => setIndexStatus("all"),
      });
    }
    if (permission?.readLogs) {
      arr.push({
        title: "Logs",
        type: "button",
        variant: indexStatus !== "logs" ? "outline" : null,
        onClick: () => setIndexStatus("logs"),
      });
    }

    return arr.length ? arr : undefined;
  };

  return (
    <PageView
      hasSortOptions={permission?.sort}
      rowHasDelete={permission?.delete && indexStatus !== 'logs'}
      canCreate={permission?.create}
      rowHasUpdate={permission?.update}
      onDelete={handleDeleteVehicle}
      isLoading={isLoading}
      groupedButtonOptions={getSortButtonOptions()}
      columns={dataMapper[indexStatus].columns}
      data={dataMapper[indexStatus].data}
    />
  );
};

export default Vehicles;
