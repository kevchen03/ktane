import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const numberOptions = [1, 2, 3, 4];

const rules = [
  {
    1: { type: "POS", value: 2 },
    2: { type: "POS", value: 2 },
    3: { type: "POS", value: 3 },
    4: { type: "POS", value: 4 },
  },
  {
    1: { type: "LABEL", value: 4 },
    2: { type: "STAGE", stage: 1, type2: "POS" },
    3: { type: "POS", value: 1 },
    4: { type: "STAGE", stage: 1, type2: "POS" },
  },
  {
    1: { type: "STAGE", stage: 2, type2: "LABEL" },
    2: { type: "STAGE", stage: 1, type2: "LABEL" },
    3: { type: "POS", value: 3 },
    4: { type: "LABEL", value: 4 },
  },
  {
    1: { type: "STAGE", stage: 1, type2: "POS" },
    2: { type: "POS", value: 1 },
    3: { type: "STAGE", stage: 2, type2: "POS" },
    4: { type: "STAGE", stage: 2, type2: "POS" },
  },
  {
    1: { type: "STAGE", stage: 1, type2: "LABEL" },
    2: { type: "STAGE", stage: 2, type2: "LABEL" },
    3: { type: "STAGE", stage: 4, type2: "LABEL" },
    4: { type: "STAGE", stage: 3, type2: "LABEL" },
  },
];

const createInitialInputs = () =>
  Array.from({ length: 5 }, () => ({
    DISP: "",
    POS: "",
    LABEL: "",
    RULE: "",
    disablePOS: true,
    disableLABEL: true,
  }));

function Memory() {
  const [inputs, setInputs] = useState(createInitialInputs);

  const updateVals = (stage, key, newVal) => {
    setInputs((prev) => {
      const newInputs = prev.map((input) => ({ ...input }));
      newInputs[stage][key] = newVal;
      return newInputs;
    });
  };

  const isStageComplete = (stage) => {
    const input = inputs[stage];

    if (input.DISP === "") {
      return false;
    }

    if (!input.disablePOS && input.POS === "") {
      return false;
    }

    if (!input.disableLABEL && input.LABEL === "") {
      return false;
    }

    return true;
  };

  const determineAction = (stage, newDisplay) => {
    setInputs((prev) => {
      const newInputs = prev.map((input) => ({ ...input }));
      const current = newInputs[stage];

      if (newDisplay === "") {
        current.DISP = "";
        current.POS = "";
        current.LABEL = "";
        current.RULE = "";
        current.disablePOS = true;
        current.disableLABEL = true;

        return newInputs;
      }

      current.DISP = newDisplay;

      const rule = rules[stage][newDisplay];

      if (!rule) {
        return newInputs;
      }

      if (rule.type === "STAGE") {
        const oldStage = rule.stage - 1;
        const key = rule.type2;

        current[key] = newInputs[oldStage][key];
        current.RULE = `${key} ${newInputs[oldStage][key]}`;

        if (key === "POS") {
          current.disablePOS = true;
          current.disableLABEL = false;
        } else {
          current.disablePOS = stage === 4;
          current.disableLABEL = true;
        }
      } else {
        current[rule.type] = rule.value;
        current.RULE = `${rule.type} ${rule.value}`;

        if (rule.type === "POS") {
          current.disablePOS = true;
          current.disableLABEL = false;
        } else {
          current.disablePOS = false;
          current.disableLABEL = true;
        }
      }

      return newInputs;
    });
  };

  const resetInputs = () => {
    setInputs(createInitialInputs());
  };

  return (
    <Box
      sx={{
        p: 2,
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Memory
      </Typography>

      <Table
        size="small"
        sx={{
          width: "100%",
          tableLayout: "fixed",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                width: "25%",
                p: 0.5,
                fontWeight: 700,
              }}
            >
              DISPLAY
            </TableCell>

            <TableCell
              sx={{
                width: "25%",
                p: 0.5,
                fontWeight: 700,
              }}
            >
              POS
            </TableCell>

            <TableCell
              sx={{
                width: "25%",
                p: 0.5,
                fontWeight: 700,
              }}
            >
              LABEL
            </TableCell>

            <TableCell
              sx={{
                width: "25%",
                p: 0.5,
                fontWeight: 700,
              }}
            >
              RULE
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {inputs.map((input, index) => {
            return (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    width: "25%",
                    p: 0.5,
                  }}
                >
                  <FormControl
                    size="small"
                    fullWidth
                    disabled={index > 0 && !isStageComplete(index - 1)}
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Select
                      value={input.DISP}
                      displayEmpty
                      fullWidth
                      sx={{
                        width: "100%",
                      }}
                      onChange={(event) => {
                        const value = event.target.value;

                        determineAction(
                          index,
                          value === "" ? "" : Number(value),
                        );
                      }}
                    >
                      <MenuItem value="">&nbsp;</MenuItem>

                      {numberOptions.map((value) => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>

                <TableCell
                  sx={{
                    width: "25%",
                    p: 0.5,
                  }}
                >
                  <FormControl
                    size="small"
                    fullWidth
                    disabled={input.disablePOS}
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Select
                      value={input.POS}
                      displayEmpty
                      fullWidth
                      sx={{
                        width: "100%",
                      }}
                      onChange={(event) => {
                        const value = event.target.value;

                        updateVals(
                          index,
                          "POS",
                          value === "" ? "" : Number(value),
                        );
                      }}
                    >
                      <MenuItem value="">&nbsp;</MenuItem>

                      {numberOptions.map((value) => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>

                <TableCell
                  sx={{
                    width: "25%",
                    p: 0.5,
                  }}
                >
                  <FormControl
                    size="small"
                    fullWidth
                    disabled={input.disableLABEL}
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Select
                      value={input.LABEL}
                      displayEmpty
                      fullWidth
                      sx={{
                        width: "100%",
                      }}
                      onChange={(event) => {
                        const value = event.target.value;

                        updateVals(
                          index,
                          "LABEL",
                          value === "" ? "" : Number(value),
                        );
                      }}
                    >
                      <MenuItem value="">&nbsp;</MenuItem>

                      {numberOptions.map((value) => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>

                <TableCell
                  sx={{
                    width: "25%",
                    p: 0.5,
                    verticalAlign: "middle",
                  }}
                >
                  {input.RULE}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "auto",
          pt: 2,
        }}
      >
        <Button variant="outlined" onClick={resetInputs}>
          🔁 Reset
        </Button>
      </Box>
    </Box>
  );
}

export default Memory;
