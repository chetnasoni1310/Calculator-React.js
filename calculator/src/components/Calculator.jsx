import React, { useState } from "react";
import "./Calculator.css";
import Keypad from "./Keypad";
import Display from "./Display";

function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [evaluated, setEvaluated] = useState(false);

  // helpers
  // ********************************************************************************************
  const isOperator = (ch) => {
    return ["+", "-", "*", "/"].includes(ch);
    //it will return true if it is an operator +,-,*,/
  };

  // ********************************************************************************************
  const lastChar = (str) => {
    return str.length ? str[str.length - 1] : "";
    //it will return the last char entered
    // Why -->
    //Because many calculator rules depend on what the user entered last.
  };

  // ********************************************************************************************
  const getLastNumber = (expr) => {
    let len = expr.length - 1;
    let num = "";
    let i = len;
    while (i >= 0 && /[0-9.]/.test(expr[i])) {
      num = expr[i] + num;
      i--;
    }
    return num;
    // Walks backward from the end of the expression
    // Collects digit/dot characters
    // Stops at the first non-digit character
    // Returns the last number segment
  };

  // ********************************************************************************************
  const replaceLastNumber = (expr, newNumber) => {
    let i = expr.length - 1;
    while (i >= 0 && /[0-9.]/.test(expr[i])) {
      i--;
    }
    // Step 2: Return everything before the number + the new updated number
    return expr.slice(0, i + 1) + newNumber;
    // replaceLastNumber() finds the last number in the expression and replaces it with a new number. That’s all.
  };

  // ********************************************************************************************
  const evaluateExpression = (expr) => {
    if (!expr) return "0";

    if (isOperator(lastChar(expr))) return "Invalid";

    if (/[^0-9+\-*/().% ]/.test(expr))
      //agar inmai se nhi hua toh ^ ,
      // yaha pe % ke baad mai (space) bhii h , mtlb ki space bhi allowed hai
      // and - minus ke pehle humne escaping kii hai , \-  , kuunki minus ek ambigous sign hai subtract ka bhi and range ka bhi , toh literal meaning ke liye \- ese likhte hai
      return "Invalid";

    const transformed = expr.replace(/(\d+(\.\d+)?)%/g, "($1/100)");
    //iss regex ka mtlb hua
    // \d+ --> 1 or more 0-9 digits
    // \.  --> literal . (dot of decimal)
    // \d+ --> 1 or more 0-9 digits
    // (\.\d+)  --> inner capture 2 for $2
    // (\.\d+)?  --> this is optional
    // (\d+(\.\d+)?)  --> outer capture 1 for $1
    // % literal sign
    // g --> for all kinf of % occurences in the whole expression globally

    // a sandboxed function
    try {
      const value = Function(`  "use strict" ;
                                    return ${transformed} `)(); //self calling and safe

      // Here , v = the final result of the mathematical expression after evaluation.

      if (!isFinite(value)) return "Error";
      else return String(value);
    } catch {
      return "Error";
    }
  };

  // ********************************************************************************************
  const handleButtonClick = (value) => {
    //if All Clear
    if (value === "AC") {
      setExpression("");
      setResult("0");
      return;
    }

    if (value === "C") {
      const lastNum = getLastNumber(expression);
      if (lastNum) {
        // if it is number , then remove it from the prev expr
        setExpression((prev) => prev.slice(0, prev.length - lastNum.length));
      } else {
        // if it is not a number , but a operator then remove the last char
        setExpression((prev) => prev.slice(0, -1));
      }
      return;
    }

    if (value === "BACKSPACE") {
      setExpression((prev) => prev.slice(0, -1));
      return;
    }

    if (value === "NEGATE") {
      const lastNum = getLastNumber(expression);
      if (!lastNum) {
        setExpression((prev) => (prev ? prev + "-" : "-"));
        return;
      } else {
        const negation = String(parseFloat(lastNum) * -1); // number ko -1 se multiply krke negate krdia
        setExpression((prev) => replaceLastNumber(prev, negation));
        return;
      }
    }

    if (value === "SQRT") {
      const lastNum = getLastNumber(expression);
      const source = lastNum || result || "0";
      const n = parseFloat(source);
      if (isNaN(n) || n < 0) {
        // Cannot √ a negative number → Error
        // Cannot √ something that is not a valid number → Error
        setResult("Error");
        return;
      }

      const sqrtVal = String(Math.sqrt(n));
      if (lastNum) {
        setExpression((prev) => replaceLastNumber(prev, sqrtVal));
      } else {
        setResult(sqrtVal);
      }
      return;
    }

    if (value === "%") {
      const lastNum = getLastNumber(expression);
      if (!lastNum) {
        return;
      }
      setExpression((prev) => replaceLastNumber(prev, `(${lastNum}/100)`));
      return;
    }

    if (value === "=") {
      // if it is evaluated first , that is ki we have pressed = once
      if (evaluated) {
        if (result) {
          setExpression(result);
          setResult("");
        }
        setEvaluated(false);
        return;
      }

      // Otherwise, do a normal evaluation of the current expression
      if (expression) {
        const evaluatedValue = evaluateExpression(expression);
        setResult(evaluatedValue);
        setEvaluated(true);
      }
      return;
    }

    // check if the pressed button is number , dot or operator
    // const isNum = /^[0-9]$/.test(value); // here ^ and & are anchors start and end
    const isDot = value === ".";
    const isOp = isOperator(value);

    // Prevent leading * or /
    if (!expression && (value === "*" || value === "/")) return;

    if (isOp && isOperator(lastChar(expression))) {
      // we will only allow minus here for 2 continous -- , one for subtractor and another for negation sign
      if (value === "-" && lastChar(expression) !== "-") {
        setExpression((prev) => prev + value);
        return;
      }

      // else we will replace last operator with the new one
      setExpression((prev) => prev.slice(0 - 1) + value);
      return;
    }

    if (isDot) {
      const lastNum = getLastNumber(expression);
      if (lastNum.includes(".")) return; // means it already has decimal
      if (lastNum === "") {
        setExpression((prev) => prev + "0.");
        return;
      }
    }

    // append the value
    setExpression((prev) => prev + value);
  };

  return (
    <div className="flex justify-center items-center pt-10 mx-auto bg-[#FAFAE8] h-screen">
      <div className="calculator bg-white">
        <Display expression={expression} result={result} />
        <Keypad onButtonClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default Calculator;
