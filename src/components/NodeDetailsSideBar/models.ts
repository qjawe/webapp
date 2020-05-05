import { IChart, IFlowChartCallbacks } from "@mrblenny/react-flow-chart";

export interface INodeDetailsSideBarState {
  openSelect: boolean;
  selectedNode: any;
  selectedNodePorts: any;
  tokenList: string[];
  selectedDropdown: string;
}

export interface INodeDetailsSideBarProps {
  chart: IChart;
  setChart: (chart: IChart) => void;
  stateActions: IFlowChartCallbacks;
}
