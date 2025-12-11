import React from "react";
import "./Calculator.css";
import Button from "./Button";

const buttons = [

  //row 1
  { label: "C",  value: "C",  type: "clear", },
  { label: "(",  value: "(",  type: "utility", },
  { label: ")",  value: ")",  type: "utility", },
  { label: "x",  value: "*",  type: "operator", },


  //row 2
  { label: "√",  value: "SQRT",  type: "utility", },
  { label: "%",  value: "%",     type: "utility", },
  { label: "±",  value: "NEGATE",type: "utility" },
  { label: "÷",  value: "/",     type: "operator", },


  //row 3
  { label: "7", value: "7", type: "number" },
  { label: "8", value: "8", type: "number" },
  { label: "9", value: "9", type: "number" },
  { label: "-", value: "-", type: "operator" },


  // Row 4
  { label: "4", value: "4", type: "number" },
  { label: "5", value: "5", type: "number" },
  { label: "6", value: "6", type: "number" },
  { label: "+", value: "+", type: "operator" },


  // Row 5
  { label: "1", value: "1", type: "number" },
  { label: "2", value: "2", type: "number" },
  { label: "3", value: "3", type: "number" },


  // "=" button (spans 2 rows)
  { label: "=", value: "=", type: "equal", rowSpan: 2 },


  // Row 6
  { label: ".", value: ".", type: "number" },
  { label: "0", value: "0", type: "number" },
  { label: "⌫", value: "BACKSPACE", type: "utility" }
  
];

function Keypad({onButtonClick}) {
  return (
    <div className="keypad px-4 grid grid-cols-4 gap-3 pt-4">
     {
        buttons.map((btn , index) => {
           return <Button 
            key={index}
            label={btn.label}
            value={btn.value}
            type={btn.type}
            rowSpan={btn.rowSpan}
            colSpan={btn.colSpan}
            onClick={onButtonClick}
            />
        })
     }
    </div>
  );
}

export default Keypad;
