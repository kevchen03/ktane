import { useMemo, useState } from "react";
import { Box, Button, Chip, TextField, Typography } from "@mui/material";

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

const morse = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
};

const validMorse = new Set(Object.values(morse));

const wordMorse = Object.entries(validWords).map(([word, frequency]) => ({
  word,
  frequency: frequency.substring(2),
  code: [...word].map((letter) => morse[letter]),
}));

const matchesPattern = (code, pattern) => {
  const match = (codeIndex, patternIndex) => {
    if (patternIndex === pattern.length) {
      return true;
    }

    if (codeIndex > code.length) {
      return false;
    }

    if (pattern[patternIndex] === "*") {
      for (let index = codeIndex; index <= code.length; index++) {
        if (match(index, patternIndex + 1)) {
          return true;
        }
      }

      return false;
    }

    if (codeIndex >= code.length) {
      return false;
    }

    if (
      pattern[patternIndex] !== null &&
      pattern[patternIndex] !== code[codeIndex]
    ) {
      return false;
    }

    return match(codeIndex + 1, patternIndex + 1);
  };

  for (let start = 0; start <= code.length; start++) {
    if (match(start, 0)) {
      return true;
    }
  }

  return false;
};

function MorseCode() {
  const [input, setInput] = useState("");

  const validation = useMemo(() => {
    if (input === "") {
      return {
        valid: true,
        pattern: [],
      };
    }

    if (!/^[.\- *]+$/.test(input)) {
      return {
        valid: false,
        pattern: [],
      };
    }

    const spaces = (input.match(/ /g) || []).length;

    if (spaces > 5) {
      return {
        valid: false,
        pattern: [],
      };
    }

    const parts = input.split(/( +)/);
    const pattern = [];

    for (const part of parts) {
      if (part === "") {
        continue;
      }

      if (part[0] === " ") {
        for (let index = 1; index < part.length; index++) {
          pattern.push(null);
        }
      } else if (part === "*") {
        pattern.push("*");
      } else {
        if (!validMorse.has(part)) {
          return {
            valid: false,
            pattern: [],
          };
        }

        pattern.push(part);
      }
    }

    return {
      valid: true,
      pattern,
    };
  }, [input]);

  const matches = useMemo(() => {
    if (!validation.valid || input === "") {
      return [];
    }

    return wordMorse
      .filter(({ code }) => matchesPattern(code, validation.pattern))
      .map(({ word, frequency }) => `${frequency} (${word})`);
  }, [validation, input]);

  const handleUpdate = (event) => {
    setInput(event.target.value);
  };

  const reset = () => {
    setInput("");
  };

  return (
    <Box
      sx={{
        p: 2,
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <TextField
          value={input}
          onChange={handleUpdate}
          size="small"
          fullWidth
          inputProps={{
            "aria-label": "Morse code",
          }}
          sx={{
            width: "100%",
            "& input": {
              textAlign: "center",
              fontFamily: "monospace",
            },
          }}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          flex: 1,
          mt: 2,
          textAlign: "center",
          overflow: "auto",
        }}
      >
        {input === "" ? (
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              textAlign: "left",
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Instructions
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              Enter Morse code using <strong>.</strong> and <strong>-</strong>.
              Separate Morse characters with a single space.
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              Multiple spaces represent unknown characters. For example:
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mb: 1,
                fontFamily: "monospace",
                whiteSpace: "pre",
              }}
            >
              {"... - --.   → STG\n... -  --.  → ST_G\n... -   --. → ST__G"}
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              Use <strong>*</strong> for any number of unknown characters,
              including zero. For example:
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontFamily: "monospace",
                whiteSpace: "pre",
              }}
            >
              {"... - * --. → ST*G"}
            </Typography>
          </Box>
        ) : (
          <>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Matches
            </Typography>

            {matches.length > 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  justifyContent: "center",
                }}
              >
                {matches.map((word) => (
                  <Chip
                    key={word}
                    label={word}
                    sx={{
                      fontSize: "0.875rem",
                    }}
                  />
                ))}
              </Box>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontStyle: "italic" }}
              >
                {validation.valid ? "No match found!" : "Invalid input!"}
              </Typography>
            )}
          </>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Button variant="outlined" onClick={reset}>
          🔁 Reset
        </Button>
      </Box>
    </Box>
  );
}

export default MorseCode;
