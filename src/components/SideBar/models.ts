import { IChart, IFlowChartCallbacks } from "@mrblenny/react-flow-chart";

export interface ISideBarProps {
  chart: IChart;
  setChart: (chart: IChart) => void;
  stateActions: IFlowChartCallbacks;
}
