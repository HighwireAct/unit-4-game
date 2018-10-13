// Constants for game states
const CHAR_SELECT = 0;
const ENEMY_SELECT = 1;
const BATTLE = 2;
const ENDGAME = 3;

// Constants for player states
const UNSELECTED = 0;
const PLAYER = 1;
const UNSELECTED_ENEMY = 2;
const DEFENDER = 3;

// Game object - controls the game's state
let game = {
    state: CHAR_SELECT
};

// NAME: Character Creator; QUIRK: Constructs character objects!
function Character(name, id, image, attackPoints, attackGain, counterPoints, hpMax) {
    this.name = name;
    this.id = id;
    this.image = image;
    this.attackPoints = attackPoints;
    this.attackGain = attackGain;
    this.counterPoints = counterPoints;
    this.hpMax = hpMax;
    this.hpCurrent = hpMax;
    this.state = UNSELECTED;
}

// NAME: Draw Character; QUIRK: Draws a character on the screen!
function drawCharacter(character) {
    let characterDiv = $("<div>");
    let characterImg = $("<img>");
    characterDiv.addClass("character");
    characterDiv.attr("id", character.id);
    characterImg.attr("src", imgPathFormatter(character.image));
    $("body").append(characterDiv);
    $(characterDiv).append(characterImg);
}

// NAME: Image Path Formatter; QUIRK: Formats image paths for me!
function imgPathFormatter(string) {
    return `assets/images/${string}.png`;
}

let unselected = []; // Unselected character array
let unselectedEnemies = []; // Unselected character array
let player = null; // Player array
let defender = null; // Defender array

let deku = new Character("Deku", 0, "deku", 10, 12, 20, 120);
let bakugou = new Character("Bakugou", 1, "bakugou", 20, 7, 30, 110);
let ochako = new Character("Ochako", 2, "ochako", 15, 10, 20, 110);
let iida = new Character("Iida", 3, "iida", 15, 6, 20, 150);
let froppy = new Character("Froppy", 4, "froppy", 15, 7, 30, 90);

console.log(deku);
drawCharacter(deku);