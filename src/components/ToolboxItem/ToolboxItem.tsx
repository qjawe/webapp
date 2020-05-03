import * as React from "react";
import styled from "styled-components";
import { INode, REACT_FLOW_CHART } from "@mrblenny/react-flow-chart";

const Outer = styled.div`
  cursor: move;
`;
export interface IToolboxItemProps {
  type: string;
  ports: INode["ports"];
  properties?: any;
}

export const ToolboxItem = ({ type, ports, properties }: IToolboxItemProps) => {
  return (
    <Outer
      draggable={true}
      onDragStart={(event) => {
        event.dataTransfer.setData(
          REACT_FLOW_CHART,
          JSON.stringify({ type, ports, properties })
        );
      }}
    >
      {properties && properties.name ? properties.name : type}
    </Outer>
  );
};
