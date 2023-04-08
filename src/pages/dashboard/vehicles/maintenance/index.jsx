import React from "react";
import PageView from "../../../../components/views/table-view";
import { useVehicleMaintenance } from "../../../../hooks/useVehicleMaintenance";

const VehicleMaintenance = () => {
  const { isLoading, vehicleMaintenance } = useVehicleMaintenance();

  return (
    <PageView
      canCreate={false}
      // rowHasUpdate={permission?.update}
      // rowHasDelete={permission?.delete}
      // onDelete={onDeleteClass}
      isLoading={isLoading}
      columns={[
        {
          Header: "Campus",
          accessor: "campus",
        },
        {
          Header: "Vehicle Type",
          accessor: "vehicle_type",
        },
        {
          Header: "Vehicle Make",
          accessor: "vehicle_make",
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
          Header: "Fault",
          accessor: "detected_fault",
        },
        {
          Header: "Mechanic",
          accessor: "mechanic_name",
        },
        {
          Header: "Mechanic Phone Number",
          accessor: "mechanic_phone",
        },
        {
          Header: "Cost",
          accessor: "cost_of_maintenance",
        },
        {
          Header: "Initial Payment",
          accessor: "initial_payment",
        },
      ]}
      data={vehicleMaintenance}
    />
  );
};

export default VehicleMaintenance;
