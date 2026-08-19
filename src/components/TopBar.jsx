import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function TopBar({ onMenuToggle }) {
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

        <IconButton
          color="inherit"
          onClick={onMenuToggle}
          aria-label="Open module menu"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
