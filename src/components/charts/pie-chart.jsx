import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ label, data }) => {
  const state = useMemo(() => {
    return {
      series: data,
      options: {
        // chart: {
        //   width: 380,
        //   type: "pie",
        // },
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
        // width="50%"
      />
    </div>
  );
};

export default PieChart;
