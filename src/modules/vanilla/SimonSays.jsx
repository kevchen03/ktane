import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import vowels0 from "./img/SimonSays/Vowel0.jpg";
import vowels1 from "./img/SimonSays/Vowel1.jpg";
import vowels2 from "./img/SimonSays/Vowel2.jpg";
import noVowels0 from "./img/SimonSays/NoVowel0.jpg";
import noVowels1 from "./img/SimonSays/NoVowel1.jpg";
import noVowels2 from "./img/SimonSays/NoVowel2.jpg";
import { useKeyInfo } from "@/context/KeyInfoContext";

const SimonSays = () => {
  const { serialProps, strikes } = useKeyInfo();

  const rules = {
    vowel: {
      0: {
        RED: "BLUE",
        BLUE: "RED",
        YELLOW: "GREEN",
        GREEN: "YELLOW",
      },
      1: {
        RED: "YELLOW",
        BLUE: "GREEN",
        YELLOW: "RED",
        GREEN: "BLUE",
      },
      2: {
        RED: "GREEN",
        BLUE: "RED",
        YELLOW: "BLUE",
        GREEN: "YELLOW",
      },
    },
    noVowel: {
      0: {
        RED: "BLUE",
        BLUE: "YELLOW",
        YELLOW: "RED",
        GREEN: "GREEN",
      },
      1: {
        RED: "RED",
        BLUE: "BLUE",
        YELLOW: "GREEN",
        GREEN: "YELLOW",
      },
      2: {
        RED: "YELLOW",
        BLUE: "GREEN",
        YELLOW: "RED",
        GREEN: "BLUE",
      },
    },
  };

  const colors = ["RED", "BLUE", "YELLOW", "GREEN"];
  const strikeRule = strikes > 1 ? 2 : strikes;
  const ruleSet = serialProps.vowel ? rules.vowel : rules.noVowel;
  const currentRules = ruleSet[strikeRule];

  const ruleImages = serialProps.vowel
    ? [vowels0, vowels1, vowels2]
    : [noVowels0, noVowels1, noVowels2];

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
        Simon Says
      </Typography>

      <Table
        size="small"
        sx={{
          width: "100%",
          tableLayout: "fixed",
          flexShrink: 0,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: 700,
                width: "50%",
                p: 0.75,
              }}
            >
              FLASH
            </TableCell>

            <TableCell
              sx={{
                fontWeight: 700,
                width: "50%",
                p: 0.75,
              }}
            >
              PRESS
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {colors.map((color) => (
            <TableRow key={color}>
              <TableCell
                sx={{
                  p: 0.75,
                  fontWeight: 700,
                }}
              >
                {color}
              </TableCell>

              <TableCell
                sx={{
                  p: 0.75,
                  fontWeight: 700,
                }}
              >
                {currentRules[color]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Box
          component="img"
          src={ruleImages[strikeRule]}
          alt="Simon Says Rule"
          sx={{
            maxWidth: "90%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  );
};

export default SimonSays;
