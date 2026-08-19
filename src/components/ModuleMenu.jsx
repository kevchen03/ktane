import { useMemo, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import moduleRegistry from "../modules/moduleRegistry";

const DRAWER_WIDTH = 320;

function ModuleMenu({ open, onClose, onAddModule }) {
  const [search, setSearch] = useState("");

  const filteredModules = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return Object.entries(moduleRegistry);
    }

    return Object.entries(moduleRegistry).filter(([, module]) =>
      module.name.toLowerCase().includes(query),
    );
  }, [search]);

  const handleAddModule = (type) => {
    onAddModule(type);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      variant="temporary"
      ModalProps={{
        keepMounted: true,
      }}
      slotProps={{
        paper: {
          sx: {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Modules
        </Typography>

        <IconButton onClick={onClose} aria-label="Close module menu">
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          size="small"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search modules..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Divider />

      <List
        sx={{
          flex: 1,
          overflowY: "auto",
          py: 0,
        }}
      >
        {filteredModules.length === 0 ? (
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              No modules found.
            </Typography>
          </Box>
        ) : (
          filteredModules.map(([type, module]) => (
            <ListItemButton key={type} onClick={() => handleAddModule(type)}>
              <ListItemText
                primary={module.name}
                secondary={module.description}
              />
            </ListItemButton>
          ))
        )}
      </List>
    </Drawer>
  );
}

export default ModuleMenu;
