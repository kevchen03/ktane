import React, { useCallback, useEffect, useState, useRef } from "react";
import "./SimpleMaze.css";
import "../../styling/commonStyles.css";
import Maze from "./Maze";
import maze1 from "./MazeData/1.json";
import maze2 from "./MazeData/2.json";
import maze3 from "./MazeData/3.json";
import maze4 from "./MazeData/4.json";
import maze5 from "./MazeData/5.json";
import maze6 from "./MazeData/6.json";
import maze7 from "./MazeData/7.json";
import maze8 from "./MazeData/8.json";
import maze9 from "./MazeData/9.json";

const SimpleMaze = () => {
  const mazeRef = useRef(null);
  const [mazeChoice, setMazeChoice] = useState(0);
  const [start, setStart] = useState({ x: 1, y: 1 });
  const [end, setEnd] = useState({ x: 6, y: 6 });
  const [directions, setDirections] = useState([]);
  const [loading, setLoading] = useState(true);

  const mazeChoices = [
    {
      data: maze1.data,
      desc: "(2, 1) or (3, 6)",
    },
    {
      data: maze2.data,
      desc: "(4, 2) or (2, 5)",
    },
    {
      data: maze3.data,
      desc: "(4, 4) or (4, 6)",
    },
    {
      data: maze4.data,
      desc: "(1, 1) or (4, 1)",
    },
    {
      data: maze5.data,
      desc: "(3, 5) or (6, 4)",
    },
    {
      data: maze6.data,
      desc: "(1, 5) or (5, 3)",
    },
    {
      data: maze7.data,
      desc: "(1, 2) or (6, 2)",
    },
    {
      data: maze8.data,
      desc: "(1, 4) or (4, 3)",
    },
    {
      data: maze9.data,
      desc: "(2, 3) or (5, 1)",
    },
  ];

  const getDirections = useCallback((startX, startY, endX, endY) => {
    const maze = mazeRef.current;
    if (!maze) return;
    maze.reset();
    const directionList = maze.BFS(startX, startY, endX, endY);
    setDirections(directionList);
  }, []);

  useEffect(() => {
    if (loading) {
      mazeRef.current = new Maze(maze1.data);
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    if (mazeRef.current) {
      getDirections(start.x - 1, start.y - 1, end.x - 1, end.y - 1);
    }
  }, [start, end, getDirections]);

  const handleMazeSelection = (event) => {
    const selectedVal = Number.parseInt(event.target.value);
    setMazeChoice(selectedVal);
    console.log(mazeChoices[selectedVal]);
    mazeRef.current = new Maze(mazeChoices[selectedVal].data);
    getDirections(start.x - 1, start.y - 1, end.x - 1, end.y - 1);
  };

  const handleStart = (event) => {
    const { name, value } = event.target;
    const val = Number.parseInt(value);
    if (Number.isNaN(val) || val < 1 || val > 6) return;
    const newStart = { ...start, [name]: val };
    setStart(newStart);
  };

  const handleEnd = (event) => {
    const { name, value } = event.target;
    const val = Number.parseInt(value);
    if (Number.isNaN(val) || val < 1 || val > 6) return;
    const newEnd = { ...end, [name]: val };
    setEnd(newEnd);
  };

  return (
    <div className="containerStyle">
      <h2 className="moduleHeader">Simple Maze</h2>

      {/* Locator */}
      <div className="labelRowStyle">
        <label className="labelStyle">Maze Circle X,Y:</label>
        <select
          className="styledSelect"
          value={String(mazeChoice)}
          onChange={(e) => handleMazeSelection(e)}
        >
          {mazeChoices.map((option, index) => {
            return (
              <option key={index} value={String(index)}>
                {option.desc}
              </option>
            );
          })}
        </select>
      </div>

      {/* Start */}
      <div className="labelRowStyle">
        <label className="labelStyle">Start Position X,Y:</label>
        <span>
          (
          <input
            className="styledNumInput"
            id="startX"
            name="x"
            type="number"
            value={start.x}
            onChange={handleStart}
          />
          ,
          <input
            className="styledNumInput"
            id="startY"
            name="y"
            type="number"
            value={start.y}
            onChange={handleStart}
          />
          )
        </span>
      </div>

      {/* End */}
      <div className="labelRowStyle">
        <label className="labelStyle">End Position X,Y:</label>
        <span>
          (
          <input
            className="styledNumInput"
            id="endX"
            name="x"
            type="number"
            value={end.x}
            onChange={handleEnd}
          />
          ,
          <input
            className="styledNumInput"
            id="endY"
            name="y"
            type="number"
            value={end.y}
            onChange={handleEnd}
          />
          )
        </span>
      </div>

      {/* Directions */}
      <div className="directions">
        <div className="labelStyle" style={{ marginBottom: "8px" }}>
          Directions:
        </div>
        {directions.length > 0 ? (
          <div className="directionBox">
            {directions.map((dir, i) => (
              <span key={i} className="directionLabel">
                {`${dir.direction} (${dir.times})`}
              </span>
            ))}
          </div>
        ) : (
          <p className="noDirections">No path calculated.</p>
        )}
      </div>
    </div>
  );
};

export default SimpleMaze;
