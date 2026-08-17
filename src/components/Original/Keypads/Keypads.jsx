import React, { useState } from "react";
import "../../../styling/commonStyles.css";
import "./Keypads.css";

const Keypads = () => {
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const columns = [
    [
      "&#x3d8;",
      "&#x466;",
      "&#x19b;",
      "&#x3de;",
      "&#x46c;",
      "&#x3d7;",
      "&#x3ff;",
    ],
    [
      "&#x4ec;",
      "&#x3d8;",
      "&#x3ff;",
      "&#x4a8;",
      "&#x2606;",
      "&#x3d7;",
      "&#xbf;",
    ],
    [
      "&#xa9;",
      "&#x47c;",
      "&#x4a8;",
      "&#x497;",
      "&#x506;",
      "&#x19b;",
      "&#x2606;",
    ],
    [
      "&#x431;",
      "&#x0b6;",
      "&#x462;",
      "&#x46c;",
      "&#x497;",
      "&#xbf;",
      "&#x67c;",
    ],
    [
      "&#x3c8;",
      "&#x67c;",
      "&#x462;",
      "&#x3fe;",
      "&#x0b6;",
      "&#x46f;",
      "&#x2605;",
    ],
    [
      "&#x431;",
      "&#x4ec;",
      "&#x482;",
      "&#xe6;",
      "&#x3c8;",
      "&#x419;",
      "&#x3a9;",
    ],
  ];

  const getCharFromUnicode = (unicode) => {
    const hexVal = unicode.replace("&#x", "").replace(";", "");
    return String.fromCodePoint(parseInt(hexVal, 16));
  };

  const toggleSymbol = (symbol) => {
    setSelectedSymbols((prev) => {
      if (prev.includes(symbol)) {
        return prev.filter((s) => s !== symbol);
      } else if (prev.length < 4) {
        return [...prev, symbol];
      }
      return prev; // no change if already 4 selected
    });
  };

  return (
    <div className="containerStyle">
      <h2 className="moduleHeader">Keypad (Symbols)</h2>
      <div className="keypad-grid">
        {columns
          .filter((column) =>
            selectedSymbols.every((sym) => column.includes(sym))
          )
          .map((column, columnIndex) => (
            <div key={columnIndex} className="column">
              {column.map((symbol, symbolIndex) => {
                const isSelected = selectedSymbols.includes(symbol);
                return (
                  <button
                    key={symbolIndex}
                    className={`symbol-box ${isSelected ? "selected" : ""}`}
                    onClick={() => toggleSymbol(symbol)}
                  >
                    {getCharFromUnicode(symbol)}
                  </button>
                );
              })}
            </div>
          ))}
      </div>

      <button onClick={() => setSelectedSymbols([])} className="resetButton">
        🔁 Reset
      </button>
    </div>
  );
};

export default Keypads;
