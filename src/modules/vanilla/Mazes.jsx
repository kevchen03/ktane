import { useMemo, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import maze1 from "./maze-data/1.json";
import maze2 from "./maze-data/2.json";
import maze3 from "./maze-data/3.json";
import maze4 from "./maze-data/4.json";
import maze5 from "./maze-data/5.json";
import maze6 from "./maze-data/6.json";
import maze7 from "./maze-data/7.json";
import maze8 from "./maze-data/8.json";
import maze9 from "./maze-data/9.json";

const mazeChoices = [
  {
    data: maze1.data,
    circles: [
      { x: 2, y: 1 },
      { x: 3, y: 6 },
    ],
  },
  {
    data: maze2.data,
    circles: [
      { x: 4, y: 2 },
      { x: 2, y: 5 },
    ],
  },
  {
    data: maze3.data,
    circles: [
      { x: 4, y: 4 },
      { x: 4, y: 6 },
    ],
  },
  {
    data: maze4.data,
    circles: [
      { x: 1, y: 1 },
      { x: 4, y: 1 },
    ],
  },
  {
    data: maze5.data,
    circles: [
      { x: 3, y: 5 },
      { x: 6, y: 4 },
    ],
  },
  {
    data: maze6.data,
    circles: [
      { x: 1, y: 5 },
      { x: 5, y: 3 },
    ],
  },
  {
    data: maze7.data,
    circles: [
      { x: 1, y: 2 },
      { x: 6, y: 2 },
    ],
  },
  {
    data: maze8.data,
    circles: [
      { x: 1, y: 4 },
      { x: 4, y: 3 },
    ],
  },
  {
    data: maze9.data,
    circles: [
      { x: 2, y: 3 },
      { x: 5, y: 1 },
    ],
  },
];

const createGrid = (mazeData) => {
  const grid = Array.from({ length: 6 }, () =>
    Array.from({ length: 6 }, () => ({
      up: false,
      down: false,
      left: false,
      right: false,
    })),
  );

  for (const link of mazeData) {
    const { x, y, direction } = link;

    if (direction === "right") {
      grid[x][y].right = true;
      grid[x][y + 1].left = true;
    } else if (direction === "down") {
      grid[x][y].down = true;
      grid[x + 1][y].up = true;
    }
  }

  return grid;
};

const getNeighbors = (grid, x, y) => {
  const neighbors = [];

  if (grid[x][y].left) {
    neighbors.push({ x, y: y - 1 });
  }

  if (grid[x][y].right) {
    neighbors.push({ x, y: y + 1 });
  }

  if (grid[x][y].up) {
    neighbors.push({ x: x - 1, y });
  }

  if (grid[x][y].down) {
    neighbors.push({ x: x + 1, y });
  }

  return neighbors.filter(
    (neighbor) =>
      neighbor.x >= 0 && neighbor.x < 6 && neighbor.y >= 0 && neighbor.y < 6,
  );
};

const getDirection = (from, to) => {
  if (to.x < from.x) return "up";
  if (to.x > from.x) return "down";
  if (to.y < from.y) return "left";
  if (to.y > from.y) return "right";
  return null;
};

const getPath = (mazeData, start, end) => {
  if (!start || !end) {
    return [];
  }

  const grid = createGrid(mazeData);

  const startKey = `${start.x},${start.y}`;
  const endKey = `${end.x},${end.y}`;

  const queue = [{ x: start.x, y: start.y }];
  const visited = new Set([startKey]);
  const parents = new Map();

  while (queue.length > 0) {
    const current = queue.shift();
    const currentKey = `${current.x},${current.y}`;

    if (currentKey === endKey) {
      break;
    }

    const neighbors = getNeighbors(grid, current.x, current.y);

    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.x},${neighbor.y}`;

      if (visited.has(neighborKey)) {
        continue;
      }

      visited.add(neighborKey);
      parents.set(neighborKey, current);
      queue.push(neighbor);
    }
  }

  if (!visited.has(endKey)) {
    return [];
  }

  const path = [];
  let current = { x: end.x, y: end.y };

  while (current.x !== start.x || current.y !== start.y) {
    const currentKey = `${current.x},${current.y}`;
    const previous = parents.get(currentKey);

    if (!previous) {
      return [];
    }

    path.unshift({
      x: current.x,
      y: current.y,
      direction: getDirection(previous, current),
    });

    current = previous;
  }

  path.unshift({
    x: start.x,
    y: start.y,
    direction: null,
  });

  return path;
};

const getDirections = (path) => {
  return path.reduce((directions, point, index) => {
    if (index === 0 || !point.direction) {
      return directions;
    }

    if (
      directions.length === 0 ||
      directions[directions.length - 1].direction !== point.direction
    ) {
      directions.push({
        direction: point.direction,
        times: 1,
      });
    } else {
      directions[directions.length - 1].times++;
    }

    return directions;
  }, []);
};

function Mazes() {
  const [mazeChoice, setMazeChoice] = useState(0);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const mazeGrid = useMemo(() => {
    return createGrid(mazeChoices[mazeChoice].data);
  }, [mazeChoice]);

  const path = useMemo(() => {
    return getPath(mazeChoices[mazeChoice].data, start, end);
  }, [mazeChoice, start, end]);

  const directions = useMemo(() => {
    return getDirections(path);
  }, [path]);

  const circles = mazeChoices[mazeChoice].circles;

  const handleMazeSelection = (event) => {
    setMazeChoice(Number(event.target.value));
    setStart(null);
    setEnd(null);
  };

  const handleCellClick = (x, y) => {
    if (start === null || end !== null) {
      setStart({ x, y });
      setEnd(null);
      return;
    }

    if (x === start.x && y === start.y) {
      return;
    }

    setEnd({ x, y });
  };

  const getCellBorders = (cell) => {
    return {
      borderTop: cell.up ? "1px solid transparent" : "2px solid",
      borderRight: cell.right ? "1px solid transparent" : "2px solid",
      borderBottom: cell.down ? "1px solid transparent" : "2px solid",
      borderLeft: cell.left ? "1px solid transparent" : "2px solid",
    };
  };

  const pathPoints = path
    .map((point) => {
      const x = ((point.y + 0.5) / 6) * 100;
      const y = ((point.x + 0.5) / 6) * 100;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Box
      sx={{
        p: 2,
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <FormControl size="small" fullWidth sx={{ mb: 2 }}>
        <InputLabel>Maze Circle X,Y</InputLabel>

        <Select
          value={mazeChoice}
          label="Maze Circle X,Y"
          onChange={handleMazeSelection}
        >
          {mazeChoices.map((option, index) => (
            <MenuItem key={index} value={index}>
              {option.circles.map(({ x, y }) => `(${x}, ${y})`).join(" or ")}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "100%",
            maxHeight: "100%",
            width: "auto",
            maxWidth: "100%",
            aspectRatio: "1",
            display: "grid",
            gridTemplateColumns: "24px minmax(0, 1fr) 24px",
            gridTemplateRows: "24px minmax(0, 1fr) 24px",
          }}
        >
          <Box />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((value) => (
              <Typography
                key={value}
                variant="body2"
                sx={{
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                {value}
              </Typography>
            ))}
          </Box>

          <Box />

          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "repeat(6, 1fr)",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((value) => (
              <Typography
                key={value}
                variant="body2"
                sx={{
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                {value}
              </Typography>
            ))}
          </Box>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              border: "2px solid",
              borderColor: "text.primary",
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                width: "100%",
                height: "100%",
              }}
            >
              {mazeGrid.map((row, x) =>
                row.map((cell, y) => {
                  const isStart = start?.x === x && start?.y === y;

                  const isEnd = end?.x === x && end?.y === y;

                  const hasCircle = circles.some(
                    (circle) => circle.x === x + 1 && circle.y === y + 1,
                  );

                  return (
                    <Box
                      key={`${x}-${y}`}
                      onClick={() => handleCellClick(x, y)}
                      sx={{
                        ...getCellBorders(cell),
                        borderColor: "text.primary",
                        boxSizing: "border-box",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        userSelect: "none",
                        backgroundColor: isStart
                          ? "success.main"
                          : isEnd
                            ? "error.main"
                            : "background.paper",
                        color:
                          isStart || isEnd ? "common.white" : "text.primary",
                        transition: "background-color 0.15s",
                        "&:hover": {
                          backgroundColor: isStart
                            ? "success.dark"
                            : isEnd
                              ? "error.dark"
                              : "action.hover",
                        },
                      }}
                    >
                      {hasCircle && (
                        <Box
                          sx={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            border: "4px solid",
                            borderColor: "success.main",
                            borderRadius: "50%",
                            boxSizing: "border-box",
                            pointerEvents: "none",
                          }}
                        />
                      )}

                      {isStart && (
                        <Typography
                          variant="caption"
                          sx={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            fontWeight: 700,
                            fontSize: "0.55rem",
                            lineHeight: 1,
                            whiteSpace: "nowrap",
                            pointerEvents: "none",
                          }}
                        >
                          START
                        </Typography>
                      )}

                      {isEnd && (
                        <Typography
                          variant="caption"
                          sx={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            fontWeight: 700,
                            fontSize: "0.55rem",
                            lineHeight: 1,
                            whiteSpace: "nowrap",
                            pointerEvents: "none",
                          }}
                        >
                          END
                        </Typography>
                      )}
                    </Box>
                  );
                }),
              )}
            </Box>

            {path.length > 1 && (
              <Box
                component="svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  overflow: "visible",
                  color: "info.main",
                }}
              >
                <polyline
                  points={pathPoints}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  opacity={0.9}
                />
              </Box>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 0,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              x
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gridColumn: "2",
              gridRow: "3",
              width: "100%",
              height: "24px",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              y
            </Typography>
          </Box>

          <Box />
        </Box>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          textAlign: "center",
          mt: 1,
        }}
      >
        {start === null
          ? "Click a cell to select the start."
          : end === null
            ? "Click a cell to select the end."
            : "Click a cell to select a new start."}
      </Typography>
    </Box>
  );
}

export default Mazes;
