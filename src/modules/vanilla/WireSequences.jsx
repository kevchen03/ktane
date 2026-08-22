import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function WireSequences() {
  const rules = {
    red: ["C", "B", "A", "AC", "B", "AC", "ABC", "AB", "B"],
    blue: ["B", "AC", "B", "A", "B", "BC", "C", "AC", "A"],
    black: ["ABC", "AC", "B", "AC", "B", "BC", "AB", "C", "C"],
  };

  const createWire = () => ({
    letter: "",
    color: "",
  });

  const createPage = () => [createWire(), createWire(), createWire()];

  const [pages, setPages] = useState([
    createPage(),
    createPage(),
    createPage(),
    createPage(),
  ]);

  const [currentPage, setCurrentPage] = useState(0);

  const updateWire = (wireIndex, property, value) => {
    setPages((currentPages) =>
      currentPages.map((page, pageIndex) => {
        if (pageIndex !== currentPage) {
          return page;
        }

        return page.map((wire, index) => {
          if (index !== wireIndex) {
            return wire;
          }

          return {
            ...wire,
            [property]: wire[property] === value ? "" : value,
          };
        });
      }),
    );
  };

  const getAction = (pageIndex, wireIndex) => {
    const wire = pages[pageIndex][wireIndex];

    if (wire.letter === "" || wire.color === "") {
      return "N/A";
    }

    let occurrence = 0;

    for (let currentPage = 0; currentPage <= pageIndex; currentPage++) {
      for (let currentWire = 0; currentWire < 3; currentWire++) {
        if (currentPage === pageIndex && currentWire === wireIndex) {
          break;
        }

        if (pages[currentPage][currentWire].color === wire.color) {
          occurrence++;
        }
      }

      if (currentPage === pageIndex) {
        break;
      }
    }

    const rule = rules[wire.color][occurrence];

    if (!rule) {
      return "N/A";
    }

    return rule.includes(wire.letter) ? "CUT" : "DON'T CUT";
  };

  const currentRows = useMemo(() => [0, 1, 2], []);

  const resetSequence = () => {
    setPages([createPage(), createPage(), createPage(), createPage()]);
    setCurrentPage(0);
  };

  const getRowBorderColor = (action) => {
    if (action === "CUT") {
      return "success.main";
    }

    if (action === "DON'T CUT") {
      return "error.main";
    }

    return "divider";
  };

  const getColorButtonSx = (color, selectedColor) => {
    const isSelected = selectedColor === color;

    const colors = {
      red: {
        background: "#f44336",
        selected: "#c62828",
        text: "#ffffff",
        border: "#d32f2f",
      },
      blue: {
        background: "#2196f3",
        selected: "#1565c0",
        text: "#ffffff",
        border: "#1976d2",
      },
      black: {
        background: "#212121",
        selected: "#000000",
        text: "#ffffff",
        border: "#424242",
      },
    };

    const colorInfo = colors[color];

    return {
      minWidth: 0,
      flex: 1,
      color: colorInfo.text,
      backgroundColor: isSelected ? colorInfo.selected : colorInfo.background,
      borderColor: colorInfo.border,
      opacity: isSelected ? 1 : 0.65,
      fontWeight: isSelected ? "bold" : "normal",
      "&:hover": {
        backgroundColor: colorInfo.selected,
        opacity: 1,
      },
    };
  };

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
      <Box
        sx={{
          width: "100%",
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {currentRows.map((wireIndex) => {
            const wire = pages[currentPage][wireIndex];
            const action = getAction(currentPage, wireIndex);

            return (
              <Box
                key={wireIndex}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 1,
                  width: "100%",
                  boxSizing: "border-box",
                  border: 2,
                  borderColor: getRowBorderColor(action),
                  borderRadius: 1,
                }}
              >
                <Typography
                  sx={{
                    width: 20,
                    flexShrink: 0,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {wireIndex + 1}
                </Typography>

                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                  }}
                >
                  <ButtonGroup size="small" fullWidth>
                    <Button
                      variant={wire.color === "red" ? "contained" : "outlined"}
                      onClick={() => updateWire(wireIndex, "color", "red")}
                      sx={getColorButtonSx("red", wire.color)}
                    >
                      R
                    </Button>

                    <Button
                      variant={wire.color === "blue" ? "contained" : "outlined"}
                      onClick={() => updateWire(wireIndex, "color", "blue")}
                      sx={getColorButtonSx("blue", wire.color)}
                    >
                      B
                    </Button>

                    <Button
                      variant={
                        wire.color === "black" ? "contained" : "outlined"
                      }
                      onClick={() => updateWire(wireIndex, "color", "black")}
                      sx={getColorButtonSx("black", wire.color)}
                    >
                      K
                    </Button>
                  </ButtonGroup>

                  <ButtonGroup size="small" fullWidth>
                    <Button
                      variant={wire.letter === "A" ? "contained" : "outlined"}
                      onClick={() => updateWire(wireIndex, "letter", "A")}
                    >
                      A
                    </Button>

                    <Button
                      variant={wire.letter === "B" ? "contained" : "outlined"}
                      onClick={() => updateWire(wireIndex, "letter", "B")}
                    >
                      B
                    </Button>

                    <Button
                      variant={wire.letter === "C" ? "contained" : "outlined"}
                      onClick={() => updateWire(wireIndex, "letter", "C")}
                    >
                      C
                    </Button>
                  </ButtonGroup>
                </Box>

                <Box
                  sx={{
                    width: 72,
                    flexShrink: 0,
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "0.75rem",
                    py: 0.75,
                    px: 0.5,
                    borderRadius: 1,
                    backgroundColor:
                      action === "CUT"
                        ? "success.main"
                        : action === "DON'T CUT"
                          ? "error.main"
                          : "action.disabledBackground",
                    color: action === "N/A" ? "text.secondary" : "common.white",
                  }}
                >
                  {action}
                </Box>
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <IconButton
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 0))}
            disabled={currentPage === 0}
            size="small"
            sx={{
              width: 36,
              height: 36,
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              "&:hover": {
                borderColor: "primary.main",
                backgroundColor: "action.hover",
              },
            }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>

          <Box
            sx={{
              minWidth: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              backgroundColor: "action.hover",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                lineHeight: 1,
              }}
            >
              {currentPage + 1}
            </Typography>
          </Box>

          <IconButton
            onClick={() => setCurrentPage((page) => Math.min(page + 1, 3))}
            disabled={currentPage === 3}
            size="small"
            sx={{
              width: 36,
              height: 36,
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              "&:hover": {
                borderColor: "primary.main",
                backgroundColor: "action.hover",
              },
            }}
          >
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Button
        variant="outlined"
        onClick={resetSequence}
        sx={{
          alignSelf: "center",
          mt: 2,
        }}
      >
        🔁 Reset
      </Button>
    </Box>
  );
}

export default WireSequences;
