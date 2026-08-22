import { useMemo, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useKeyInfo } from "@/context/KeyInfoContext";

const colors = ["White", "Red", "Blue", "Red + Blue"];
const decors = ["None", "LED", "STAR", "LED + STAR"];

function ComplicatedWires() {
  const { batteries, serialProps, ports } = useKeyInfo();

  const [color, setColor] = useState(0);
  const [decor, setDecor] = useState(0);

  const totalBatteries = batteries.AA + batteries.D;
  const hasParallelPort = ports.Parallel > 0;

  const rules = useMemo(() => {
    const batteriesRule = totalBatteries > 1 ? "Cut" : "Don't Cut";
    const evenRule = serialProps.even ? "Cut" : "Don't Cut";
    const parallelRule = hasParallelPort ? "Cut" : "Don't Cut";

    return [
      ["Cut", "Don't Cut", "Cut", batteriesRule],
      [evenRule, batteriesRule, "Cut", batteriesRule],
      [evenRule, parallelRule, "Don't Cut", parallelRule],
      [evenRule, evenRule, parallelRule, "Don't Cut"],
    ];
  }, [totalBatteries, serialProps.even, hasParallelPort]);

  const response = rules[color][decor];

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
      <TableContainer
        sx={{
          minWidth: 0,
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Table
          size="small"
          sx={{
            width: "100%",
            tableLayout: "fixed",
            "& .MuiTableCell-root": {
              py: 0.5,
              px: 0.5,
              lineHeight: 1.1,
              height: "42px",
              boxSizing: "border-box",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Color</strong>
              </TableCell>

              {decors.map((label) => (
                <TableCell
                  key={label}
                  align="center"
                  sx={{
                    overflowWrap: "break-word",
                  }}
                >
                  <strong>{label}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rules.map((row, index) => (
              <TableRow
                key={colors[index]}
                sx={{
                  height: "42px",
                }}
              >
                <TableCell>
                  <strong>{colors[index]}</strong>
                </TableCell>

                {row.map((value, idx) => (
                  <TableCell
                    key={idx}
                    align="center"
                    sx={{
                      backgroundColor: value === "Cut" ? "#c8e6c9" : "#ffcdd2",
                      color: "#000",
                      overflowWrap: "break-word",
                    }}
                  >
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 2,
        }}
      >
        <FormControl fullWidth size="small">
          <InputLabel>Color</InputLabel>

          <Select
            value={color}
            label="Color"
            onChange={(event) => setColor(Number.parseInt(event.target.value))}
          >
            {colors.map((option, index) => (
              <MenuItem key={option} value={index}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Decor</InputLabel>

          <Select
            value={decor}
            label="Decor"
            onChange={(event) => setDecor(Number.parseInt(event.target.value))}
          >
            {decors.map((option, index) => (
              <MenuItem key={option} value={index}>
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
            color={response === "Cut" ? "success.main" : "error.main"}
            fontWeight={700}
          >
            {response}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ComplicatedWires;
