import { BarChart, BarPlot } from "@mui/x-charts/BarChart";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { AllSeriesType } from "@mui/x-charts/models";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import Box from "@mui/material/Box";

import { MainWrapper } from "../../components";
import { CardWithChart } from "./components";

const series = [
  {
    type: "bar",
    stack: "",
    yAxisKey: "less_time",
    data: [5, 6, 2, 8, 9],
  },
  {
    type: "line",
    yAxisKey: "less_time",
    color: "red",
    data: [5, 6, 2, 8, 9],
  },
] as AllSeriesType[];

export const StatsPage = () => {
  return (
    <MainWrapper>
      <Box p="16px" gap="16px" display="flex" flexDirection="row">
        <CardWithChart title="Количество часов простоя по спринтам">
          <ChartContainer
            series={series}
            width={500}
            height={400}
            xAxis={[
              {
                id: "sprints",
                data: ["1й", "2й", "3й", "4й", "5й"],
                scaleType: "band",
                valueFormatter: (value) => value.toString(),
              },
            ]}
            yAxis={[
              {
                id: "less_time",
                scaleType: "linear",
              },
            ]}
          >
            <BarPlot />
            <LinePlot />
            <ChartsXAxis label="Спринты" position="bottom" axisId="sprints" />
            <ChartsYAxis
              label="Количество часов простоя"
              position="left"
              axisId="less_time"
            />
          </ChartContainer>
        </CardWithChart>

        <CardWithChart title="Количество успешно закрытых/перенесенных задач">
          <BarChart
            colors={["#02B302", "red"]}
            yAxis={[
              {
                label: "Количество задач",
              },
            ]}
            xAxis={[
              {
                scaleType: "band",
                data: ["1й", "2й", "3й", "4й", "5й"],
                label: "Спринты",
                fill: "!important",
              },
            ]}
            series={[{ data: [33, 51, 42, 23, 15] }, { data: [1, 6, 3, 3, 5] }]}
            width={500}
            height={400}
          />
        </CardWithChart>
      </Box>
    </MainWrapper>
  );
};
