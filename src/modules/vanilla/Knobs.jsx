import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

function Knobs() {
  const [pattern, setPattern] = useState([
    [false, false, false],
    [false, false, false],
  ]);
  const [response, setResponse] = useState("Left");

  const calculateResponse = (newPattern) => {
    const topRow =
      Number(newPattern[0][0] * 4) +
      Number(newPattern[0][1] * 2) +
      Number(newPattern[0][2]);

    const bottomRow =
      Number(newPattern[1][0] * 4) +
      Number(newPattern[1][1] * 2) +
      Number(newPattern[1][2]);

    switch (8 * topRow + bottomRow) {
      case 15:
        setResponse("Up");
        break;
      case 43:
        setResponse("Up");
        break;
      case 31:
        setResponse("Down");
        break;
      case 42:
        setResponse("Down");
        break;
      case 4:
        setResponse("Left");
        break;
      case 0:
        setResponse("Left");
        break;
      case 47:
        setResponse("Right");
        break;
      default:
        setResponse("Unknown pattern!");
        break;
    }
  };

  const updatePattern = (row, col) => {
    const newPattern = pattern.map((newRow) => {
      return [...newRow];
    });

    newPattern[row][col] = !newPattern[row][col];

    setPattern(newPattern);
    calculateResponse(newPattern);
  };

  const resetPattern = () => {
    const newPattern = [Array(3).fill(false), Array(3).fill(false)];

    setPattern(newPattern);
    calculateResponse(newPattern);
  };

  return (
    <Box
      sx={{
        p: 2,
        height: "100%",
        width: "100%",
        minWidth: 0,
        minHeight: 0,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        (Needy) Knobs
      </Typography>

      <Typography variant="body1" sx={{ mb: 1 }}>
        Left Knobs
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 1.25,
          mb: 2,
        }}
      >
        {pattern.map((row, rowIndex) => {
          return row.map((button, colIndex) => {
            return (
              <Button
                key={`${rowIndex}${colIndex}`}
                variant="contained"
                onClick={() => updatePattern(rowIndex, colIndex)}
                sx={{
                  minWidth: 0,
                  aspectRatio: "2 / 1",
                  backgroundColor: button ? "success.main" : "grey.500",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: button ? "success.dark" : "grey.600",
                  },
                }}
              >
                {button ? "ON" : "OFF"}
              </Button>
            );
          });
        })}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          Direction:
        </Typography>

        <Typography
          variant="subtitle1"
          color={
            response === "Unknown pattern!" ? "error.main" : "primary.main"
          }
          fontWeight={700}
        >
          {response}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "auto",
        }}
      >
        <Button variant="outlined" onClick={resetPattern}>
          🔁 Reset
        </Button>
      </Box>
    </Box>
  );
}

export default Knobs;
