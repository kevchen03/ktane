import React, { useState } from "react";
import "../../../styling/commonStyles.css";

const WireSequences = () => {
  const rules = {
    red: ["C", "B", "A", "AC", "B", "AC", "ABC", "AB", "B"],
    blue: ["B", "AC", "B", "A", "B", "BC", "C", "AC", "A"],
    black: ["ABC", "AC", "B", "AC", "B", "BC", "AB", "C", "C"],
  };
  const [sequence, setSequence] = useState([
    { red: "", blue: "", black: "" },
    { red: "", blue: "", black: "" },
    { red: "", blue: "", black: "" },
    { red: "", blue: "", black: "" },
    { red: "", blue: "", black: "" },
    { red: "", blue: "", black: "" },
    { red: "", blue: "", black: "" },
    { red: "", blue: "", black: "" },
    { red: "", blue: "", black: "" },
  ]);

  const updateSequence = (index, key, newColor) => {
    const newSequence = sequence.map((row) => {
      return { ...row };
    });
    newSequence[index][key] = newColor;
    setSequence(newSequence);
  };

  const determineBGColor = (idx, color, val) => {
    if (val === "") return "white";
    return rules[color][idx].includes(val) ? "#c8e6c9" : "#ffcdd2";
  };

  const resetSequence = () => {
    setSequence([
      { red: "", blue: "", black: "" },
      { red: "", blue: "", black: "" },
      { red: "", blue: "", black: "" },
      { red: "", blue: "", black: "" },
      { red: "", blue: "", black: "" },
      { red: "", blue: "", black: "" },
      { red: "", blue: "", black: "" },
      { red: "", blue: "", black: "" },
      { red: "", blue: "", black: "" },
    ]);
  };

  return (
    <div className="containerStyle">
      <h2 className="moduleHeader">Wire Sequences</h2>
      <table className="inputTable" style={{ marginTop: "0px" }}>
        <thead>
          <tr>
            {Object.keys(rules).map((key, index) => {
              return (
                <td key={index} style={{ padding: "3px" }}>
                  {`${key[0].toUpperCase()}${key.substring(1)}`}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sequence.map((row, index) => {
            return (
              <tr key={index}>
                {Object.entries(row).map(([color, val]) => {
                  return (
                    <td
                      key={color}
                      style={{
                        padding: "3px",
                        backgroundColor: determineBGColor(index, color, val),
                      }}
                    >
                      <select
                        id={color}
                        className="styledSelect"
                        style={{
                          minWidth: "80px",
                          width: "80px",
                          fontSize: "8px",
                        }}
                        value={val}
                        onChange={(e) =>
                          updateSequence(index, color, e.target.value)
                        }
                      >
                        <option key="" val=""></option>
                        <option key="A" val="A">
                          A
                        </option>
                        <option key="B" val="B">
                          B
                        </option>
                        <option key="C" val="C">
                          C
                        </option>
                      </select>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={resetSequence} className="resetButton">
        🔁 Reset
      </button>
    </div>
  );
};

export default WireSequences;
