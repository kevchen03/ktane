import { createContext, useContext, useState } from "react";

const KeyInfoContext = createContext(null);

export function useKeyInfo() {
  const context = useContext(KeyInfoContext);

  if (!context) {
    throw new Error("useKeyInfo must be used within a KeyInfoProvider");
  }

  return context;
}

export default function KeyInfoProvider({ children }) {
  // #region Bomb Info

  const [serial, setSerial] = useState("");
  const [serialProps, setSerialProps] = useState({
    even: false,
    vowel: false,
  });

  const [strikes, setStrikes] = useState(0);

  const indicators = [
    "BOB",
    "CAR",
    "CLR",
    "FRK",
    "FRQ",
    "IND",
    "MSA",
    "NSA",
    "SIG",
    "SND",
    "TRN",
  ];

  const [litIndicators, setLitIndicators] = useState({});

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

  // #endregion

  // #region Mutators

  const handleSerialChange = (newSerial) => {
    const cleaned = newSerial
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, 6);

    setSerial(cleaned);

    if (cleaned.length < 6) {
      setSerialProps({
        even: false,
        vowel: false,
      });
      return;
    }

    const lastDigit = cleaned.match(/\d(?!.*\d)/);

    setSerialProps({
      even: lastDigit !== null && parseInt(lastDigit[0], 10) % 2 === 0,

      vowel: (cleaned.match(/[AEIOU]/g) || []).length > 0,
    });
  };

  const updateLitIndicator = (indicator, isLit) => {
    if (!indicators.includes(indicator)) {
      return;
    }

    setLitIndicators((prev) => {
      const next = { ...prev };

      if (isLit === null) {
        delete next[indicator];
      } else {
        next[indicator] = isLit;
      }

      return next;
    });
  };

  const updateBatteryCount = (batteryType, count) => {
    if (!Object.hasOwn(batteries, batteryType)) {
      return;
    }

    setBatteries((prev) => ({
      ...prev,
      [batteryType]: count,
    }));
  };

  const updatePortCount = (portType, count) => {
    if (!Object.hasOwn(ports, portType)) {
      return;
    }

    setPorts((prev) => ({
      ...prev,
      [portType]: count,
    }));
  };

  const resetKeyInfo = () => {
    setSerial("");
    setSerialProps({
      even: false,
      vowel: false,
    });

    setStrikes(0);

    setLitIndicators({});

    setBatteries({
      AA: 0,
      D: 0,
    });

    setPorts({
      "DVI-D": 0,
      Parallel: 0,
      "PS/2": 0,
      "RJ-45": 0,
      Serial: 0,
      "Stereo RCA": 0,
    });
  };

  // #endregion

  return (
    <KeyInfoContext.Provider
      value={{
        // Information
        serial,
        serialProps,
        strikes,
        indicators,
        litIndicators,
        batteries,
        ports,

        // Mutators
        handleSerialChange,
        setStrikes,
        updateLitIndicator,
        updateBatteryCount,
        updatePortCount,
        resetKeyInfo,
      }}
    >
      {children}
    </KeyInfoContext.Provider>
  );
}
