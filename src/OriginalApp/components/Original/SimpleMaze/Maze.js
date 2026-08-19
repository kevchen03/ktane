class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.left = null;
    this.right = null;
    this.up = null;
    this.down = null;
    this.visited = false;
    this.parent = null;
  }

  *getNeighbors() {
    if (this.left) yield this.left;
    if (this.right) yield this.right;
    if (this.up) yield this.up;
    if (this.down) yield this.down;
  }

  setLeft(p) {
    this.left = p;
  }

  setRight(p) {
    this.right = p;
  }

  setUp(p) {
    this.up = p;
  }

  setDown(p) {
    this.down = p;
  }

  setVisited(visited) {
    this.visited = visited;
  }

  setParent(p) {
    this.parent = p;
  }

  getDirection() {
    if (this.parent === this.left) return 'left';
    if (this.parent === this.right) return 'right';
    if (this.parent === this.up) return 'up';
    if (this.parent === this.down) return 'down';
    return null;
  }
};

class Maze {
  constructor(mazeData) {
    this.grid = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 6; j++) {
        row.push(new Point(i, j));
      }
      this.grid.push(row);
    }
    for (const link of mazeData) {
      if (link?.direction === "right") {
        this.grid[link.x][link.y].setRight(this.grid[link.x][link.y + 1]);
        this.grid[link.x][link.y + 1].setLeft(this.grid[link.x][link.y]);
      } else {
        this.grid[link.x][link.y].setDown(this.grid[link.x + 1][link.y]);
        this.grid[link.x + 1][link.y].setUp(this.grid[link.x][link.y]);
      }
    }
  }

  reset() {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        this.grid[i][j].setVisited(false);
        this.grid[i][j].setParent(null);
      }
    }
  }

  BFS(startX, startY, endX, endY) {
    const queue = [this.grid[endX][endY]];
    while (queue.length) {
      const curr = queue.shift();
      curr.setVisited(true);
      for (const neighbor of curr.getNeighbors()) {
        if (!neighbor.visited) {
          neighbor.setParent(curr);
          queue.push(neighbor);
        }
      }
    }
    const directions = [];
    var point = this.grid[startX][startY];
    while (point.parent) {
      const nextDirection = point.getDirection();
      if (directions.length === 0 || directions[directions.length - 1].direction !== nextDirection) {
        directions.push({ direction: nextDirection, times: 1 });
      } else {
        directions[directions.length - 1].times++;
      }
      point = point.parent;
    }
    return directions;
  }
};

export default Maze;