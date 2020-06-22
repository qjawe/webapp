import { IChart, IFlowChartCallbacks } from "@mrblenny/react-flow-chart";
import { Token } from "../../entities";

export interface INodeDetailsSideBarState {
  openSelect: boolean;
  selectedNode: any;
  selectedNodePorts: any;
  tokenList: Token[];
  selectedDropdown: string;
  priceImpact: number;
  price: string;
}

export interface INodeDetailsSideBarProps {
  chart: IChart;
  setChart: (chart: IChart) => void;
  stateActions: IFlowChartCallbacks;
}
