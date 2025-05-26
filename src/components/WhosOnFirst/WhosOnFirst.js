import React, { useState } from "react";
import "../../styling/commonStyles.css";
import "./WhosOnFirst.css";

const WhosOnFirst = () => {
  const [currDisplay, setCurrDisplay] = useState("");
  const [location, setLocation] = useState("Bottom Left");
  const [currWord, setCurrWord] = useState("UH HUH");
  const [pressOrder, setPressOrder] = useState(["UH HUH"]);
  const currDisplayRules = {
    "Top Left": ["UR"],
    "Middle Left": ["LED", "NOTHING", "THEY ARE", "YES"],
    "Bottom Left": ["", "LEED", "REED", "THEY'RE"],
    "Top Right": ["C", "FIRST", "OKAY"],
    "Middle Right": ["BLANK", "READ", "RED", "THEIR", "YOU", "YOUR", "YOU'RE"],
    "Bottom Right": [
      "CEE",
      "DISPLAY",
      "HOLD ON",
      "LEAD",
      "NO",
      "SAYS",
      "SEE",
      "THERE",
      "YOU ARE",
    ],
  };
  const clickRules = {
    BLANK: ["WAIT", "RIGHT", "OKAY", "MIDDLE", "BLANK"],
    DONE: [
      "SURE",
      "UH HUH",
      "NEXT",
      "WHAT?",
      "YOUR",
      "UR",
      "YOU'RE",
      "HOLD",
      "LIKE",
    ],
    FIRST: [
      "LEFT",
      "OKAY",
      "YES",
      "MIDDLE",
      "NO",
      "RIGHT",
      "NOTHING",
      "UHHH",
      "WAIT",
    ],
    HOLD: [
      "YOU ARE",
      "U",
      "DONE",
      "UH UH",
      "YOU",
      "UR",
      "SURE",
      "WHAT?",
      "YOU'RE",
    ],
    LEFT: ["RIGHT", "LEFT"],
    LIKE: [
      "YOU'RE",
      "NEXT",
      "U",
      "UR",
      "HOLD",
      "DONE",
      "UH UH",
      "WHAT?",
      "UH HUH",
    ],
    MIDDLE: [
      "BLANK",
      "READY",
      "OKAY",
      "WHAT",
      "NOTHING",
      "PRESS",
      "NO",
      "WAIT",
      "LEFT",
    ],
    NEXT: ["WHAT?", "UH HUH", "UH UH", "YOUR", "HOLD", "SURE", "NEXT"],
    NO: [
      "BLANK",
      "UHHH",
      "WAIT",
      "FIRST",
      "WHAT",
      "READY",
      "RIGHT",
      "YES",
      "NOTHING",
    ],
    NOTHING: [
      "UHHH",
      "RIGHT",
      "OKAY",
      "MIDDLE",
      "YES",
      "BLANK",
      "NO",
      "PRESS",
      "LEFT",
    ],
    OKAY: ["MIDDLE", "NO", "FIRST", "YES", "UHHH", "NOTHING", "WAIT", "OKAY"],
    PRESS: ["RIGHT", "MIDDLE", "YES", "READY", "PRESS"],
    READY: [
      "YES",
      "OKAY",
      "WHAT",
      "MIDDLE",
      "LEFT",
      "PRESS",
      "RIGHT",
      "BLANK",
      "READY",
    ],
    RIGHT: ["YES", "NOTHING", "READY", "PRESS", "NO", "WAIT", "WHAT", "RIGHT"],
    SURE: [
      "YOU ARE",
      "DONE",
      "LIKE",
      "YOU'RE",
      "YOU",
      "HOLD",
      "UH HUH",
      "HR",
      "SURE",
    ],
    U: [
      "UH HUH",
      "SURE",
      "NEXT",
      "WHAT?",
      "YOU'RE",
      "UR",
      "UH HUH",
      "DONE",
      "U",
    ],
    UHHH: [
      "READY",
      "NOTHING",
      "LEFT",
      "WHAT",
      "OKAY",
      "YES",
      "RIGHT",
      "NO",
      "PRESS",
    ],
    "UH HUH": ["UH HUH"],
    "UH UH": ["UR", "U", "YOU ARE", "YOU'RE", "NEXT", "UH UH"],
    UR: ["DONE", "U", "UR"],
    WAIT: [
      "UHHH",
      "NO",
      "BLANK",
      "OKAY",
      "YES",
      "LEFT",
      "FIRST",
      "PRESS",
      "WHAT",
    ],
    WHAT: ["UHHH", "WHAT"],
    "WHAT?": [
      "YOU",
      "HOLD",
      "YOU'RE",
      "YOUR",
      "U",
      "DONE",
      "UH UH",
      "LIKE",
      "YOU ARE",
    ],
    YES: [
      "OKAY",
      "RIGHT",
      "UHHH",
      "MIDDLE",
      "FIRST",
      "WHAT",
      "PRESS",
      "READY",
      "NOTHING",
    ],
    YOU: [
      "SURE",
      "YOU ARE",
      "YOUR",
      "YOU'RE",
      "NEXT",
      "UH HUH",
      "UR",
      "HOLD",
      "WHAT?",
    ],
    "YOU'RE": ["YOU", "YOU'RE"],
    "YOU ARE": [
      "YOUR",
      "NEXT",
      "LIKE",
      "UH HUH",
      "WHAT?",
      "DONE",
      "UH UH",
      "HOLD",
      "YOU",
    ],
    YOUR: ["UH UH", "YOU ARE", "UH HUH", "YOUR"],
  };

  const getLocation = (newDisplay) => {
    setCurrDisplay(newDisplay);
    for (const [key, values] of Object.entries(currDisplayRules)) {
      if (values.includes(newDisplay)) {
        setLocation(key);
        return;
      }
    }
    setLocation("ERROR");
  };

  const getPressOrder = (newValue) => {
    setCurrWord(newValue);
    setPressOrder(clickRules[newValue] || []);
  };

  return (
    <div className="containerStyle">
      <h2 className="moduleHeader">Who's On First</h2>
      <div className="labelRowStyle">
        <label htmlFor="DisplayWord" className="labelStyle">
          Display:
        </label>
        <select
          id="DisplayWord"
          className="styledSelect"
          value={currDisplay}
          onChange={(e) => getLocation(e.target.value)}
        >
          {Object.values(currDisplayRules)
            .flat()
            .sort()
            .map((word, index) => {
              return (
                <option key={index} value={word}>
                  {word ? word : "(BLANK)"}
                </option>
              );
            })}
        </select>
      </div>
      <div className="labelRowStyle">
        <label htmlFor="location" className="labelStyle">
          Location:
        </label>
        <input
          id="location"
          type="text"
          className="styledTextInput"
          value={location}
          disabled
        />
      </div>
      <div className="labelRowStyle">
        <label htmlFor="ButtonWord" className="labelStyle">
          Word:
        </label>
        <select
          id="ButtonWord"
          className="styledSelect"
          value={currWord}
          onChange={(e) => getPressOrder(e.target.value)}
        >
          {Object.keys(clickRules).map((word, index) => {
            return (
              <option key={index} value={word}>
                {word}
              </option>
            );
          })}
        </select>
      </div>
      <div className="pressOrder">
        <div className="labelStyle" style={{ marginBottom: "8px" }}>
          Press Order:
        </div>
        {pressOrder.length > 0 ? (
          <div className="pressOrderList">
            {pressOrder.map((word, i) => (
              <span key={i} className="pressWord">
                {word}
              </span>
            ))}
          </div>
        ) : (
          <p className="noWords">Unknown word selected!</p>
        )}
      </div>
    </div>
  );
};

export default WhosOnFirst;
