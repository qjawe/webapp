import { useState } from "react";
import { cloneDeep, mapValues } from "lodash";
import * as actions from "@mrblenny/react-flow-chart/src/container/actions";
import { IChart } from "@mrblenny/react-flow-chart";

import { chartSimple } from "../misc/exampleChartState";

export function useChart() {
  const [chart, setChart] = useState<IChart>(chartSimple);

  const stateActions = mapValues(actions, (func: any) => (...args: any) => {
    const funcChart = func(...args);
    const modChart = funcChart(chart);
    setChart(cloneDeep(modChart));
  }) as typeof actions;

  return [chart, setChart, stateActions];
}
