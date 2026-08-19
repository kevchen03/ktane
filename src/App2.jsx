import { useState } from "react";
import { Box } from "@mui/material";
import TopBar from "./components/TopBar";
import KeyInfoSidebar from "./components/KeyInfoSidebar";
import ModuleGrid from "./components/ModuleGrid";
import ModuleMenu from "./components/ModuleMenu";

function App() {
  const [modules, setModules] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <TopBar onMenuToggle={() => setMenuOpen((prev) => !prev)} />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <KeyInfoSidebar />
        <ModuleGrid modules={modules} onRemoveModule={removeModule} />
      </Box>
      <ModuleMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onAddModule={addModule}
      />
    </Box>
  );
}

export default App;
