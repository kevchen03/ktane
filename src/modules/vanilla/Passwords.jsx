import { useMemo, useState } from "react";
import { Box, Button, Chip, TextField, Typography } from "@mui/material";

const words = [
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
];

function Passwords() {
  const [letters, setLetters] = useState(["", "", "", "", ""]);

  const matches = useMemo(() => {
    return words.filter((word) => {
      return letters.every((letter, index) => {
        if (!letter) {
          return true;
        }

        return letter.includes(word[index]);
      });
    });
  }, [letters]);

  const hintIndex = useMemo(() => {
    let bestIndex = -1;
    let bestCount = -1;

    letters.forEach((letter, index) => {
      if (letter.length === 6) {
        return;
      }

      const possibleLetters = new Set(matches.map((word) => word[index]));

      if (possibleLetters.size > bestCount) {
        bestCount = possibleLetters.size;
        bestIndex = index;
      }
    });

    return bestIndex;
  }, [letters, matches]);

  const updateLetter = (index, newStr) => {
    const newValue = newStr.toUpperCase();

    if (!/^[A-Z]{0,6}$/.test(newValue)) {
      return;
    }

    setLetters((prev) => {
      const newLetters = [...prev];
      newLetters[index] = newValue;
      return newLetters;
    });
  };

  const reset = () => {
    setLetters(Array(5).fill(""));
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
          flexDirection: "column",
          gap: 1,
          width: "100%",
        }}
      >
        {letters.map((letter, index) => (
          <TextField
            key={index}
            value={letter}
            onChange={(event) => updateLetter(index, event.target.value)}
            size="small"
            placeholder={"Position " + (index + 1)}
            fullWidth
            inputProps={{
              maxLength: 6,
              "aria-label": `Password position ${index + 1}`,
            }}
            sx={{
              width: "100%",
              "& input": {
                textAlign: "center",
                fontFamily: "monospace",
              },
              ...(hintIndex === index && {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderWidth: 2,
                  borderColor: "error.main",
                },
                "& input::placeholder": {
                  color: "error.main",
                  opacity: 1,
                },
              }),
            }}
          />
        ))}
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
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Matches
        </Typography>

        {matches.length > 4 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: "italic" }}
          >
            Enter more letters to narrow down the matches.
          </Typography>
        ) : matches.length > 0 ? (
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
            No match found!
          </Typography>
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

export default Passwords;
