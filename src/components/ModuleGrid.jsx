import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import moduleRegistry from "@/modules/moduleRegistry";

const MIN_MODULE_WIDTH = 320;
const MODULE_HEIGHT = 500;
const GRID_GAP = 16;
const GRID_PADDING = 16;

function ModuleGrid({
  modules,
  onRemoveModule,
  onReorderModules,
  onOpenModuleMenu,
}) {
  const gridRef = useRef(null);
  const [columnCount, setColumnCount] = useState(1);
  const [draggedModuleId, setDraggedModuleId] = useState(null);
  const [dragOverModuleId, setDragOverModuleId] = useState(null);
  const [moduleToRemove, setModuleToRemove] = useState(null);

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

  const handleDragStart = (event, moduleId) => {
    setDraggedModuleId(moduleId);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", moduleId);
  };

  const handleDragOver = (event, moduleId) => {
    event.preventDefault();

    if (moduleId === draggedModuleId) {
      return;
    }

    event.dataTransfer.dropEffect = "move";
    setDragOverModuleId(moduleId);
  };

  const handleDragLeave = (event, moduleId) => {
    if (
      event.currentTarget.contains(event.relatedTarget) ||
      dragOverModuleId !== moduleId
    ) {
      return;
    }

    setDragOverModuleId(null);
  };

  const handleDrop = (event, targetModuleId) => {
    event.preventDefault();

    const sourceModuleId = event.dataTransfer.getData("text/plain");

    if (!sourceModuleId || sourceModuleId === targetModuleId) {
      setDraggedModuleId(null);
      setDragOverModuleId(null);
      return;
    }

    const sourceIndex = modules.findIndex(
      (module) => module.id === sourceModuleId,
    );
    const targetIndex = modules.findIndex(
      (module) => module.id === targetModuleId,
    );

    if (sourceIndex === -1 || targetIndex === -1) {
      setDraggedModuleId(null);
      setDragOverModuleId(null);
      return;
    }

    const reorderedModules = [...modules];
    const [movedModule] = reorderedModules.splice(sourceIndex, 1);
    reorderedModules.splice(targetIndex, 0, movedModule);

    onReorderModules(reorderedModules);
    setDraggedModuleId(null);
    setDragOverModuleId(null);
  };

  const handleDragEnd = () => {
    setDraggedModuleId(null);
    setDragOverModuleId(null);
  };

  const handleRemoveClick = (module) => {
    setModuleToRemove(module);
  };

  const handleConfirmRemove = () => {
    if (moduleToRemove) {
      onRemoveModule(moduleToRemove.id);
    }

    setModuleToRemove(null);
  };

  const handleCancelRemove = () => {
    setModuleToRemove(null);
  };

  return (
    <>
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
        {modules.length === 0 ? (
          <Box
            sx={{
              gridColumn: "1 / -1",
              minHeight: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
                maxWidth: 360,
              }}
            >
              <Typography variant="h6">No modules added</Typography>

              <Typography variant="body2" color="text.secondary">
                Add a module from the module menu to get started.
              </Typography>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onOpenModuleMenu}
              >
                Add Module
              </Button>
            </Box>
          </Box>
        ) : (
          modules.map((module, index) => {
            const definition = moduleRegistry[module.type];
            if (!definition) {
              return null;
            }
            const ModuleComponent = definition.component;

            return (
              <Paper
                key={module.id}
                elevation={2}
                onDragOver={(event) => handleDragOver(event, module.id)}
                onDragLeave={(event) => handleDragLeave(event, module.id)}
                onDrop={(event) => handleDrop(event, module.id)}
                sx={{
                  position: "relative",
                  minWidth: 0,
                  minHeight: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  opacity: draggedModuleId === module.id ? 0.5 : 1,
                  border: dragOverModuleId === module.id ? 2 : 0,
                  borderColor: "primary.main",
                  boxSizing: "border-box",
                  transition: "opacity 0.15s, border 0.15s",
                }}
              >
                <Box
                  draggable
                  onDragStart={(event) => handleDragStart(event, module.id)}
                  onDragEnd={handleDragEnd}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    minHeight: 40,
                    px: 1.5,
                    borderBottom: 1,
                    borderColor: "divider",
                    cursor: "grab",
                    userSelect: "none",
                    flexShrink: 0,
                    "&:active": {
                      cursor: "grabbing",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    noWrap
                    sx={{
                      minWidth: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {index + 1}. {definition.name}
                  </Typography>

                  <Tooltip title="Remove module">
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveClick(module)}
                      onMouseDown={(event) => event.stopPropagation()}
                      draggable={false}
                      aria-label="Remove module"
                      sx={{
                        ml: 1,
                        flexShrink: 0,
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    minHeight: 0,
                  }}
                >
                  <ModuleComponent />
                </Box>
              </Paper>
            );
          })
        )}
      </Box>

      <Dialog open={moduleToRemove !== null} onClose={handleCancelRemove}>
        <DialogTitle>Remove Module?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this module? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancelRemove}>Cancel</Button>

          <Button
            onClick={handleConfirmRemove}
            color="error"
            variant="contained"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ModuleGrid;
