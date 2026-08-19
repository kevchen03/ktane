import React, { useState, useEffect, useCallback } from "react";
import "../../../styling/commonStyles.css";
import "./ComplicatedWires.css";

const ComplicatedWires = (props) => {
  const [color, setColor] = useState(0); // W, R, B, RB
  const [decor, setDecor] = useState(0); // N/A, LED, STAR, LEDSTAR
  const [response, setResponse] = useState("Cut");
  const [rules, setRules] = useState([]);
  const colors = ["White", "Red", "Blue", "Red + Blue"];
  const decors = ["None", "LED", "STAR", "LED + STAR"];

  const getBatteriesRule = useCallback(() => {
    return props.batteries > 1 ? "Cut" : "Don't Cut";
  }, [props.batteries]);

  const getEvenRule = useCallback(() => {
    return props.even ? "Cut" : "Don't Cut";
  }, [props.even]);

  const getParallelRule = useCallback(() => {
    return props.parallel ? "Cut" : "Don't Cut";
  }, [props.parallel]);

  useEffect(() => {
    const newRules = [
      ["Cut", "Don't Cut", "Cut", getBatteriesRule()],
      [getEvenRule(), getBatteriesRule(), "Cut", getBatteriesRule()],
      [getEvenRule(), getParallelRule(), "Don't Cut", getParallelRule()],
      [getEvenRule(), getEvenRule(), getParallelRule(), "Don't Cut"],
    ];
    setRules(newRules);
    setResponse(newRules[color][decor]);
  }, [color, decor, getBatteriesRule, getEvenRule, getParallelRule]);

  return (
    <div className="containerStyle">
      <h2 className="moduleHeader">Complicated Wires</h2>
      <div className="labelRowStyle">
        <label htmlFor="color" className="labelStyle">Color:</label>
        <select
          id="color"
          className="styledSelect"
          value={color}
          onChange={(e) => setColor(Number.parseInt(e.target.value))}
        >
          <option key="W" value="0">
            White
          </option>
          <option key="R" value="1">
            Red
          </option>
          <option key="B" value="2">
            Blue
          </option>
          <option key="RB" value="3">
            Red + Blue
          </option>
        </select>
      </div>
      <div className="labelRowStyle">
        <label htmlFor="decor" className="labelStyle">Decor:</label>
        <select
          id="decor"
          className="styledSelect"
          value={decor}
          onChange={(e) => setDecor(Number.parseInt(e.target.value))}
        >
          <option key="NA" value="0">
            None
          </option>
          <option key="LED" value="1">
            LED
          </option>
          <option key="STAR" value="2">
            STAR
          </option>
          <option key="LEDSTAR" value="3">
            LED + STAR
          </option>
        </select>
      </div>
      <div className="labelRowStyle">
        <label className="labelStyle">Action:</label>
        <div
          className="response"
          style={{ paddingRight: "5px", marginBottom: "15px" }}
        >
          {response}
        </div>
      </div>
      <table className="ruleTable">
        <thead>
          <tr>
            <th>Color</th>
            {decors.map((label, index) => {
              return <th key={index}>{label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rules.map((row, index) => {
            return (
              <tr key={index}>
                <td>
                  <strong>{colors[index]}</strong>
                </td>
                {row.map((value, idx) => {
                  return (
                    <td
                      key={idx}
                      style={{
                        backgroundColor:
                          value === "Cut" ? "#c8e6c9" : "#ffcdd2",
                        color: "#000",
                      }}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ComplicatedWires;
