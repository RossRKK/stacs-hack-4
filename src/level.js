class GridCell {
  constructor (background, imgSrc, solid, mask) {
    this.background = background;

    this.img = document.createElement("img");
    this.img.src = imgSrc;

    this.solid = solid;
    this.mask = mask;
  }

  //draw the grid cell
  draw(ctx, x, y) {
      //draw an image if it's available
      if (this.img.src) {
        ctx.drawImage(this.img, x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
      } else {
          ctx.fillStyle = this.background;
          ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
      }
  }
}

function isObstructed(level, x, y) {
    let tile = getTile(level, x, y);
    if (tile === undefined) return true;
    if (tile === null) return false;
    return tile.solid;
}

function getTile(level,x , y) {
    let gridX = Math.floor(x / GRID_SIZE);
    let gridY = Math.floor(y / GRID_SIZE);

    if (gridX >= 0 && gridX < level.grid.length && gridY >= 0 && gridY < level.grid[gridX].length) {
        return level.grid[gridX][gridY];
    } else {
        return undefined;
    }
}
