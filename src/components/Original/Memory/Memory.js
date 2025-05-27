import React, { useState } from "react";
import "../../../styling/commonStyles.css";
import "./Memory.css";

const Memory = () => {
  const [inputs, setInputs] = useState([
    {
      DISP: "",
      POS: "",
      LABEL: "",
      RULE: "",
      disablePOS: true,
      disableLABEL: true,
    },
    {
      DISP: "",
      POS: "",
      LABEL: "",
      RULE: "",
      disablePOS: true,
      disableLABEL: true,
    },
    {
      DISP: "",
      POS: "",
      LABEL: "",
      RULE: "",
      disablePOS: true,
      disableLABEL: true,
    },
    {
      DISP: "",
      POS: "",
      LABEL: "",
      RULE: "",
      disablePOS: true,
      disableLABEL: true,
    },
    {
      DISP: "",
      POS: "",
      LABEL: "",
      RULE: "",
      disablePOS: true,
      disableLABEL: true,
    },
  ]);
  const rules = [
    { 1: "2nd POS", 2: "2nd POS", 3: "3rd POS", 4: "4th POS" },
    { 1: "LABEL 4", 2: "S 1 POS", 3: "1st POS", 4: "S 1 POS" },
    { 1: "S 2 LABEL", 2: "S 1 LABEL", 3: "3rd POS", 4: "LABEL 4" },
    { 1: "S 1 POS", 2: "1st POS", 3: "S 2 POS", 4: "S 2 POS" },
    { 1: "S 1 LABEL", 2: "S 2 LABEL", 3: "S 4 LABEL", 4: "S 3 LABEL" },
  ];

  const updateVals = (stage, key, newVal) => {
    const newInputs = inputs.map((input) => {
      return { ...input };
    });
    newInputs[stage][key] = newVal;
    setInputs(newInputs);
  };

  const determineAction = (stage, newDisplay) => {
    const newInputs = inputs.map((input) => {
      return { ...input };
    });
    if (newDisplay === "") {
      newInputs[stage].POS = "";
      newInputs[stage].LABEL = "";
      newInputs[stage].DISP = "";
      newInputs[stage].RULE = "";
      newInputs[stage].disablePOS = true;
      newInputs[stage].disableLABEL = true;
      setInputs(newInputs);
      return;
    }
    newInputs[stage].DISP = newDisplay;
    const dispVal = Number.parseInt(newDisplay);
    if (Number.isNaN(dispVal) || dispVal < 1 || dispVal > 4) return;
    if (rules[stage][dispVal][0] === "S") {
      const oldStage = Number.parseInt(rules[stage][dispVal][2]) - 1;
      const key = rules[stage][dispVal].substring(4);
      newInputs[stage][key] = newInputs[oldStage][key];
      newInputs[stage].RULE = newInputs[oldStage][key];
      if (key === "POS") {
        newInputs[stage].disablePOS = true;
        newInputs[stage].disableLABEL = false;
      } else {
        newInputs[stage].disablePOS = stage === 4 || false;
        newInputs[stage].disableLABEL = true;
      }
    } else if (rules[stage][dispVal][0] === "L") {
      newInputs[stage].LABEL = rules[stage][dispVal][6];
      newInputs[stage].RULE = rules[stage][dispVal];
      newInputs[stage].disablePOS = false;
      newInputs[stage].disableLABEL = true;
    } else {
      newInputs[stage].POS = rules[stage][dispVal];
      newInputs[stage].RULE = rules[stage][dispVal];
      newInputs[stage].disablePOS = true;
      newInputs[stage].disableLABEL = false;
    }
    setInputs(newInputs);
  };

  const resetInputs = () => {
    setInputs([
      {
        DISP: "",
        POS: "",
        LABEL: "",
        RULE: "",
        disablePOS: true,
        disableLABEL: true,
      },
      {
        DISP: "",
        POS: "",
        LABEL: "",
        RULE: "",
        disablePOS: true,
        disableLABEL: true,
      },
      {
        DISP: "",
        POS: "",
        LABEL: "",
        RULE: "",
        disablePOS: true,
        disableLABEL: true,
      },
      {
        DISP: "",
        POS: "",
        LABEL: "",
        RULE: "",
        disablePOS: true,
        disableLABEL: true,
      },
      {
        DISP: "",
        POS: "",
        LABEL: "",
        RULE: "",
        disablePOS: true,
        disableLABEL: true,
      },
    ]);
  };

  return (
    <div className="containerStyle">
      <h2 className="moduleHeader">Memory</h2>

      <table className="inputTable">
        <thead>
          <tr>
            {Object.keys(inputs[0])
              .filter((key) => !key.startsWith("disable"))
              .map((key, index) => {
                return key !== "DISP" ? <th key={index}>{key}</th> : <th key={index}>DISPLAY</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {inputs.map((input, index) => {
            return (
              <tr key={index}>
                <td>
                  <select
                    id={`DISP${index}`}
                    className="styledSelect"
                    style={{ width: "60px", minWidth: "60px" }}
                    value={input.DISP}
                    onChange={(e) => determineAction(index, e.target.value)}
                  >
                    <option key="0" value=""></option>
                    <option key="1" value="1">
                      1
                    </option>
                    <option key="2" value="2">
                      2
                    </option>
                    <option key="3" value="3">
                      3
                    </option>
                    <option key="4" value="4">
                      4
                    </option>
                  </select>
                </td>
                <td>
                  <select
                    id={`POS${index}`}
                    className="styledSelect"
                    style={{ width: "75px", minWidth: "75px" }}
                    value={input.POS}
                    disabled={input.disablePOS}
                    onChange={(e) => updateVals(index, "POS", e.target.value)}
                  >
                    <option key="0" value=""></option>
                    <option key="1" value="1st POS">
                      1st
                    </option>
                    <option key="2" value="2nd POS">
                      2nd
                    </option>
                    <option key="3" value="3rd POS">
                      3rd
                    </option>
                    <option key="4" value="4th POS">
                      4th
                    </option>
                  </select>
                </td>
                <td>
                  <select
                    id={`LABEL${index}`}
                    className="styledSelect"
                    style={{ width: "60px", minWidth: "60px" }}
                    value={input.LABEL}
                    disabled={input.disableLABEL}
                    onChange={(e) => updateVals(index, "LABEL", e.target.value)}
                  >
                    <option key="0" value=""></option>
                    <option key="1" value="1">
                      1
                    </option>
                    <option key="2" value="2">
                      2
                    </option>
                    <option key="3" value="3">
                      3
                    </option>
                    <option key="4" value="4">
                      4
                    </option>
                  </select>
                </td>
                <td style={{ minWidth: "80px" }}>{input.RULE}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={resetInputs} className="resetButton">
        🔁 Reset
      </button>
    </div>
  );
};

export default Memory;
