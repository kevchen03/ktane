import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

function TopBar({ onMenuToggle, onClearModules, hasModules }) {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
          }}
        >
          KTANE
        </Typography>

        <Button
          color="inherit"
          startIcon={<DeleteSweepIcon />}
          onClick={onClearModules}
          disabled={!hasModules}
          sx={{
            mr: 1,
          }}
        >
          Clear All
        </Button>

        <Button color="inherit" startIcon={<AddIcon />} onClick={onMenuToggle}>
          Add Modules
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
