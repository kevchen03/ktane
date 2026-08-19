import React, { useState, useRef, useEffect } from "react";
import "../../../styling/commonStyles.css";
import "./Passwords.css";

const Passwords = () => {
  const words = useRef([
    "ABOUT",
    "AFTER",
    "AGAIN",
    "BELOW",
    "COULD",
    "EVERY",
    "FIRST",
    "FOUND",
    "GREAT",
    "HOUSE",
    "LARGE",
    "LEARN",
    "NEVER",
    "OTHER",
    "PLACE",
    "PLANT",
    "POINT",
    "RIGHT",
    "SMALL",
    "SOUND",
    "SPELL",
    "STILL",
    "STUDY",
    "THEIR",
    "THERE",
    "THESE",
    "THING",
    "THINK",
    "THREE",
    "WATER",
    "WHERE",
    "WHICH",
    "WORLD",
    "WOULD",
    "WRITE",
  ]);
  const [letters, setLetters] = useState(["", "", "", "", ""]);
  const [matches, setMatches] = useState(words.current);

  useEffect(() => {
    const passwords = words.current;
    const regexp = new RegExp(
      letters
        .map((letter) => {
          return letter ? `[${letter}]` : ".";
        })
        .join("")
    );
    const newMatches = passwords.filter((word) => regexp.test(word));
    setMatches(newMatches);
  }, [letters]);

  const updateLetter = (index, newStr) => {
    if (!/^[A-Z]{0,6}$/.test(newStr.toUpperCase())) return;
    const newLetters = [...letters];
    newLetters[index] = newStr.toUpperCase();
    setLetters(newLetters);
  };

  const reset = () => {
    setLetters(Array(5).fill(""));
  };

  return (
    <div className="containerStyle">
      <h2 className="moduleHeader">Passwords</h2>
      <div className="inputRow">
        {letters.map((letter, index) => {
          return (
            <input
              key={index}
              id={index}
              name={index}
              className="styledTextInput"
              style={{ maxWidth: "50px", fontSize: "10px" }}
              type="text"
              value={letter}
              onChange={(e) => updateLetter(index, e.target.value)}
            />
          );
        })}
      </div>
      <div className="matches" style={{ textAlign: "center" }}>
        <p> Matches </p>
        {matches.length > 0 ? (
          <div className="matchList">
            {matches.map((word, i) => (
              <span key={i} className="matchItem" style={{ fontSize: "10px" }}>
                {word}
              </span>
            ))}
          </div>
        ) : (
          <p className="noMatch">No match found!</p>
        )}
      </div>
      <button onClick={reset} className="resetButton">
        🔁 Reset
      </button>
    </div>
  );
};

export default Passwords;
