import React, { useCallback, useEffect, useState } from "react";
import "../../../styling/commonStyles.css";
import "./ColorFlash.css";

const CENTERX = 200;
const CENTERY = 125;
const RADIUS = 90;

const ColorFlash = () => {
  const colorChoices = {
    r: "red",
    y: "yellow",
    g: "green",
    b: "blue",
    m: "magenta",
    w: "white",
  };
  const [currChoice, setCurrChoice] = useState({ key: "word", index: 0 });
  const [sequence, setSequence] = useState({
    word: Array(8).fill(null),
    color: Array(8).fill(null),
  });
  const [response, setResponse] = useState({ position: null, button: null });

  const determineResponse = useCallback(
    (seq) => {
      const lastRed = () => {
        if (seq.word.filter((w) => w === "g").length > 2) {
          var gCount = 0;
          for (let i = 0; i < 8; i++) {
            if (seq.word[i] === "g") {
              gCount++;
            }
            if (seq.color[i] === "g") {
              gCount++;
            }
            if (gCount > 2) {
              setResponse({ position: i, button: true });
              return;
            }
          }
        } else if (
          seq.color.filter((c) => c === "b").length === 1 &&
          seq.word.filter((w) => w === "m").length
        ) {
          setResponse({ position: seq.word.indexOf("m"), button: false });
        } else {
          for (let i = 7; i >= 0; i--) {
            if (seq.word[i] === "w" || seq.color[i] === "w") {
              setResponse({ position: i, button: true });
              return;
            }
          }
        }
        setResponse({
          position: -1,
          button: null,
          message: "This pattern is unknown!",
        });
      };

      const lastYellow = () => {
        const getCond1 = () => {
          for (let i = 0; i < 8; i++) {
            if (seq.word[i] === "b" && seq.color[i] === "g") {
              return true;
            }
          }
          return false;
        };

        const getCond2 = () => {
          for (let i = 0; i < 8; i++) {
            if (
              seq.word[i] === "w" &&
              (seq.color[i] === "w" || seq.color[i] === "r")
            ) {
              return true;
            }
          }
          return false;
        };

        if (getCond1()) {
          setResponse({ position: seq.color.indexOf("g"), button: true });
        } else if (getCond2()) {
          var diffCount = 0;
          for (let i = 0; i < 8; i++) {
            if (seq.word[i] !== seq.color[i]) {
              diffCount++;
            }
            if (diffCount === 2) {
              setResponse({ position: i, button: true });
              return;
            }
          }
        } else {
          var mCount = 0;
          for (let i = 0; i < 8; i++) {
            if (seq.word[i] === "m" || seq.color[i] === "m") {
              mCount++;
            }
          }
          if (mCount) {
            setResponse({ position: mCount - 1, button: false });
            return;
          }
        }
        setResponse({
          position: -1,
          button: null,
          message: "This pattern is unknown!",
        });
      };

      const lastGreen = () => {
        const getCond1 = () => {
          for (let i = 0; i < 7; i++) {
            if (
              seq.word[i] === seq.word[i + 1] &&
              seq.color[i] !== seq.color[i + 1]
            ) {
              return true;
            }
          }
          return false;
        };

        if (getCond1()) {
          setResponse({ position: 4, button: false });
        } else if (seq.word.filter((w) => w === "m").length > 2) {
          for (let i = 0; i < 8; i++) {
            if (seq.word[i] === "y" || seq.color[i] === "y") {
              setResponse({ position: i, button: false });
              return;
            }
          }
        } else {
          // Finds first position instead of all for speed
          for (let i = 0; i < 8; i++) {
            if (seq.word[i] === seq.color[i]) {
              setResponse({
                position: i,
                button: true,
                message: "Press YES any time the word and color match!",
              });
              return;
            }
          }
        }
        setResponse({
          position: -1,
          button: null,
          message: "This pattern is unknown!",
        });
      };

      const lastBlue = () => {
        const getCond1 = () => {
          let first = -1,
            count = 0;
          for (let i = 0; i < 8; i++) {
            if (seq.word[i] !== seq.color[i]) {
              if (first === -1) {
                first = i;
              }
              if (++count > 2) {
                setResponse({ position: first, button: true });
                return true;
              }
            }
          }
          return false;
        };

        const getCond2 = () => {
          for (let i = 0; i < 8; i++) {
            if (
              (seq.word[i] === "r" && seq.color[i] === "y") ||
              (seq.word[i] === "y" && seq.color[i] === "w")
            ) {
              for (let j = 0; j < 8; j++) {
                if (seq.word[j] === "w" && seq.color[j] === "r") {
                  setResponse({ position: j, button: false });
                  return true;
                }
              }
              break;
            }
          }
          return false;
        };

        if (getCond1() || getCond2()) {
          return;
        }
        const greenIndex = Math.max(
          seq.word.lastIndexOf("g"),
          seq.color.lastIndexOf("g")
        );
        if (greenIndex === -1) {
          setResponse({
            position: -1,
            button: null,
            message: "This pattern is unknown!",
          });
        } else {
          setResponse({
            position: greenIndex,
            button: true,
          });
        }
      };

      const lastMagenta = () => {
        const getCond1 = () => {
          for (let i = 0; i < 7; i++) {
            if (
              seq.word[i] !== seq.word[i + 1] &&
              seq.color[i] === seq.color[i + 1]
            ) {
              setResponse({ position: 2, button: true });
              return true;
            }
          }
          return false;
        };

        const getCond2 = () => {
          if (
            seq.word.filter((w) => w === "y").length >
            seq.color.filter((c) => c === "b").length
          ) {
            setResponse({ position: seq.word.lastIndexOf("y"), button: false });
            return true;
          }
          return false;
        };

        if (getCond1() || getCond2()) return;
        for (let i = 0; i < 8; i++) {
          if (seq.word[6] === seq.color[i]) {
            setResponse({ position: i, button: false });
            return;
          }
        }
        setResponse({
          position: -1,
          button: null,
          message: "This pattern is unknown!",
        });
      };

      const lastWhite = () => {
        const getCond1 = () => {
          if (seq.color[2] === seq.word[3] || seq.color[2] === seq.word[4]) {
            for (let i = 0; i < 8; i++) {
              if (seq.word[i] === "b" || seq.color[i] === "b") {
                setResponse({ position: i, button: false });
                return true;
              }
            }
          }
          return false;
        };

        const getCond2 = () => {
          for (let i = 0; i < 8; i++) {
            if (seq.word[i] === "y" && seq.color[i] === "r") {
              setResponse({
                position: seq.color.lastIndexOf("b"),
                button: true,
              });
              return true;
            }
          }
          return false;
        };

        if (getCond1() || getCond2()) return;
        setResponse({
          position: 0,
          button: false,
          message: "Press NO on ANY position!",
        });
      };

      switch (seq.color[7]) {
        case "r":
          lastRed();
          break;
        case "y":
          lastYellow();
          break;
        case "g":
          lastGreen();
          break;
        case "b":
          lastBlue();
          break;
        case "m":
          lastMagenta();
          break;
        case "w":
          lastWhite();
          break;
        default:
          break;
      }
    },
    [setResponse]
  );

  useEffect(() => {
    if (
      sequence.word.every((w) => w !== null) &&
      sequence.color.every((c) => c !== null)
    ) {
      determineResponse(sequence);
    } else {
      setResponse({ position: null, button: null });
    }
  }, [sequence, determineResponse]);

  const updateSequence = (newVal) => {
    const newSequence = {
      word: [...sequence.word],
      color: [...sequence.color],
    };
    newSequence[currChoice.key][currChoice.index] = newVal;
    setSequence(newSequence);
    if (newVal === null) return;
    if (newSequence.word.every((w) => w) && newSequence.color.every((c) => c)) {
      setCurrChoice({ ...currChoice, index: null });
      return;
    }
    const newChoice = { ...currChoice };
    for (let i = currChoice.index + 1; i < 8; i++) {
      if (newSequence[currChoice.key][i] === null) {
        newChoice.index = i;
        setCurrChoice(newChoice);
        return;
      }
    }
    const nextKey = newChoice.key === "word" ? "color" : "word";
    for (let i = 0; i < 8; i++) {
      if (newSequence[nextKey][i] === null) {
        newChoice.key = nextKey;
        newChoice.index = i;
        setCurrChoice(newChoice);
        return;
      }
    }
    for (let i = 0; i < newChoice.index; i++) {
      if (newSequence[currChoice.key][i] === null) {
        newChoice.index = i;
        setCurrChoice(newChoice);
        return;
      }
    }
  };

  const reset = () => {
    setSequence({
      word: Array(8).fill(null),
      color: Array(8).fill(null),
    });
    setCurrChoice({ key: "word", index: 0 });
  };

  return (
    <div className="containerStyle">
      <h2 className="moduleHeader">Color Flash</h2>
      <div className="colorLayout">
        {Object.keys(colorChoices).map((color) => {
          return (
            <button
              key={color}
              className="colorBox"
              onClick={() => updateSequence(color)}
              style={{
                backgroundColor: colorChoices[color],
                color: color === "w" || color === "y" ? "black" : "white",
              }}
            >
              {color.toUpperCase()}
            </button>
          );
        })}
        <button
          key="none"
          className="colorBox"
          onClick={() => updateSequence(null)}
          style={{
            backgroundColor: "#ddd",
            color: "red",
          }}
        >
          X
        </button>
      </div>
      <div
        className="circle-wrapper"
        style={{ width: CENTERX * 2, height: CENTERY * 2, margin: "5px" }}
      >
        <svg
          width={CENTERX * 2}
          height={CENTERY * 2}
          viewBox={`0 0 ${CENTERX * 2} ${CENTERY * 2}`}
          style={{ background: "#f9f9f9", borderRadius: 12 }}
        >
          {/* Stacked "Word" label on the left */}
          {["W", "O", "R", "D"].map((letter, i) => (
            <text
              key={`word-label-${i}`}
              x={CENTERX - RADIUS - 50} // push further left from the circle
              y={CENTERY - 36 + i * 25} // center vertically
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontWeight: "bold",
                fontSize: 22,
                userSelect: "none",
                fill: "#333",
              }}
            >
              {letter}
            </text>
          ))}

          {/* Stacked "Color" label on the right */}
          {["C", "O", "L", "O", "R"].map((letter, i) => (
            <text
              key={`color-label-${i}`}
              x={CENTERX + RADIUS + 50} // push further right from the circle
              y={CENTERY - 45 + i * 25} // center vertically
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontWeight: "bold",
                fontSize: 22,
                userSelect: "none",
                fill: "#333",
              }}
            >
              {letter}
            </text>
          ))}

          {/* YES box inside left half of circle */}
          <g>
            <rect
              x={CENTERX - 75}
              y={CENTERY - 20}
              width={50}
              height={30}
              rx={6}
              ry={6}
              fill={response.button === true ? "#d4f4dd" : "#ddd"}
              stroke={response.button === true ? "#6bbf7a" : "#aaa"}
              strokeWidth={3}
            />
            <text
              x={CENTERX - 50}
              y={CENTERY - 5}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={16}
              fontWeight="bold"
              fill={response.button === true ? "#2c662d" : "#777"}
              style={{ userSelect: "none" }}
            >
              YES
            </text>
          </g>

          {/* NO box inside right half of circle */}
          <g>
            <rect
              x={CENTERX + 25}
              y={CENTERY - 20}
              width={50}
              height={30}
              rx={6}
              ry={6}
              fill={response.button === false ? "#f8d7da" : "#e0e0e0"}
              stroke={response.button === false ? "#c0392b" : "#aaa"}
              strokeWidth={3}
            />
            <text
              x={CENTERX + 50}
              y={CENTERY - 5}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={16}
              fontWeight="bold"
              fill={response.button === false ? "#842029" : "#777"}
              style={{ userSelect: "none" }}
            >
              NO
            </text>
          </g>

          {/* Word positions - left half, top to bottom */}
          {[...Array(8)].map((_, i) => {
            const angle = (2.2 * Math.PI) / 4 + (0.9 * i * Math.PI) / 7; // -135° to -225°
            const x = CENTERX + RADIUS * Math.cos(angle) - 15;
            const y = CENTERY - RADIUS * Math.sin(angle);

            const val = sequence.word[i];
            const isSelected =
              currChoice.key === "word" && currChoice.index === i;
            const isResponse = response.position === i;

            return (
              <g
                key={`word-${i}`}
                transform={`translate(${x},${y})`}
                style={{ cursor: "pointer" }}
                onClick={() => setCurrChoice({ key: "word", index: i })}
              >
                <circle
                  r={12}
                  fill={val ? colorChoices[val] : "#ddd"}
                  stroke={
                    isResponse ? "#1e90ff" : isSelected ? "black" : "#ccc"
                  }
                  strokeWidth={isSelected ? 4 : 2.5}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={val === "y" || val === "w" ? "black" : "white"}
                  fontWeight="bold"
                  fontSize={12}
                  pointerEvents="none"
                  style={{ userSelect: "none" }}
                >
                  {val?.toUpperCase() ?? ""}
                </text>
              </g>
            );
          })}

          {/* Color positions - right half, top to bottom */}
          {[...Array(8)].map((_, i) => {
            const angle = (-1.8 * Math.PI) / 4 + (0.9 * i * Math.PI) / 7; // -45° to +45°
            const x = CENTERX + RADIUS * Math.cos(angle) + 15;
            const y = CENTERY + RADIUS * Math.sin(angle);

            const val = sequence.color[i];
            const isSelected =
              currChoice.key === "color" && currChoice.index === i;
            const isResponse = response.position === i;

            return (
              <g
                key={`color-${i}`}
                transform={`translate(${x},${y})`}
                style={{ cursor: "pointer" }}
                onClick={() => setCurrChoice({ key: "color", index: i })}
              >
                <circle
                  r={12}
                  fill={val ? colorChoices[val] : "#ddd"}
                  stroke={
                    isResponse ? "#1e90ff" : isSelected ? "black" : "#ccc"
                  }
                  strokeWidth={isSelected ? 4 : 2.5}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={val === "y" || val === "w" ? "black" : "white"}
                  fontWeight="bold"
                  fontSize={12}
                  pointerEvents="none"
                  style={{ userSelect: "none" }}
                >
                  {val?.toUpperCase() ?? ""}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div
        style={{
          textAlign: "center",
          color: response.position === null || response.position === -1 ? "red" : "green",
          marginTop: "-8px",
        }}
      >
        {response.position === null
          ? `You must select all words and colors!`
          : response.message
          ? response.message
          : `Press ${response.button ? "YES" : "NO"} on entry ${
              response.position + 1
            }!`}
      </div>
      <button
        onClick={reset}
        className="resetButton"
        style={{ marginTop: "8px" }}
      >
        🔁 Reset
      </button>
    </div>
  );
};

export default ColorFlash;
