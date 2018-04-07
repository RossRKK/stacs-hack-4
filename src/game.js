const GRID_SIZE = 60;

$(function () {
  RenderEngine.init();
  Game.init();
  Events.init();
});

var Game = function () {
  //the character the player is playing as
  let character;

  let name;

  grass = new GridCell("green", "textures/grass2.png", true, false);
  water = new GridCell("green", "textures/water.png", false, true);
  tower = new GridCell("green", "textures/tower.png", true, false);
  tree = new GridCell("#68a2ff", "textures/tree.png", true, false);
  upsideDownMask = new MaskCell("#68a2ff", false, false, "UDM");

  let level = {
    background: "#68a2ff",
    grid: [[upsideDownMask, null, null, tower, tower, tower, grass],
           [null, null, null, null, null, null, grass],
           [null, null, null, null, null, null, grass],
           [null, null, null, null, null, grass, grass],
           [null, null, null, null, tree, grass, grass],
           [null, null, null, null, null, grass, grass],
           [null, null, null, null, null, null, grass],
           [null, null, null, null, null, null, grass],
           [null, null, null, null, null, null, grass],
           [null, null, null, null, null, null, water],
           [null, null, null, null, null, null, water],
           [null, null, null, null, null, null, water],
           [null, null, null, null, null, null, water]]
  }

  let adjectives = [
      "Authority",
      "Honesty",
      "Integrity",
      "Truth",
      "Lawfulness",
      "Fairness",
      "Reasonableness",
      "Legality",
      "Equality",
      "Impartiality",
      "Rectitude"
  ];

  let nouns = [
      "Club",
      "Company",
      "Group",
      "Organisation",
      "Society",
      "Association",
      "Federation",
      "Alliance",
      "Guild",
      "Mob",
      "Consortium",
      "Confederation",
      "Coalition",
      "Crew",
      "Creed"
  ];

  //generate the name of the game
  function genName() {
    return adjectives[Math.floor(Math.random()*adjectives.length)] + " " + nouns[Math.floor(Math.random()*nouns.length)];
  }

  //initialise the game
  function init() {
    name = genName();

    $("title").html(name);
    $("#title").text(name);

    character = new Character();

    update();
    renderGame();
  }

  //render the game
  function renderGame() {
      RenderEngine.render(character, level);
      window.requestAnimationFrame(renderGame);
  }

  function isAlive() {
      if (character.hp <= 0) {
          return false;
      } else {
          return true;
      }
  }

  function hasEnded() {
      return false;
  }

  function switchMask(level, character) {
      tile = getTile(level, character.position.x, character.position.y);

      if (tile) {
          switch (tile.mask) {
              case "UDM":
                tile.setMask(character.mask);
                return new upsideDownMan(character);
            default:
                return character;
          }
      } else {
          return character;
      }
  }

  //update the state of the game
  function update() {
      let keyTracker = Events.getKeyTracker();
      character.updatePosition(keyTracker, level);
      character.move(level);
      character = switchMask(level, character);

      // RenderEngine.render(character, level);

      if (isAlive() && !hasEnded()) {
          setTimeout(update, 10);
      } else {
        location.reload();
      }
  }



  return {
    init: init
  }
}();
