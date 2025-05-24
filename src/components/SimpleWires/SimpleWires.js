import React, { useEffect, useState, useCallback } from "react";
import "../../styling/commonStyles.css";
import "./SimpleWires.css";

const SimpleWires = (props) => {
  const { serialProps } = props;
  const [numWires, setNumWires] = useState(3);
  const [selectedColors, setSelectedColors] = useState([]);
  const [response, setResponse] = useState("");
  const colorOptions = ["r", "b", "w", "k", "y"];
	const colorMap = {
		r: "red",
		b: "blue",
		w: "white",
		k: "black",
		y: "yellow"
	};

  const handleNumWireChange = (event) => {
    const val = Number.parseInt(event.target.value);
    if (Number.isNaN(val) || val < 3 || val > 6) return;
    setNumWires(val);
    resetSelection();
  };

  const handleColorClick = (color) => {
    if (selectedColors.length >= numWires || !color) return;

    const newSelection = [...selectedColors, color];
    setSelectedColors(newSelection);
  };

	const deselectWire = (i) => {
		const updated = selectedColors.filter((_, index) => index !== i);
		setSelectedColors(updated);
	}

  const resetSelection = () => {
    setSelectedColors([]);
    setResponse("");
  };

  const getWireToCut = () => {
    const match = response.match(/wire (\d)/i);
    return match ? parseInt(match[1]) - 1 : null;
  };

  const runWireLogic = useCallback(
    (colors) => {
      const c = colors.join("").toLowerCase().trim();

      const deduceLogic3 = () => {
        if (!c.includes("r")) {
          setResponse("Cut wire 2!");
        } else if (c[2] === "w") {
          setResponse("Cut wire 3!");
        } else if ((c.match(/b/g) || []).length > 1) {
          setResponse(`Cut wire ${c.lastIndexOf("b") + 1} (last blue wire)!`);
        } else {
          setResponse("Cut wire 2!");
        }
      };

      const deduceLogic4 = () => {
        const reds = (c.match(/r/g) || []).length;
        const blues = (c.match(/b/g) || []).length;
        const yellows = (c.match(/y/g) || []).length;

        if (reds > 1 && !serialProps.even) {
          setResponse(`Cut wire ${c.lastIndexOf("r") + 1} (last red wire)!`);
        } else if (c[3] === "y" && reds === 0) {
          setResponse("Cut wire 1!");
        } else if (blues === 1) {
          setResponse("Cut wire 1!");
        } else if (yellows > 1) {
          setResponse("Cut wire 4!");
        } else {
          setResponse("Cut wire 2!");
        }
      };

      const deduceLogic5 = () => {
        const reds = (c.match(/r/g) || []).length;
        const yellows = (c.match(/y/g) || []).length;
        const blacks = (c.match(/k/g) || []).length;

        if (c[4] === "b" && !serialProps.even) {
          setResponse("Cut wire 3!");
        } else if (reds === 1 && yellows > 1) {
          setResponse("Cut wire 1!");
        } else if (blacks === 0) {
          setResponse("Cut wire 2!");
        } else {
          setResponse("Cut wire 1!");
        }
      };

      const deduceLogic6 = () => {
        const reds = (c.match(/r/g) || []).length;
        const yellows = (c.match(/y/g) || []).length;
        const whites = (c.match(/w/g) || []).length;

        if (yellows === 0 && !serialProps.even) {
          setResponse("Cut wire 3!");
        } else if (yellows === 1 && whites > 1) {
          setResponse("Cut wire 4!");
        } else if (reds === 0) {
          setResponse("Cut wire 6!");
        } else {
          setResponse("Cut wire 4!");
        }
      };

      switch (numWires) {
        case 3:
          deduceLogic3();
          break;
        case 4:
          deduceLogic4();
          break;
        case 5:
          deduceLogic5();
          break;
        case 6:
          deduceLogic6();
          break;
        default:
          break;
      }
    },
    [numWires, serialProps]
  );

  useEffect(() => {
    if (selectedColors.length === numWires) {
      runWireLogic(selectedColors);
    } else {
      setResponse("");
    }
  }, [serialProps, numWires, selectedColors, runWireLogic]);

  return (
    <div className="containerStyle">
      <h2 className="moduleHeader">Simple Wires</h2>

      {/* Number of wires input */}
      <div className="labelRowStyle">
        <label htmlFor="numWires" className="labelStyle">
          Number of wires:
        </label>
        <input
          className="styledNumInput"
          id="numWires"
          type="number"
          value={numWires}
          onChange={handleNumWireChange}
        />
      </div>

      {/* Color selection buttons */}
      <div className="colorLayout">
        {colorOptions.map((color) => {
          const textColor = color === "w" || color === "y" ? "black" : "white";
          return (
            <button
              key={color}
              className="colorBox"
              onClick={() => handleColorClick(color)}
              disabled={selectedColors.length >= numWires}
              style={{
                backgroundColor: colorMap[color],
                color: textColor,
              }}
            >
              {color.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Selected color wires */}
      <div>
        <p>Selected:</p>
        <div className="selectedColors">
          {selectedColors.map((color, i) => {
            const wireToCut = getWireToCut();
            const isTarget = i === wireToCut;
            return (
              <div
                key={i}
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: colorMap[color],
                  border: isTarget ? "3px solid limegreen" : "1px solid #000",
                  boxShadow: isTarget ? "0 0 10px limegreen" : "none",
                  transition: "0.01s",
                  cursor: "pointer",
                }}
                title={`Wire ${i + 1}`}
                onClick={() => deselectWire(i)}
              />
            );
          })}
        </div>
      </div>

      {/* Reset button */}
      <button
        onClick={resetSelection}
        className="resetButton"
        onMouseOver={(e) => (e.target.style.backgroundColor = "#444")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#2b2b2b")}
      >
        🔁 Reset
      </button>

      {/* Result */}
      <p className="response">
        {response}
      </p>
    </div>
  );
};

export default SimpleWires;
