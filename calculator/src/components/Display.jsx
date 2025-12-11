import React, { useEffect, useRef } from "react";
import "./Calculator.css";

function Display({ expression, result }) {
  const exprRef = useRef(null);
  const resultRef = useRef(null);

  useEffect(() => {
    if (exprRef.current) {
      exprRef.current.scrollLeft = exprRef.current.scrollWidth;
    }
  }, [expression]);

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollLeft = resultRef.current.scrollWidth;
    }
  }, [result]);

  return (
    <div className="display-container bg-white rounded-xl shadow-[0_2px_6px_rgba(0,0,0,0.12)] p-4 flex flex-col justify-end h-64 overflow-hidden">
      <div
        ref={exprRef}
        className="expression text-right text-gray-500 text-lg whitespace-nowrap overflow-x-auto scrollbar-hide overflow-y-hidden"
      >
        {expression || ""}
      </div>

      <div
        ref={resultRef}
        className="result text-right text-gray-900 text-5xl font-bold whitespace-nowrap overflow-x-auto scrollbar-hide overflow-y-hidden"
      >
        {result || "0"}
      </div>
    </div>
  );
}

export default Display;
