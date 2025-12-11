import React from "react";
import "./Calculator.css";

function Button({ label, value ,  type, rowSpan, colSpan , onClick }) {
  const rowspan = rowSpan ? `row-span-${rowSpan}` : "";
  const colspan = colSpan ? `col-span-${colSpan}` : "";

  const baseClass =
    " rounded-lg  px-8 font-semibold py-1 text-2xl shadow-[0_2px_6px_rgba(0,0,0,0.15)] cursor-pointer transition-all duration-150 ";

  const typeStyles = {
    number: "bg-white text-gray-900 hover:bg-gray-200 ",
    operator: "bg-[#D8C9F2] text-purple-700 hover:bg-[#CDB8ED]",
    utility: "bg-[#F7EEDB] text-gray-700 hover:bg-[#efddc0]",
    clear: "bg-[#FFC94D] text-white hover:bg-[#f3b736]",
    equal:
      "bg-gradient-to-b from-[#9C4DFF] to-[#7928E5] text-white row-span-2 hover:brightness-120",

    // *****IMPORTANT :--   Tailwind only generates CSS for classes it can find literally in your code.
    //                      Dynamic classes must point to pre-declared values to work.
    //   agar mai yaha row-span-2 nhi likhungi toh tailwind upar wale rowspan wale ko  detect nhi krpayega , i dont know why !!
  };

  return (
    <button
      className={`${baseClass}  ${typeStyles[type]} ${rowspan} ${colspan} `}
      onClick={ ()=> onClick && onClick(value)}
      aria-label={label}
    >
      {label}
    </button>
  );
}

export default Button;
