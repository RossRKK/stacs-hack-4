class GridCell {

    constructor (background, imgSrc, isSolid, mask, isKillBlock) {
    this.background = background;

    this.img = document.createElement("img");
    this.img.src = imgSrc;

    this.isSolid = isSolid;
    this.isKillBlock = isKillBlock;
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
<<<<<<< HEAD
        return level.grid[gridX][gridY];
=======
        return level.grid[gridX][gridY] ? level.grid[gridX][gridY].isSolid : false;
    } else {
        return true;
    }
}

function isHurt(level, x, y) {
  let gridX = Math.floor(x / GRID_SIZE);
    let gridY = Math.floor(y / GRID_SIZE);

    if (gridX >= 0 && gridX < level.grid.length && gridY >= 0 && gridY < level.grid[gridX].length) {
        return level.grid[gridX][gridY] ? level.grid[gridX][gridY].isKillBlock : false;
>>>>>>> ed39166e8078f7d9d8e11a7886876ea206e78487
    } else {
        return undefined;
    }
}
