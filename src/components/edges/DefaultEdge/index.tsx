import React from "react";
import { EdgeProps, getSmoothStepPath } from "reactflow";
interface IProps extends EdgeProps {}
const DefaultEdge: React.FC<IProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = { strokeWidth: 2, stroke: "#ddd" },
  data,
  markerEnd,
}) => {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <path
      id={id}
      style={style}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
    />
  );
};

export default DefaultEdge;
