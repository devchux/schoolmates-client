import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ label, data }) => {
  const state = useMemo(() => {
    return {
      series: data,
      options: {
        labels: label,
        responsive: [
          {
            breakpoint: 900,
            options: {
              chart: {
                width: "100%",
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }, [label, data]);

  return (
    <div className="chart-wrapper">
      <h4>Balance Chart</h4>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="pie"
      />
    </div>
  );
};

export default PieChart;
