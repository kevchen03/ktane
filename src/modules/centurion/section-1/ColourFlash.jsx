import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";

const colorChoices = {
  r: "red",
  y: "yellow",
  g: "green",
  b: "#64b5f6",
  m: "#d81b60",
  w: "white",
};

const colorText = {
  r: "black",
  y: "black",
  g: "black",
  b: "black",
  m: "black",
  w: "black",
};

const ColourFlash = () => {
  const [currChoice, setCurrChoice] = useState({
    key: "word",
    index: 0,
  });

  const [sequence, setSequence] = useState({
    word: Array(8).fill(null),
    color: Array(8).fill(null),
  });

  const [response, setResponse] = useState({
    position: null,
    button: null,
  });

  const determineResponse = useCallback((seq) => {
    const setUnknown = () => {
      setResponse({
        position: -1,
        button: null,
        message: "This pattern is unknown!",
      });
    };

    const lastRed = () => {
      if (seq.word.filter((w) => w === "g").length > 2) {
        let gCount = 0;

        for (let i = 0; i < 8; i++) {
          if (seq.word[i] === "g") {
            gCount++;
          }

          if (seq.color[i] === "g") {
            gCount++;
          }

          if (gCount > 2) {
            setResponse({
              position: i,
              button: true,
            });
            return;
          }
        }
      } else if (
        seq.color.filter((c) => c === "b").length === 1 &&
        seq.word.filter((w) => w === "m").length
      ) {
        setResponse({
          position: seq.word.indexOf("m"),
          button: false,
        });
      } else {
        for (let i = 7; i >= 0; i--) {
          if (seq.word[i] === "w" || seq.color[i] === "w") {
            setResponse({
              position: i,
              button: true,
            });
            return;
          }
        }
      }

      setUnknown();
    };

    const lastYellow = () => {
      const getCond1 = () => {
        for (let i = 0; i < 8; i++) {
          if (seq.word[i] === "b" && seq.color[i] === "g") {
            return true;
          }
        }

        return false;
      };

      const getCond2 = () => {
        for (let i = 0; i < 8; i++) {
          if (
            seq.word[i] === "w" &&
            (seq.color[i] === "w" || seq.color[i] === "r")
          ) {
            return true;
          }
        }

        return false;
      };

      if (getCond1()) {
        setResponse({
          position: seq.color.indexOf("g"),
          button: true,
        });
      } else if (getCond2()) {
        let diffCount = 0;

        for (let i = 0; i < 8; i++) {
          if (seq.word[i] !== seq.color[i]) {
            diffCount++;
          }

          if (diffCount === 2) {
            setResponse({
              position: i,
              button: true,
            });
            return;
          }
        }
      } else {
        let mCount = 0;

        for (let i = 0; i < 8; i++) {
          if (seq.word[i] === "m" || seq.color[i] === "m") {
            mCount++;
          }
        }

        if (mCount) {
          setResponse({
            position: mCount - 1,
            button: false,
          });
          return;
        }
      }

      setUnknown();
    };

    const lastGreen = () => {
      const getCond1 = () => {
        for (let i = 0; i < 7; i++) {
          if (
            seq.word[i] === seq.word[i + 1] &&
            seq.color[i] !== seq.color[i + 1]
          ) {
            return true;
          }
        }

        return false;
      };

      if (getCond1()) {
        setResponse({
          position: 4,
          button: false,
        });
      } else if (seq.word.filter((w) => w === "m").length > 2) {
        for (let i = 0; i < 8; i++) {
          if (seq.word[i] === "y" || seq.color[i] === "y") {
            setResponse({
              position: i,
              button: false,
            });
            return;
          }
        }
      } else {
        for (let i = 0; i < 8; i++) {
          if (seq.word[i] === seq.color[i]) {
            setResponse({
              position: i,
              button: true,
              message: "Press YES any time the word and color match!",
            });
            return;
          }
        }
      }

      setUnknown();
    };

    const lastBlue = () => {
      const getCond1 = () => {
        let first = -1;
        let count = 0;

        for (let i = 0; i < 8; i++) {
          if (seq.word[i] !== seq.color[i]) {
            if (first === -1) {
              first = i;
            }

            if (++count > 2) {
              setResponse({
                position: first,
                button: true,
              });
              return true;
            }
          }
        }

        return false;
      };

      const getCond2 = () => {
        for (let i = 0; i < 8; i++) {
          if (
            (seq.word[i] === "r" && seq.color[i] === "y") ||
            (seq.word[i] === "y" && seq.color[i] === "w")
          ) {
            for (let j = 0; j < 8; j++) {
              if (seq.word[j] === "w" && seq.color[j] === "r") {
                setResponse({
                  position: j,
                  button: false,
                });
                return true;
              }
            }

            break;
          }
        }

        return false;
      };

      if (getCond1() || getCond2()) {
        return;
      }

      const greenIndex = Math.max(
        seq.word.lastIndexOf("g"),
        seq.color.lastIndexOf("g"),
      );

      if (greenIndex === -1) {
        setUnknown();
      } else {
        setResponse({
          position: greenIndex,
          button: true,
        });
      }
    };

    const lastMagenta = () => {
      const getCond1 = () => {
        for (let i = 0; i < 7; i++) {
          if (
            seq.word[i] !== seq.word[i + 1] &&
            seq.color[i] === seq.color[i + 1]
          ) {
            setResponse({
              position: 2,
              button: true,
            });
            return true;
          }
        }

        return false;
      };

      const getCond2 = () => {
        if (
          seq.word.filter((w) => w === "y").length >
          seq.color.filter((c) => c === "b").length
        ) {
          setResponse({
            position: seq.word.lastIndexOf("y"),
            button: false,
          });
          return true;
        }

        return false;
      };

      if (getCond1() || getCond2()) {
        return;
      }

      for (let i = 0; i < 8; i++) {
        if (seq.word[6] === seq.color[i]) {
          setResponse({
            position: i,
            button: false,
          });
          return;
        }
      }

      setUnknown();
    };

    const lastWhite = () => {
      const getCond1 = () => {
        if (seq.color[2] === seq.word[3] || seq.color[2] === seq.word[4]) {
          for (let i = 0; i < 8; i++) {
            if (seq.word[i] === "b" || seq.color[i] === "b") {
              setResponse({
                position: i,
                button: false,
              });
              return true;
            }
          }
        }

        return false;
      };

      const getCond2 = () => {
        for (let i = 0; i < 8; i++) {
          if (seq.word[i] === "y" && seq.color[i] === "r") {
            setResponse({
              position: seq.color.lastIndexOf("b"),
              button: true,
            });
            return true;
          }
        }

        return false;
      };

      if (getCond1() || getCond2()) {
        return;
      }

      setResponse({
        position: 0,
        button: false,
        message: "Press NO on ANY position!",
      });
    };

    switch (seq.color[7]) {
      case "r":
        lastRed();
        break;
      case "y":
        lastYellow();
        break;
      case "g":
        lastGreen();
        break;
      case "b":
        lastBlue();
        break;
      case "m":
        lastMagenta();
        break;
      case "w":
        lastWhite();
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    if (
      sequence.word.every((w) => w !== null) &&
      sequence.color.every((c) => c !== null)
    ) {
      determineResponse(sequence);
    } else {
      setResponse({
        position: null,
        button: null,
      });
    }
  }, [sequence, determineResponse]);

  const updateSequence = (newVal) => {
    const newSequence = {
      word: [...sequence.word],
      color: [...sequence.color],
    };

    newSequence[currChoice.key][currChoice.index] = newVal;
    setSequence(newSequence);

    if (newVal === null) {
      return;
    }

    if (newSequence.word.every((w) => w) && newSequence.color.every((c) => c)) {
      setCurrChoice({
        ...currChoice,
        index: null,
      });
      return;
    }

    const newChoice = {
      ...currChoice,
    };

    for (let i = currChoice.index + 1; i < 8; i++) {
      if (newSequence[currChoice.key][i] === null) {
        newChoice.index = i;
        setCurrChoice(newChoice);
        return;
      }
    }

    const nextKey = newChoice.key === "word" ? "color" : "word";

    for (let i = 0; i < 8; i++) {
      if (newSequence[nextKey][i] === null) {
        newChoice.key = nextKey;
        newChoice.index = i;
        setCurrChoice(newChoice);
        return;
      }
    }

    for (let i = 0; i < newChoice.index; i++) {
      if (newSequence[currChoice.key][i] === null) {
        newChoice.index = i;
        setCurrChoice(newChoice);
        return;
      }
    }
  };

  const reset = () => {
    setSequence({
      word: Array(8).fill(null),
      color: Array(8).fill(null),
    });

    setCurrChoice({
      key: "word",
      index: 0,
    });
  };

  const getCellSx = (value, selected, responseCell) => ({
    flex: 1,
    minWidth: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: 0.5,
    border: 2,
    borderColor: responseCell
      ? "primary.main"
      : selected
        ? "text.primary"
        : "divider",
    borderRadius: 1,
    backgroundColor: value ? colorChoices[value] : "action.disabledBackground",
    color: value ? colorText[value] : "text.secondary",
    fontWeight: 700,
    cursor: "pointer",
    userSelect: "none",
    transition: "border 0.15s",
    boxSizing: "border-box",
  });

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
          display: "flex",
          justifyContent: "center",
          mb: 1,
        }}
      >
        <ButtonGroup size="small">
          {Object.entries(colorChoices).map(([color, background]) => (
            <Button
              key={color}
              onClick={() => updateSequence(color)}
              sx={{
                minWidth: 40,
                backgroundColor: background,
                color: colorText[color],
                borderColor: "divider",
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: background,
                  filter: "brightness(0.95)",
                },
              }}
            >
              {color.toUpperCase()}
            </Button>
          ))}

          <Button
            onClick={() => updateSequence(null)}
            sx={{
              minWidth: 40,
              backgroundColor: "#ddd",
              color: "error.main",
              borderColor: "divider",
              fontWeight: 700,
              "&:hover": {
                backgroundColor: "#ccc",
              },
            }}
          >
            X
          </Button>
        </ButtonGroup>
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            minHeight: 32,
          }}
        >
          <Typography
            sx={{
              flex: 1,
              textAlign: "center",
              fontWeight: 700,
              p: 0.5,
            }}
          >
            WORD
          </Typography>

          <Typography
            sx={{
              flex: 1,
              textAlign: "center",
              fontWeight: 700,
              p: 0.5,
              borderLeft: 1,
              borderRight: 1,
              borderColor: "divider",
            }}
          >
            DISPLAY
          </Typography>

          <Typography
            sx={{
              flex: 1,
              textAlign: "center",
              fontWeight: 700,
              p: 0.5,
            }}
          >
            COLOR
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {Array.from({ length: 8 }, (_, i) => {
            const word = sequence.word[i];
            const color = sequence.color[i];

            const wordSelected =
              currChoice.key === "word" && currChoice.index === i;

            const colorSelected =
              currChoice.key === "color" && currChoice.index === i;

            const isResponse = response.position === i;

            return (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  minHeight: 0,
                  display: "flex",
                  gap: 0.5,
                  py: 0.25,
                }}
              >
                <Box
                  onClick={() =>
                    setCurrChoice({
                      key: "word",
                      index: i,
                    })
                  }
                  sx={getCellSx(word, wordSelected, isResponse)}
                >
                  {word ? word.toUpperCase() : ""}
                </Box>

                <Box
                  onClick={() => {
                    if (word && color) {
                      setCurrChoice({
                        key: "word",
                        index: i,
                      });
                    }
                  }}
                  sx={{
                    ...getCellSx(color, false, isResponse),
                    cursor: word && color ? "pointer" : "default",
                  }}
                >
                  {word ? word.toUpperCase() : ""}
                </Box>

                <Box
                  onClick={() =>
                    setCurrChoice({
                      key: "color",
                      index: i,
                    })
                  }
                  sx={getCellSx(color, colorSelected, isResponse)}
                >
                  {color ? color.toUpperCase() : ""}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box
        sx={{
          textAlign: "center",
          mt: 1,
          minHeight: 24,
        }}
      >
        <Typography
          variant="body2"
          color={
            response.position === null || response.position === -1
              ? "error.main"
              : "success.main"
          }
        >
          {response.position === null
            ? "You must select all words and colors!"
            : response.message
              ? response.message
              : `Press ${response.button ? "YES" : "NO"} on entry ${
                  response.position + 1
                }!`}
        </Typography>
      </Box>

      <Button
        variant="outlined"
        onClick={reset}
        sx={{
          alignSelf: "center",
          mt: 1,
        }}
      >
        🔁 Reset
      </Button>
    </Box>
  );
};

export default ColourFlash;
