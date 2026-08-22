import { useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Chip,
  ClickAwayListener,
  FormControl,
  InputLabel,
  MenuItem,
  MenuList,
  OutlinedInput,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const currDisplayRules = {
  "Top Left": ["UR"],
  "Middle Left": ["LED", "NOTHING", "THEY ARE", "YES"],
  "Bottom Left": ["", "LEED", "REED", "THEY'RE"],
  "Top Right": ["C", "FIRST", "OKAY"],
  "Middle Right": ["BLANK", "READ", "RED", "THEIR", "YOU", "YOUR", "YOU'RE"],
  "Bottom Right": [
    "CEE",
    "DISPLAY",
    "HOLD ON",
    "LEAD",
    "NO",
    "SAYS",
    "SEE",
    "THERE",
    "YOU ARE",
  ],
};

const clickRules = {
  BLANK: ["WAIT", "RIGHT", "OKAY", "MIDDLE", "BLANK"],
  DONE: [
    "SURE",
    "UH HUH",
    "NEXT",
    "WHAT?",
    "YOUR",
    "UR",
    "YOU'RE",
    "HOLD",
    "LIKE",
    "YOU",
    "U",
    "YOU ARE",
    "UH UH",
    "DONE",
  ],
  FIRST: [
    "LEFT",
    "OKAY",
    "YES",
    "MIDDLE",
    "NO",
    "RIGHT",
    "NOTHING",
    "UHHH",
    "WAIT",
    "READY",
    "BLANK",
    "WHAT",
    "PRESS",
    "FIRST",
  ],
  HOLD: [
    "YOU ARE",
    "U",
    "DONE",
    "UH UH",
    "YOU",
    "UR",
    "SURE",
    "WHAT?",
    "YOU'RE",
    "NEXT",
    "HOLD",
  ],
  LEFT: ["RIGHT", "LEFT"],
  LIKE: [
    "YOU'RE",
    "NEXT",
    "U",
    "UR",
    "HOLD",
    "DONE",
    "UH UH",
    "WHAT?",
    "UH HUH",
    "YOU",
    "LIKE",
  ],
  MIDDLE: [
    "BLANK",
    "READY",
    "OKAY",
    "WHAT",
    "NOTHING",
    "PRESS",
    "NO",
    "WAIT",
    "LEFT",
    "MIDDLE",
  ],
  NEXT: ["WHAT?", "UH HUH", "UH UH", "YOUR", "HOLD", "SURE", "NEXT"],
  NO: [
    "BLANK",
    "UHHH",
    "WAIT",
    "FIRST",
    "WHAT",
    "READY",
    "RIGHT",
    "YES",
    "NOTHING",
    "LEFT",
    "PRESS",
    "OKAY",
    "NO",
  ],
  NOTHING: [
    "UHHH",
    "RIGHT",
    "OKAY",
    "MIDDLE",
    "YES",
    "BLANK",
    "NO",
    "PRESS",
    "LEFT",
    "WHAT",
    "WAIT",
    "FIRST",
    "NOTHING",
  ],
  OKAY: ["MIDDLE", "NO", "FIRST", "YES", "UHHH", "NOTHING", "WAIT", "OKAY"],
  PRESS: ["RIGHT", "MIDDLE", "YES", "READY", "PRESS"],
  READY: [
    "YES",
    "OKAY",
    "WHAT",
    "MIDDLE",
    "LEFT",
    "PRESS",
    "RIGHT",
    "BLANK",
    "READY",
  ],
  RIGHT: ["YES", "NOTHING", "READY", "PRESS", "NO", "WAIT", "WHAT", "RIGHT"],
  SURE: [
    "YOU ARE",
    "DONE",
    "LIKE",
    "YOU'RE",
    "YOU",
    "HOLD",
    "UH HUH",
    "UR",
    "SURE",
  ],
  U: ["UH HUH", "SURE", "NEXT", "WHAT?", "YOU'RE", "UR", "UH UH", "DONE", "U"],
  "UH HUH": ["UH HUH"],
  "UH UH": ["UR", "U", "YOU ARE", "YOU'RE", "NEXT", "UH UH"],
  UHHH: [
    "READY",
    "NOTHING",
    "LEFT",
    "WHAT",
    "OKAY",
    "YES",
    "RIGHT",
    "NO",
    "PRESS",
    "BLANK",
    "UHHH",
  ],
  UR: ["DONE", "U", "UR"],
  WAIT: [
    "UHHH",
    "NO",
    "BLANK",
    "OKAY",
    "YES",
    "LEFT",
    "FIRST",
    "PRESS",
    "WHAT",
    "WAIT",
  ],
  WHAT: ["UHHH", "WHAT"],
  "WHAT?": [
    "YOU",
    "HOLD",
    "YOU'RE",
    "YOUR",
    "U",
    "DONE",
    "UH UH",
    "LIKE",
    "YOU ARE",
    "UH HUH",
    "UR",
    "NEXT",
    "WHAT?",
  ],
  YES: [
    "OKAY",
    "RIGHT",
    "UHHH",
    "MIDDLE",
    "FIRST",
    "WHAT",
    "PRESS",
    "READY",
    "NOTHING",
    "YES",
  ],
  YOU: [
    "SURE",
    "YOU ARE",
    "YOUR",
    "YOU'RE",
    "NEXT",
    "UH HUH",
    "UR",
    "HOLD",
    "WHAT?",
    "YOU",
  ],
  "YOU ARE": [
    "YOUR",
    "NEXT",
    "LIKE",
    "UH HUH",
    "WHAT?",
    "DONE",
    "UH UH",
    "HOLD",
    "YOU",
    "U",
    "YOU'RE",
    "SURE",
    "UR",
    "YOU ARE",
  ],
  "YOU'RE": ["YOU", "YOU'RE"],
  YOUR: ["UH UH", "YOU ARE", "UH HUH", "YOUR"],
};

const displayOptions = [
  ...new Set(Object.values(currDisplayRules).flat()),
].sort((a, b) => a.localeCompare(b));

const buttonOptions = Object.keys(clickRules);

const createInitialRounds = () =>
  Array.from({ length: 3 }, () => ({
    currDisplay: null,
    currWord: null,
  }));

function WhosOnFirst() {
  const moduleRef = useRef(null);
  const displayAnchorRef = useRef(null);
  const wordAnchorRef = useRef(null);

  const [rounds, setRounds] = useState(createInitialRounds);
  const [currentRound, setCurrentRound] = useState(0);
  const [openMenu, setOpenMenu] = useState(null);
  const [menuMaxHeight, setMenuMaxHeight] = useState(0);

  const currentRoundData = rounds[currentRound];

  const updateMenuPosition = (anchorRef) => {
    if (!moduleRef.current || !anchorRef.current) {
      return;
    }

    const moduleRect = moduleRef.current.getBoundingClientRect();
    const anchorRect = anchorRef.current.getBoundingClientRect();

    const padding = 4;
    const spaceAbove = anchorRect.top - moduleRect.top - padding;
    const spaceBelow = moduleRect.bottom - anchorRect.bottom - padding;

    const maxHeight = Math.max(Math.max(spaceAbove, spaceBelow), 48);

    setMenuMaxHeight(maxHeight);
  };

  const handleOpenMenu = (menu, anchorRef) => {
    updateMenuPosition(anchorRef);
    setOpenMenu(menu);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  const handleDisplayChange = (value) => {
    setRounds((prev) =>
      prev.map((round, index) =>
        index === currentRound
          ? {
              currDisplay: value,
              currWord: null,
            }
          : round,
      ),
    );

    handleCloseMenu();
  };

  const handleWordChange = (value) => {
    setRounds((prev) =>
      prev.map((round, index) =>
        index === currentRound
          ? {
              ...round,
              currWord: value,
            }
          : round,
      ),
    );

    handleCloseMenu();
  };

  const location = useMemo(() => {
    if (currentRoundData.currDisplay === null) {
      return "";
    }

    for (const [key, values] of Object.entries(currDisplayRules)) {
      if (values.includes(currentRoundData.currDisplay)) {
        return key;
      }
    }

    return "ERROR";
  }, [currentRoundData.currDisplay]);

  const pressOrder = useMemo(() => {
    if (currentRoundData.currWord === null) {
      return [];
    }

    return clickRules[currentRoundData.currWord] || [];
  }, [currentRoundData.currWord]);

  const renderDropdown = (
    menu,
    anchorRef,
    options,
    value,
    onChange,
    placeholder,
  ) => {
    const isOpen = openMenu === menu;

    if (!isOpen) {
      return null;
    }

    return (
      <Popper
        open={isOpen}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        disablePortal
        modifiers={[
          {
            name: "flip",
            enabled: true,
            options: {
              altBoundary: true,
              boundary: moduleRef.current,
              padding: 4,
            },
          },
          {
            name: "preventOverflow",
            enabled: true,
            options: {
              altAxis: true,
              boundary: moduleRef.current,
              padding: 4,
            },
          },
        ]}
        sx={{
          zIndex: 1300,
          width: anchorRef.current
            ? anchorRef.current.getBoundingClientRect().width
            : undefined,
        }}
      >
        <ClickAwayListener onClickAway={handleCloseMenu}>
          <Box
            sx={{
              maxHeight: menuMaxHeight,
              overflowY: "auto",
              bgcolor: "background.paper",
              borderRadius: 1,
              boxShadow: 4,
              border: 1,
              borderColor: "divider",
            }}
          >
            <MenuList
              autoFocusItem
              disablePadding
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  handleCloseMenu();
                }
              }}
            >
              <MenuItem
                selected={value === null}
                onClick={() => onChange(null)}
                sx={{
                  minHeight: 48,
                  height: 48,
                  boxSizing: "border-box",
                }}
              >
                <em>{placeholder}</em>
              </MenuItem>

              {options.map((option, index) => (
                <MenuItem
                  key={`${option}-${index}`}
                  selected={option === value}
                  onClick={() => onChange(option)}
                  sx={{
                    minHeight: 48,
                    height: 48,
                    boxSizing: "border-box",
                  }}
                >
                  {option === "" ? "\u00A0" : option}
                </MenuItem>
              ))}
            </MenuList>
          </Box>
        </ClickAwayListener>
      </Popper>
    );
  };

  const goToPreviousRound = () => {
    setCurrentRound((prev) => Math.max(0, prev - 1));
    handleCloseMenu();
  };

  const goToNextRound = () => {
    setCurrentRound((prev) => Math.min(2, prev + 1));
    handleCloseMenu();
  };

  return (
    <Box
      ref={moduleRef}
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
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <FormControl
          ref={displayAnchorRef}
          size="small"
          fullWidth
          variant="outlined"
        >
          <InputLabel shrink>Display</InputLabel>

          <Box
            role="combobox"
            tabIndex={0}
            aria-expanded={openMenu === "display"}
            aria-haspopup="listbox"
            onClick={() =>
              openMenu === "display"
                ? handleCloseMenu()
                : handleOpenMenu("display", displayAnchorRef)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();

                if (openMenu === "display") {
                  handleCloseMenu();
                } else {
                  handleOpenMenu("display", displayAnchorRef);
                }
              }

              if (event.key === "Escape") {
                handleCloseMenu();
              }
            }}
            sx={{
              position: "relative",
              cursor: "pointer",
            }}
          >
            <OutlinedInput
              fullWidth
              label="Display"
              notched
              value={
                currentRoundData.currDisplay === null
                  ? "Nothing Selected"
                  : currentRoundData.currDisplay
              }
              readOnly
              endAdornment={<ArrowDropDownIcon />}
              sx={{
                pointerEvents: "none",
              }}
              inputProps={{
                readOnly: true,
              }}
            />
          </Box>
        </FormControl>

        {renderDropdown(
          "display",
          displayAnchorRef,
          displayOptions,
          currentRoundData.currDisplay,
          handleDisplayChange,
          "Nothing Selected",
        )}

        <TextField
          label="Location"
          value={location}
          size="small"
          fullWidth
          disabled
        />

        <FormControl
          ref={wordAnchorRef}
          size="small"
          fullWidth
          variant="outlined"
        >
          <InputLabel shrink>Word</InputLabel>

          <Box
            role="combobox"
            tabIndex={0}
            aria-expanded={openMenu === "word"}
            aria-haspopup="listbox"
            onClick={() =>
              openMenu === "word"
                ? handleCloseMenu()
                : handleOpenMenu("word", wordAnchorRef)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();

                if (openMenu === "word") {
                  handleCloseMenu();
                } else {
                  handleOpenMenu("word", wordAnchorRef);
                }
              }

              if (event.key === "Escape") {
                handleCloseMenu();
              }
            }}
            sx={{
              position: "relative",
              cursor: "pointer",
            }}
          >
            <OutlinedInput
              fullWidth
              label="Word"
              notched
              value={
                currentRoundData.currWord === null
                  ? "Nothing Selected"
                  : currentRoundData.currWord
              }
              readOnly
              endAdornment={<ArrowDropDownIcon />}
              sx={{
                pointerEvents: "none",
              }}
              inputProps={{
                readOnly: true,
              }}
            />
          </Box>
        </FormControl>

        {renderDropdown(
          "word",
          wordAnchorRef,
          buttonOptions,
          currentRoundData.currWord,
          handleWordChange,
          "Nothing Selected",
        )}
      </Box>

      <Box
        sx={{
          width: "100%",
          flex: 1,
          minHeight: 0,
          mt: 2,
          textAlign: "center",
          overflow: "auto",
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Press Order
        </Typography>

        {pressOrder.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              justifyContent: "center",
            }}
          >
            {pressOrder.map((word, index) => (
              <Chip
                key={`${word}-${index}`}
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
            sx={{
              fontStyle: "italic",
            }}
          >
            Nothing selected!
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={goToPreviousRound}
          disabled={currentRound === 0}
          sx={{
            minWidth: 40,
            px: 1,
          }}
        >
          <ArrowBackIcon fontSize="small" />
        </Button>

        <Typography
          variant="body2"
          sx={{
            minWidth: 48,
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          {currentRound + 1} / 3
        </Typography>

        <Button
          variant="outlined"
          size="small"
          onClick={goToNextRound}
          disabled={currentRound === 2}
          sx={{
            minWidth: 40,
            px: 1,
          }}
        >
          <ArrowForwardIcon fontSize="small" />
        </Button>
      </Box>
    </Box>
  );
}

export default WhosOnFirst;
