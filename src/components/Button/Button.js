import React, { useCallback, useEffect, useState } from "react";
import "../../styling/commonStyles.css";
import holdImage from "./HoldInfo.jpg";

const Button = (props) => {
  const [color, setColor] = useState("Blue");
  const [label, setLabel] = useState("Abort");
  const [response, setResponse] = useState("Hold");
  const validColors = ["Red", "Blue", "White", "Yellow", "Black"];
  const validLabels = ["Abort", "Detonate", "Hold", "Press"];

  const determineRule = useCallback((newColor, newLabel) => {
    if (newColor === "Blue" && newLabel === "Abort") {
      setResponse("Hold");
    } else if (props.batteries > 1 && newLabel === "Detonate") {
      setResponse("Click");
    } else if (newColor === "White" && props.CAR) {
      setResponse("Hold");
    } else if (props.batteries > 2 && props.FRK) {
      setResponse("Click");
    } else if (newColor === "Yellow") {
      setResponse("Hold");
    } else if (newColor === "Red" && newLabel === "Hold") {
      setResponse("Click");
    } else {
      setResponse("Hold");
    }
  }, [props.FRK, props.CAR, props.batteries]);

  useEffect(() => {
    determineRule(color, label);
  }, [color, label, props.CAR, props.FRK, props.batteries, determineRule]);

  return (
    <div className="containerStyle">
      <h2 className="moduleHeader">Button Module</h2>
      <div className="labelRowStyle">
        <label className="labelStyle">Button Color:</label>
        <select
          className="styledSelect"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          {validColors.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
      <div className="labelRowStyle">
        <label className="labelStyle">Button Label:</label>
        <select
          className="styledSelect"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        >
          {validLabels.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
      <div className="labelRowStyle">
        <label className="labelStyle">Action:</label>
        <div className="response" style={{ paddingRight: "5px" }}>
          {response}
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <img src={holdImage} style={{ width: "80%", height: "auto" }} alt="Hold Info"/>
      </div>
    </div>
  );
};

export default Button;
