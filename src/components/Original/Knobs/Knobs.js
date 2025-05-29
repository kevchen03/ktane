import React, { useEffect, useState } from "react";
import "../../../styling/commonStyles.css";
import "./Knobs.css";

const Knobs = () => {
  const [pattern, setPattern] = useState([
    [false, false, false],
    [false, false, false],
  ]);
  const [response, setResponse] = useState("Left");

  const calculateResponse = (newPattern) => {
    const topRow =
      Number(newPattern[0][0] * 4) + (Number(newPattern[0][1]) * 2) +
      Number(newPattern[0][2]);
    const bottomRow =
      Number(newPattern[1][0] * 4) + (Number(newPattern[1][1]) * 2) +
      Number(newPattern[1][2]);
    switch (8 * topRow + bottomRow) {
      case 15:
        setResponse("Up");
        break;
      case 43:
        setResponse("Up");
        break;
      case 31:
        setResponse("Down");
        break;
      case 42:
        setResponse("Down");
        break;
      case 4:
        setResponse("Left");
        break;
      case 0:
        setResponse("Left");
        break;
      case 47:
        setResponse("Right");
        break;
      default:
        setResponse("Unknown pattern!");
        break;
    }
  }

  const updatePattern = (row, col) => {
    const newPattern = pattern.map((newRow) => {
      return [...newRow];
    });
    newPattern[row][col] = !newPattern[row][col];
    setPattern(newPattern);
    calculateResponse(newPattern);
  };

  const resetPattern = () => {
    const newPattern = [Array(3).fill(false), Array(3).fill(false)];
    setPattern(newPattern);
    calculateResponse(newPattern);
  }

  return (
    <div className="containerStyle">
      <h2 className="moduleHeader">(Needy) Knobs</h2>

      <p>Left Knobs</p>
      <div className="knobsGrid">
        {pattern.map((row, rowIndex) => {
          return row.map((button, colIndex) => {
            return (
              <button
                key={`${rowIndex}${colIndex}`}
                className="knob"
                style={{ backgroundColor: button ? "green" : "gray" }}
                onClick={() => updatePattern(rowIndex, colIndex)}
              >
                {button ? "ON" : "OFF"}
              </button>
            );
          });
        })}
      </div>
      <div className="labelRowStyle">
        <label className="labelStyle">Direction:</label>
        <div className="response" style={{ paddingRight: "5px", marginBottom: "15px" }}>
          {response}
        </div>
      </div>
      <button
        onClick={resetPattern}
        className="resetButton"
        style={{ marginTop: "128px"}}
      >
        🔁 Reset
      </button>
    </div>
  );
};

export default Knobs;
