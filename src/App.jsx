import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import TopBar from "./components/TopBar";
import KeyInfoSidebar from "./components/KeyInfoSidebar";
import ModuleGrid from "./components/ModuleGrid";
import ModuleMenu from "./components/ModuleMenu";

function App() {
  const [modules, setModules] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  const addModule = (type) => {
    setModules((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type,
      },
    ]);
  };

  const removeModule = (id) => {
    setModules((prev) => prev.filter((module) => module.id !== id));
  };

  const clearModules = () => {
    setClearDialogOpen(true);
  };

  const confirmClearModules = () => {
    setModules([]);
    setClearDialogOpen(false);
  };

  const cancelClearModules = () => {
    setClearDialogOpen(false);
  };

  const reorderModules = (reorderedModules) => {
    setModules(reorderedModules);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <TopBar
        onMenuToggle={() => setMenuOpen((prev) => !prev)}
        onClearModules={clearModules}
        hasModules={modules.length > 0}
      />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <KeyInfoSidebar />
        <ModuleGrid
          modules={modules}
          onRemoveModule={removeModule}
          onClearModules={() => setModules([])}
          onReorderModules={reorderModules}
          onOpenModuleMenu={() => setMenuOpen(true)}
        />
      </Box>
      <ModuleMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onAddModule={addModule}
      />

      <Dialog open={clearDialogOpen} onClose={cancelClearModules}>
        <DialogTitle>Clear All Modules?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove all modules from the grid? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={cancelClearModules}>Cancel</Button>

          <Button
            onClick={confirmClearModules}
            color="error"
            variant="contained"
          >
            Clear All
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
