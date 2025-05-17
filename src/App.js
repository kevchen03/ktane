import React, { useState } from "react";
import SimpleWires from "./components/SimpleWires/SimpleWires";
import SimpleMaze from "./components/SimpleMaze/SimpleMaze";
import "./styling/commonStyles.css";
import "./App.css";

function App() {
  const [serial, setSerial] = useState("");
  const [serialProps, setSerialProps] = useState({ even: false, vowel: false });

  const handleSerial = (newSerial) => {
    // Clean and convert to uppercase
    const cleaned = newSerial.replace(/\s+/g, "").toUpperCase().slice(0, 6); // <-- limit to 6 characters
    setSerial(cleaned);
    if (cleaned.length < 6) {
      setSerialProps({ even: false, vowel: false });
      return;
    }

    let lastDigit = null;
    for (let i = cleaned.length - 1; i >= 0; i--) {
      const char = cleaned[i];
      if (!lastDigit && /\d/.test(char)) {
        lastDigit = parseInt(char);
        break;
      }
    }

    setSerialProps({
      even: lastDigit !== null && lastDigit % 2 === 0,
      vowel: (cleaned.match(/[AEIOU]/g) || []).length > 0,
    });
  };

  return (
    <div>
      <div className="topbar">
        <label htmlFor="serial" style={{ fontWeight: "bold" }}>
          Serial Number:
        </label>
        <input
          type="text"
          value={serial}
          onChange={(e) => handleSerial(e.target.value)}
          maxLength={6} // <-- Add maxLength to restrict input to 6 characters
          className="styledTextInput"
        />
      </div>
      <div className="moduleGrid">
        <div className="moduleBox">
          <SimpleWires serialProps={serialProps} />
        </div>

        <div className="moduleBox">
          <SimpleMaze serialProps={serialProps} />
        </div>
      </div>
    </div>
  );
}

export default App;
