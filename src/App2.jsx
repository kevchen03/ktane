import { useState } from "react";
import { Box } from "@mui/material";

import TopBar from "./components/TopBar";
import KeyInfoSidebar from "./components/KeyInfoSidebar";
import ModuleGrid from "./components/ModuleGrid";
import ModuleMenu from "./components/ModuleMenu";

function App() {
  const [modules, setModules] = useState([]);
  const [menuOpen, setMenuOpen] = useState(true);

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
        display: "grid",
        gridTemplateRows: "64px 1fr",
        overflow: "hidden",
      }}
    >
      <TopBar onToggleMenu={() => setMenuOpen((prev) => !prev)} />
      <Box
        sx={{
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: menuOpen
            ? "260px minmax(0, 1fr) 280px"
            : "260px minmax(0, 1fr) 48px",
          transition: "grid-template-columns 200ms ease",
        }}
      >
        <KeyInfoSidebar />
        <ModuleGrid modules={modules} onRemoveModule={removeModule} />
        <ModuleMenu
          open={menuOpen}
          onToggle={() => setMenuOpen((prev) => !prev)}
          onAddModule={addModule}
        />
      </Box>
    </Box>
  );
}

export default App;
