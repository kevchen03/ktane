import React, { useState } from "react";
import "./OriginalApp/styling/commonStyles.css";
import "./App.css";
import SimpleWires from "./OriginalApp/components/Original/SimpleWires/SimpleWires";
import Button from "./OriginalApp/components/Original/Button/Button";
import Keypads from "./OriginalApp/components/Original/Keypads/Keypads";
import SimonSays from "./OriginalApp/components/Original/SimonSays/SimonSays";
import WhosOnFirst from "./OriginalApp/components/Original/WhosOnFirst/WhosOnFirst";
import Memory from "./OriginalApp/components/Original/Memory/Memory";
import MorseCode from "./OriginalApp/components/Original/MorseCode/MorseCode";
import ComplicatedWires from "./OriginalApp/components/Original/ComplicatedWires/ComplicatedWires";
import WireSequences from "./OriginalApp/components/Original/WireSequences/WireSequences";
import SimpleMaze from "./OriginalApp/components/Original/SimpleMaze/SimpleMaze";
import Passwords from "./OriginalApp/components/Original/Passwords/Passwords";
import Knobs from "./OriginalApp/components/Original/Knobs/Knobs";
import ColorFlash from "./OriginalApp/components/Centurion/ColorFlash/ColorFlash";

function App() {
  const [serial, setSerial] = useState("");
  const [strikes, setStrikes] = useState(0);
  const [serialProps, setSerialProps] = useState({ even: false, vowel: false });
  const [litIndicators, setLitIndicators] = useState({
    BOB: null,
    CAR: null,
    CLR: null,
    FRK: null,
    FRQ: null,
    IND: null,
    MSA: null,
    NSA: null,
    SIG: null,
    SND: null,
    TRN: null,
  });
  const [batteries, setBatteries] = useState({
    AA: 0,
    D: 0,
  });
  const [ports, setPorts] = useState({
    "DVI-D": 0,
    Parallel: 0,
    "PS/2": 0,
    "RJ-45": 0,
    Serial: 0,
    "Stereo RCA": 0,
  });

  const updateSerial = (newSerial) => {
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

  const updateStrikes = (newStrikes) => {
    const val = Number.parseInt(newStrikes);
    if (Number.isNaN(val) || val < 0) return;
    setStrikes(val);
  };

  const updateBatteries = (event) => {
    const { name, value } = event.target;
    const val = Number.parseInt(value);
    if (Number.isNaN(val) || val < 0) return;
    const newBatteries = { ...batteries, [name]: val };
    setBatteries(newBatteries);
  };

  const updatePorts = (event) => {
    const { name, value } = event.target;
    const val = Number.parseInt(value);
    if (Number.isNaN(val) || val < 0) return;
    const newBatteries = { ...ports, [name]: val };
    setPorts(newBatteries);
  };

  const reset = () => {
    updateSerial("");
    setStrikes(0);
    setLitIndicators(
      Object.fromEntries(
        Object.keys(litIndicators).map((key) => {
          return [key, null];
        })
      )
    );
    setBatteries({ AA: 0, D: 0 });
    setPorts(
      Object.fromEntries(
        Object.keys(ports).map((key) => {
          return [key, 0];
        })
      )
    )
  };

  return (
    <div className="appLayout">
      <div className="sidebar">
        <div className="sidebarContent">
          <div className="labelRowStyle">
            <label htmlFor="serial" className="labelStyle">
              Serial Number:
            </label>
            <input
              id="serial"
              type="text"
              value={serial}
              onChange={(e) => updateSerial(e.target.value)}
              maxLength={6} // <-- Add maxLength to restrict input to 6 characters
              className="styledTextInput"
            />
          </div>
          <div className="labelRowStyle">
            <label htmlFor="strikes" className="labelStyle">
              Strikes:
            </label>
            <input
              id="strikes"
              type="number"
              value={strikes}
              onChange={(e) => updateStrikes(e.target.value)}
              className="styledNumInput"
            />
          </div>
          <div
            style={{
              borderTop: "2px solid #444",
            }}
          >
            <h3>Lit Indicators</h3>
            {Object.entries(litIndicators).map(([key, value]) => (
              <div key={key} className="labelRowStyle">
                <label className="labelStyle">{key}</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[
                    { label: "DNE", val: null },
                    { label: "Unlit", val: false },
                    { label: "Lit", val: true },
                  ].map(({ label, val }) => (
                    <button
                      className="litIndicator"
                      key={label}
                      onClick={() =>
                        setLitIndicators((prev) => ({ ...prev, [key]: val }))
                      }
                      style={{
                        backgroundColor: value === val ? "#007bff" : "#f0f0f0",
                        color: value === val ? "#fff" : "#000",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              borderTop: "2px solid #444",
            }}
          >
            <h3>Batteries</h3>
            {Object.entries(batteries).map(([key, value]) => {
              return (
                <div key={key} className="labelRowStyle">
                  <label htmlFor={key} className="labelStyle">
                    {key}
                  </label>
                  <input
                    id={key}
                    name={key}
                    className="styledNumInput"
                    type="number"
                    value={value}
                    onChange={(e) => updateBatteries(e)}
                  />
                </div>
              );
            })}
          </div>
          <div style={{ borderTop: "2px solid #444" }}>
            <h3>Ports</h3>
            {Object.entries(ports).map(([key, value]) => {
              return (
                <div key={key} className="labelRowStyle">
                  <label htmlFor={key} className="labelStyle">
                    {key}
                  </label>
                  <input
                    id={key}
                    name={key}
                    className="styledNumInput"
                    type="number"
                    value={value}
                    onChange={(e) => updatePorts(e)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* Reset button here */}
        <div className="sidebarReset">
          <button onClick={reset} className="resetButton">
            🔁 Reset
          </button>
        </div>
      </div>
      <div className="moduleGrid">
        <div className="moduleBox">
          <SimpleWires serialProps={serialProps} />
        </div>

        <div className="moduleBox">
          <Button
            CAR={litIndicators.CAR}
            FRK={litIndicators.FRK}
            batteries={batteries.AA + batteries.D}
          />
        </div>

        <div className="moduleBox">
          <Keypads />
        </div>

        <div className="moduleBox">
          <SimonSays serialProps={serialProps} strikes={strikes} />
        </div>

        <div className="moduleBox">
          <WhosOnFirst />
        </div>

        <div className="moduleBox">
          <Memory />
        </div>

        <div className="moduleBox">
          <MorseCode />
        </div>

        <div className="moduleBox">
          <ComplicatedWires
            even={serialProps.even}
            parallel={ports.Parallel}
            batteries={batteries.AA + batteries.D}
          />
        </div>

        <div className="moduleBox">
          <WireSequences />
        </div>

        <div className="moduleBox">
          <SimpleMaze />
        </div>

        <div className="moduleBox">
          <Passwords />
        </div>

        <div className="moduleBox">
          <Knobs />
        </div>

        <div className="moduleBox">
          <ColorFlash />
        </div>
      </div>
    </div>
  );
}

export default App;
