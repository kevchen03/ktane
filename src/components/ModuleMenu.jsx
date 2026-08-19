import { useMemo, useState } from 'react';

import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { moduleRegistry } from '../modules/moduleRegistry';

function ModuleMenu({
  open,
  onToggle,
  onAddModule,
}) {
  const [search, setSearch] = useState('');

  const filteredModules = useMemo(() => {
    const query = search.toLowerCase().trim();

    return Object.entries(moduleRegistry).filter(
      ([, module]) =>
        module.name.toLowerCase().includes(query)
    );
  }, [search]);

  if (!open) {
    return (
      <Box
        sx={{
          borderLeft: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'center',
          pt: 1,
        }}
      >
        <Tooltip title="Open module menu" placement="left">
          <IconButton onClick={onToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        borderLeft: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        bgcolor: 'background.paper',
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            flexGrow: 1,
          }}
        >
          Modules
        </Typography>

        <Tooltip title="Collapse module menu">
          <IconButton onClick={onToggle}>
            <ChevronRightIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider />

      <Box sx={{ p: 1.5 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search modules..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
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
        dense
        sx={{
          overflowY: 'auto',
          flexGrow: 1,
        }}
      >
        {filteredModules.map(([type, module]) => (
          <ListItemButton
            key={type}
            onClick={() => onAddModule(type)}
          >
            <ListItemText
              primary={module.name}
            />
          </ListItemButton>
        ))}

        {filteredModules.length === 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              p: 2,
              textAlign: 'center',
            }}
          >
            No modules found
          </Typography>
        )}
      </List>
    </Box>
  );
}

export default ModuleMenu;