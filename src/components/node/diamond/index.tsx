import React from "react";
import { NodeProps, Handle, Position } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";
interface IProps extends NodeProps {
  data: {
    id: string;
    deleteNode: (nodeId: string) => void;
  };
}
const Diamond: React.FC<IProps> = ({ selected, data: { id, deleteNode } }) => {
  return (
    <div className="bg-violet-500 rounded w-full min-w-[200px] h-full min-h-[200px] rotate-45 ">
      <div className="flex justify-between items-center px-2 py-1 relative -rotate-45 overflow-hidden">
        <div className="text-white text-sm font-bold">{id}</div>
        <button
          onClick={() => deleteNode(id)}
          className="p-2 rounded-full bg-red-500 flex justify-center items-center absolute top-2 right-2 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 1a9 9 0 100 18 9 9 0 000-18zM7.707 7.707a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 101.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293a1 1 0 00-1.414-1.414L10 8.586 7.707 6.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <NodeResizer
        minWidth={200}
        minHeight={200}
        lineClassName="border-blue-400"
        handleClassName="h-3 w-3 bg-white border-2 border-blue-400 rounded"
        isVisible={selected}
      />

      <Handle
        id="top"
        type="target"
        position={Position.Top}
        className="-top-5 w-3 h-3 border-2 bg-blue-400/80 -left-4"
      />
      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        className="left-[106%] -bottom-5 w-3 h-3 border-2 bg-blue-400/80"
      />
    </div>
  );
};

export default Diamond;
