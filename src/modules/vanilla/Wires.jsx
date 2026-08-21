import { useEffect, useState, useCallback } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useKeyInfo } from "@/context/KeyInfoContext";

function Wires() {
  const { serialProps } = useKeyInfo();

  const [numWires, setNumWires] = useState(3);
  const [selectedColors, setSelectedColors] = useState([null, null, null]);
  const [response, setResponse] = useState("");

  const colorOptions = ["r", "b", "w", "k", "y"];

  const colorMap = {
    r: "red",
    b: "blue",
    w: "white",
    k: "black",
    y: "yellow",
  };

  const handleColorClick = (wireIndex, color) => {
    if (!color) {
      return;
    }

    setSelectedColors((prev) => {
      const updated = [...prev];
      updated[wireIndex] = color;
      return updated;
    });
  };

  const deselectWire = (wireIndex) => {
    setSelectedColors((prev) => {
      const updated = [...prev];
      updated[wireIndex] = null;
      return updated;
    });
  };

  const resetSelection = () => {
    setSelectedColors(Array(numWires).fill(null));
    setResponse("");
  };

  const getWireToCut = () => {
    const match = response.match(/wire (\d)/i);
    return match ? Number.parseInt(match[1], 10) - 1 : null;
  };

  const runWireLogic = useCallback(
    (colors) => {
      const c = colors.join("").toLowerCase().trim();

      const reds = (c.match(/r/g) || []).length;
      const blues = (c.match(/b/g) || []).length;
      const yellows = (c.match(/y/g) || []).length;
      const blacks = (c.match(/k/g) || []).length;
      const whites = (c.match(/w/g) || []).length;

      switch (numWires) {
        case 3:
          if (!c.includes("r")) {
            setResponse("Cut wire 2!");
          } else if (c[2] === "w") {
            setResponse("Cut wire 3!");
          } else if (blues > 1) {
            setResponse(`Cut wire ${c.lastIndexOf("b") + 1} (last blue wire)!`);
          } else {
            setResponse("Cut wire 2!");
          }
          break;

        case 4:
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
          break;

        case 5:
          if (c[4] === "b" && !serialProps.even) {
            setResponse("Cut wire 3!");
          } else if (reds === 1 && yellows > 1) {
            setResponse("Cut wire 1!");
          } else if (blacks === 0) {
            setResponse("Cut wire 2!");
          } else {
            setResponse("Cut wire 1!");
          }
          break;

        case 6:
          if (yellows === 0 && !serialProps.even) {
            setResponse("Cut wire 3!");
          } else if (yellows === 1 && whites > 1) {
            setResponse("Cut wire 4!");
          } else if (reds === 0) {
            setResponse("Cut wire 6!");
          } else {
            setResponse("Cut wire 4!");
          }
          break;

        default:
          setResponse("");
      }
    },
    [numWires, serialProps],
  );

  const handleNumWireChange = (event) => {
    const value = Number.parseInt(event.target.value, 10);

    if (Number.isNaN(value) || value < 3 || value > 6) {
      return;
    }

    setNumWires(value);
    setSelectedColors(Array(value).fill(null));
    setResponse("");
  };

  useEffect(() => {
    if (selectedColors.every((color) => color !== null)) {
      runWireLogic(selectedColors);
    } else {
      setResponse("");
    }
  }, [selectedColors, runWireLogic]);

  const wireToCut = getWireToCut();

  return (
    <Box
      sx={{
        p: 2,
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Wires
      </Typography>

      <TextField
        label="Number of wires"
        type="number"
        value={numWires}
        onChange={handleNumWireChange}
        size="small"
        fullWidth
        slotProps={{
          htmlInput: {
            min: 3,
            max: 6,
          },
        }}
        sx={{ mb: 2 }}
      />

      <Box
        sx={{
          width: "100%",
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          overflow: "hidden",
        }}
      >
        {selectedColors.map((selectedColor, wireIndex) => {
          const isSelected = selectedColor !== null;
          const isTarget = wireIndex === wireToCut;

          return (
            <Box
              key={wireIndex}
              sx={{
                width: "100%",
                minHeight: 0,
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1,
                py: 0.5,
                boxSizing: "border-box",
                border: "2px solid",
                borderColor: isTarget ? "success.main" : "divider",
                borderRadius: 1,
                backgroundColor: isSelected
                  ? "action.disabledBackground"
                  : "background.paper",
                opacity: isSelected && !isTarget ? 0.7 : 1,
                transition:
                  "background-color 0.15s, border-color 0.15s, opacity 0.15s",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  width: 50,
                  flexShrink: 0,
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                Wire {wireIndex + 1}
              </Typography>

              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: 0.5,
                }}
              >
                {colorOptions.map((color) => {
                  const isThisColorSelected = selectedColor === color;

                  const textColor =
                    color === "w" || color === "y"
                      ? "common.black"
                      : "common.white";

                  return (
                    <Button
                      key={color}
                      variant="contained"
                      disabled={isSelected}
                      onClick={() => handleColorClick(wireIndex, color)}
                      sx={{
                        minWidth: 0,
                        height: "100%",
                        minHeight: 30,
                        p: 0,
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        backgroundColor: colorMap[color],
                        color: textColor,
                        border: "2px solid",
                        borderColor: isThisColorSelected
                          ? "success.main"
                          : "divider",
                        boxShadow: isThisColorSelected
                          ? "0 0 0 2px rgba(76, 175, 80, 0.35)"
                          : "none",
                        "&:hover": {
                          backgroundColor: colorMap[color],
                        },
                        "&.Mui-disabled": {
                          backgroundColor: colorMap[color],
                          color: textColor,
                          opacity: isThisColorSelected ? 1 : 0.45,
                          borderColor: isThisColorSelected
                            ? "success.main"
                            : "divider",
                        },
                      }}
                    >
                      {color.toUpperCase()}
                    </Button>
                  );
                })}
              </Box>

              {isSelected && (
                <Button
                  size="small"
                  variant="text"
                  onClick={() => deselectWire(wireIndex)}
                  sx={{
                    minWidth: 32,
                    width: 32,
                    p: 0,
                    flexShrink: 0,
                  }}
                  aria-label={`Clear wire ${wireIndex + 1}`}
                >
                  ×
                </Button>
              )}
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          textAlign: "center",
          minHeight: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 1,
          mb: 1,
        }}
      >
        {response && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "success.main",
            }}
          >
            {response}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant="outlined" onClick={resetSelection}>
          🔁 Reset
        </Button>
      </Box>
    </Box>
  );
}

export default Wires;
