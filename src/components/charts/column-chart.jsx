import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const ColumnChart = ({ data, categories, xTitle, yTitle }) => {
  const state = useMemo(() => {
    return {
      series: data,
      options: {
        xaxis: {
          categories,
          title: {
            text: xTitle,
          },
        },
        yaxis: {
          title: {
            text: yTitle,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "70%",
            endingShape: "rounded",
          },
        },
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
  }, [data, categories, xTitle, yTitle]);

  return (
    <ReactApexChart options={state.options} series={state.series} type="bar" />
  );
};

export default ColumnChart;
