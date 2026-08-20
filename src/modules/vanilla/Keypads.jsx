import { useState } from "react";
import { Box, Button, ButtonBase, Typography } from "@mui/material";

const columns = [
  [0x3d8, 0x466, 0x19b, 0x3de, 0x46c, 0x3d7, 0x3ff],
  [0x4ec, 0x3d8, 0x3ff, 0x4a8, 0x2606, 0x3d7, 0xbf],
  [0xa9, 0x47c, 0x4a8, 0x497, 0x506, 0x19b, 0x2606],
  [0x431, 0x0b6, 0x462, 0x46c, 0x497, 0xbf, 0x67c],
  [0x3c8, 0x67c, 0x462, 0x3fe, 0x0b6, 0x46f, 0x2605],
  [0x431, 0x4ec, 0x482, 0xe6, 0x3c8, 0x419, 0x3a9],
];

function Keypads() {
  const [selectedSymbols, setSelectedSymbols] = useState([]);

  const toggleSymbol = (symbol) => {
    setSelectedSymbols((prev) => {
      /* If symbol was clicked, remove from the list */
      if (prev.includes(symbol)) {
        return prev.filter((s) => s !== symbol);
      }
      /* Else: if number of selected symbols < 4, add to the list */
      if (prev.length < 4) {
        return [...prev, symbol];
      }
      /* Ignore input trying to add more than 4 symbols */
      return prev;
    });
  };

  const visibleColumns = columns.filter((column) =>
    selectedSymbols.every((symbol) => column.includes(symbol)),
  );

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
        Keypad (Symbols)
      </Typography>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          display: "flex",
          justifyContent: "center",
          gap: 1,
          overflow: "hidden",
        }}
      >
        {visibleColumns.map((column, columnIndex) => (
          <Box
            key={columnIndex}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              flex: "1 1 0",
              minWidth: 0,
            }}
          >
            {column.map((symbol, symbolIndex) => {
              const isSelected = selectedSymbols.includes(symbol);

              return (
                <ButtonBase
                  key={symbolIndex}
                  onClick={() => toggleSymbol(symbol)}
                  sx={{
                    flex: "1 1 0",
                    minHeight: 0,
                    minWidth: 0,
                    border: 1,
                    borderColor: isSelected ? "primary.main" : "divider",
                    borderRadius: 1,
                    backgroundColor: isSelected
                      ? "primary.main"
                      : "background.paper",
                    color: isSelected ? "primary.contrastText" : "text.primary",
                    fontSize: "clamp(1rem, 3vw, 2rem)",
                    fontFamily: "serif",
                    transition: "background-color 0.15s, border-color 0.15s",
                    "&:hover": {
                      backgroundColor: isSelected
                        ? "primary.dark"
                        : "action.hover",
                    },
                    "&:active": {
                      backgroundColor: isSelected
                        ? "primary.dark"
                        : "action.selected",
                    },
                  }}
                >
                  {String.fromCodePoint(symbol)}
                </ButtonBase>
              );
            })}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Button variant="outlined" onClick={() => setSelectedSymbols([])}>
          🔁 Reset
        </Button>
      </Box>
    </Box>
  );
}

export default Keypads;
