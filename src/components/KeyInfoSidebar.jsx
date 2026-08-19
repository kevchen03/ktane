import {
  Box,
  Divider,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useKeyInfo } from "@/context/KeyInfoContext";

function Counter({ label, value, onChange }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 0.5,
      }}
    >
      <Typography variant="body2">{label}</Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton
          size="small"
          onClick={() => onChange(Math.max(0, value - 1))}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>

        <Typography
          variant="body2"
          sx={{
            width: 24,
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          {value}
        </Typography>

        <IconButton size="small" onClick={() => onChange(value + 1)}>
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}

function IndicatorControl({ indicator, value, onChange }) {
  const selectedValue = value === null ? "na" : value ? "lit" : "unlit";

  const handleChange = (_, newValue) => {
    if (newValue === null) {
      return;
    }

    if (newValue === "na") {
      onChange(null);
    } else if (newValue === "unlit") {
      onChange(false);
    } else {
      onChange(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        mb: 0.75,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          minWidth: 32,
        }}
      >
        {indicator}
      </Typography>

      <ToggleButtonGroup
        exclusive
        size="small"
        value={selectedValue}
        onChange={handleChange}
        aria-label={`${indicator} indicator state`}
        sx={{
          "& .MuiToggleButton-root": {
            px: 0.75,
            py: 0.25,
            minWidth: 0,
            fontSize: "0.7rem",
            textTransform: "none",
          },
          "& .MuiToggleButton-root[value='na'].Mui-selected": {
            color: "#424242",
            backgroundColor: "#eeeeee",
            borderColor: "#757575",
          },
          "& .MuiToggleButton-root[value='unlit'].Mui-selected": {
            color: "#7a4f01",
            backgroundColor: "#fff0b3",
            borderColor: "#d6a700",
          },
          "& .MuiToggleButton-root[value='lit'].Mui-selected": {
            color: "#1b5e20",
            backgroundColor: "#c8e6c9",
            borderColor: "#43a047",
          },
        }}
      >
        <ToggleButton value="na">N/A</ToggleButton>
        <ToggleButton value="unlit">Unlit</ToggleButton>
        <ToggleButton value="lit">Lit</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

function KeyInfoSidebar() {
  const {
    serial,
    serialProps,
    strikes,

    indicators,
    litIndicators,

    batteries,
    ports,

    handleSerialChange,
    setStrikes,
    updateLitIndicator,
    updateBatteryCount,
    updatePortCount,
  } = useKeyInfo();

  const getIndicatorValue = (indicator) => {
    if (!Object.hasOwn(litIndicators, indicator)) {
      return null;
    }
    return litIndicators[indicator];
  };

  return (
    <Box
      sx={{
        minHeight: 0,
        overflowY: "auto",
        borderRight: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Key Info
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Serial Number
        </Typography>

        <TextField
          fullWidth
          size="small"
          value={serial}
          onChange={(event) => handleSerialChange(event.target.value)}
          placeholder="ABC123"
          slotProps={{
            htmlInput: {
              maxLength: 6,
            },
          }}
        />
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Strikes
        </Typography>

        <Counter label="Strikes" value={strikes} onChange={setStrikes} />
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Batteries
        </Typography>

        <Counter
          label="AA"
          value={batteries.AA}
          onChange={(value) => updateBatteryCount("AA", value)}
        />

        <Counter
          label="D"
          value={batteries.D}
          onChange={(value) => updateBatteryCount("D", value)}
        />
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Ports
        </Typography>

        {Object.entries(ports).map(([port, count]) => (
          <Counter
            key={port}
            label={port}
            value={count}
            onChange={(value) => updatePortCount(port, value)}
          />
        ))}
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Indicators
        </Typography>

        {indicators.map((indicator) => (
          <IndicatorControl
            key={indicator}
            indicator={indicator}
            value={getIndicatorValue(indicator)}
            onChange={(value) => updateLitIndicator(indicator, value)}
          />
        ))}
      </Box>
    </Box>
  );
}

export default KeyInfoSidebar;
