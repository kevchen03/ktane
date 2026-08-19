import { useEffect, useRef, useState } from "react";
import { Box, IconButton, Paper, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moduleRegistry from "@/modules/moduleRegistry";

const MIN_MODULE_WIDTH = 320;
const MODULE_HEIGHT = 500;
const GRID_GAP = 16;
const GRID_PADDING = 16;

function ModuleGrid({ modules, onRemoveModule }) {
  const gridRef = useRef(null);
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    const element = gridRef.current;
    if (!element) {
      return;
    }

    const updateColumns = () => {
      const width = element.clientWidth;
      const availableWidth = width - GRID_PADDING * 2;
      const columns = Math.max(
        1,
        Math.floor((availableWidth + GRID_GAP) / (MIN_MODULE_WIDTH + GRID_GAP)),
      );
      setColumnCount(columns);
    };

    updateColumns();
    const observer = new ResizeObserver(updateColumns);
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Box
      ref={gridRef}
      sx={{
        flex: 1,
        minWidth: 0,
        minHeight: 0,
        overflow: "auto",
        p: `${GRID_PADDING}px`,
        display: "grid",
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        gridAutoRows: `${MODULE_HEIGHT}px`,
        gap: `${GRID_GAP}px`,
        alignContent: "start",
      }}
    >
      {modules.map((module) => {
        const definition = moduleRegistry[module.type];
        if (!definition) {
          return null;
        }
        const ModuleComponent = definition.component;

        return (
          <Paper
            key={module.id}
            elevation={2}
            sx={{
              position: "relative",
              minWidth: 0,
              minHeight: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Tooltip title="Remove module">
              <IconButton
                size="small"
                onClick={() => onRemoveModule(module.id)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 1,
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <ModuleComponent />
          </Paper>
        );
      })}
    </Box>
  );
}

export default ModuleGrid;
