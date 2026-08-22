import { useMemo, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import holdImage from "./img/Button/HoldInfo.jpg";
import { useKeyInfo } from "@/context/KeyInfoContext";

const validColors = ["Red", "Blue", "White", "Yellow", "Black"];
const validLabels = ["Abort", "Detonate", "Hold", "Press"];

function Button() {
  const { batteries, litIndicators } = useKeyInfo();
  const [color, setColor] = useState("Blue");
  const [label, setLabel] = useState("Abort");

  const response = useMemo(() => {
    const hasCAR = Object.hasOwn(litIndicators, "CAR") && litIndicators["CAR"];
    const hasFRK = Object.hasOwn(litIndicators, "FRK") && litIndicators["FRK"];
    const totalBatteries = batteries.AA + batteries.D;

    /* Blue + Abort */
    if (color === "Blue" && label === "Abort") {
      return "Hold";
    }
    /* Any color + Detonate + 2 or more batteries */
    if (totalBatteries > 1 && label === "Detonate") {
      return "Click";
    }
    /* White + any label + lit CAR indicator */
    if (color === "White" && hasCAR) {
      return "Hold";
    }
    /* Any color + any label + 3 or more batteries + lit FRK indicator */
    if (totalBatteries > 2 && hasFRK) {
      return "Click";
    }
    /* Yellow + any label */
    if (color === "Yellow") {
      return "Hold";
    }
    /* Red + Hold */
    if (color === "Red" && label === "Hold") {
      return "Click";
    }
    /* Any other combination */
    return "Hold";
  }, [color, label, batteries, litIndicators]);

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 0,
        }}
      >
        <FormControl fullWidth size="small">
          <InputLabel>Button Color</InputLabel>

          <Select
            value={color}
            label="Button Color"
            onChange={(event) => setColor(event.target.value)}
          >
            {validColors.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Button Label</InputLabel>

          <Select
            value={label}
            label="Button Label"
            onChange={(event) => setLabel(event.target.value)}
          >
            {validLabels.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            Action:
          </Typography>

          <Typography
            variant="subtitle1"
            color={response === "Click" ? "success.main" : "primary.main"}
            fontWeight={700}
          >
            {response}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={holdImage}
          alt="Button hold information"
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            display: "block",
          }}
        />
      </Box>
    </Box>
  );
}

export default Button;
