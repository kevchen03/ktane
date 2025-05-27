import React, { useState } from "react";
import "../../../styling/commonStyles.css";
import "./MorseCode.css";

const MorseCode = () => {
  const validWords = {
    SHELL: "3.535",
    HALLS: "3.515",
    SLICK: "3.522",
    STING: "3.592",
    STEAK: "3.582",
    VECTOR: "3.595",
    STROBE: "3.545",
    FLICK: "3.555",
    LEAKS: "3.542",
    BISTRO: "3.552",
    BEATS: "3.600",
    BRICK: "3.575",
    BREAK: "3.572",
    BOMBS: "3.565",
    TRICK: "3.532",
    BOXES: "3.535",
  };
  const translation = {
    ".-": "A",
    "-...": "B",
    "-.-.": "C",
    "-..": "D",
    ".": "E",
    "..-.": "F",
    "--.": "G",
    "....": "H",
    "..": "I",
    ".---": "J",
    "-.-": "K",
    ".-..": "L",
    "--": "M",
    "-.": "N",
    "---": "O",
    ".--.": "P",
    "--.-": "Q",
    ".-.": "R",
    "...": "S",
    "-": "T",
    "..-": "U",
    "...-": "V",
    ".--": "W",
    "-..-": "X",
    "-.--": "Y",
    "--..": "Z",
  };
  const [letters, setLetters] = useState(["", "", "", "", "", ""]);
  const [matches, setMatches] = useState(
    Object.entries(validWords).map(([key, val]) => {
      return `${val.substring(2)} (${key})`;
    })
  );

  const getMorse = (morseLetters) => {
    const regexp = new RegExp(
      `^${morseLetters
        .map((letter) =>
          letter.trim() && Object.keys(translation).includes(letter.trim())
            ? translation[letter]
            : ".?"
        )
        .join("")}$`
    );
    const matchingWords = Object.keys(validWords)
      .filter((word) => regexp.test(word))
      .map((word) => {
        return `${validWords[word].substring(2)} (${word})`;
      });
    setMatches(matchingWords);
  };

  const handleUpdate = (index, newStr) => {
    const newLetters = [...letters];
    const newLetter = newStr.split(" ").join("").trim();
    if (newLetter && !/^[-.]{0,4}$/.test(newLetter)) return;
    newLetters[index] = newLetter;
    setLetters(newLetters);
    getMorse(newLetters);
  };

  const reset = () => {
    setLetters(["", "", "", "", "", ""]);
    getMorse(["", "", "", "", "", ""]);
  };

  return (
    <div className="containerStyle">
      <h2 className="moduleHeader">Morse Code</h2>
      <div className="inputRow">
        {letters.map((letter, index) => {
          return (
            <input
              key={index}
              id={index}
              name={index}
              className="styledTextInput"
              style={{ maxWidth: "35px" }}
              type="text"
              value={letter}
              onChange={(e) => handleUpdate(index, e.target.value)}
            />
          );
        })}
      </div>
      <div className="matches" style={{ textAlign: "center" }}>
        <p> Matches </p>
        {matches.length > 0 ? (
          <div className="matchList">
            {matches.map((word, i) => (
              <span key={i} className="matchItem">
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

export default MorseCode;
