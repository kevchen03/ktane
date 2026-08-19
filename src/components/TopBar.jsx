import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

function TopBar({ onToggleMenu }) {
  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 700,
            flexGrow: 1,
          }}
        >
          KTANE
        </Typography>

        <IconButton
          color="inherit"
          onClick={onToggleMenu}
          aria-label="toggle module menu"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;