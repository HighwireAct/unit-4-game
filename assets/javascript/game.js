// --------------
// INITIALIZATION
// --------------

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
    state: CHAR_SELECT,
    changeState: function(state) {
        game.state = state;
    }
};

// NAME: Character Creator; QUIRK: Constructs character objects!
function Character(name, id, image, attackPoints, counterPoints, hpMax) {
    // Properties
    this.name = name;
    this.id = id;
    this.image = image;
    this.attackPoints = attackPoints;
    this.counterPoints = counterPoints;
    this.hpMax = hpMax;
    this.hpCurrent = hpMax;
    this.state = UNSELECTED;
    this.hpString = `HP ${this.hpCurrent} / ${this.hpMax}`;
    this.visible = true;

    // Methods
    this.attack = function(target) {
        target.hpCurrent -= this.attackPoints;
        this.attackPoints += this.attackPoints;
        target.update();
    };
    // Add object div to DOM
    this.create = function() {
        let characterDiv = $("<div>");
        let characterImg = $("<img>");
        let characterName = $("<h1>");
        let characterHp = $("<h2>");

        characterDiv.addClass("character");
        characterDiv.addClass("selectable");
        characterDiv.attr("id", this.id);
        characterImg.attr("src", imgPathFormatter(this.image));
        characterName.text(this.name);
        characterHp.text(this.hpString);

        $("#game-area").append(characterDiv);
        $(characterDiv).append(characterImg);
        $(characterDiv).append(characterName);
        $(characterDiv).append(characterHp);
    }
    // Updates HP
    this.update = function() {
        this.hpCurrent = Math.max(0, this.hpCurrent); // Keep HP from going into negative
        this.hpString = `HP ${this.hpCurrent} / ${this.hpMax}`;
        $(`#${this.id}`).find("h2").text(this.hpString);
    }
    // Toggle character visibility
    this.toggleVisible = function() {
        this.visible = !(this.visible);
        if (this.visible) { $(`#${this.id}`).css("display", "inline-block"); }
        else { $(`#${this.id}`).css("display", "none"); }
    }
    this.changeState = function (state) {
        this.state = state;
    }
}

// NAME: Image Path Formatter; QUIRK: Formats image paths for me!
function imgPathFormatter(string) {
    return `assets/images/${string}.png`;
}

function searchForId(array, id) {
    for (i = 0; i < array.length; i++) {
        if (array[i].id === id)  { return array[i]; }
    }
}

// ------------
// GAME LOGIC
// ------------

// Create character objects
let deku = new Character("Deku", 0, "deku", 10, 20, 120);
let bakugou = new Character("Bakugou", 1, "bakugou", 20, 30, 110);
let ochako = new Character("Ochako", 2, "ochako", 15, 20, 110);
let iida = new Character("Iida", 3, "iida", 15, 20, 150);
let froppy = new Character("Froppy", 4, "froppy", 15, 30, 90);

// Create arrays to hold characters
let roster = [deku, bakugou, ochako, iida, froppy]; // Base character roster
let unselectedPlayers = roster;
let unselectedEnemies = null; // Unselected enemy array
let player = null; // Player array
let defender = null; // Defender array

$("#game-area").prepend("<h1>CHOOSE YOUR FIGHTER</h1>");

// Put characters on page at beginning
for (i = 0; i < roster.length; i++) {
    roster[i].create();
}

// Callback function for clicking on characters in different contexts
$(".character").on("click", function() {
    let elementId = +$(this).attr("id");
    console.log(elementId);
    if (game.state === CHAR_SELECT) {
        player = searchForId(unselectedPlayers, elementId);
        player.toggleVisible();
        player.changeState(PLAYER);

        unselectedPlayers.splice(unselectedPlayers.indexOf(player), 1); // Remove player from selectable list
        unselectedEnemies = unselectedPlayers;

        console.log(player);
        console.log(unselectedEnemies);
        game.changeState(ENEMY_SELECT);
    } else if (game.state === ENEMY_SELECT) {
        defender = searchForId(unselectedEnemies, elementId);
        defender.changeState(DEFENDER);

        unselectedEnemies.splice(unselectedEnemies.indexOf(defender), 1);

        console.log(defender);
        console.log(unselectedEnemies);

        game.changeState(BATTLE);
    }
});

// STATE: CHAR_SELECT
/**
 * INTERACTION: In this state, the player is able to select one of the characters
 * from the roster to play as. The selected character will be bound
 * to the "player" variable and spliced off the "roster" array, while
 * the remaining roster array will be bound to the unselectedEnemies variable
 * 
 * DRAWING: All players are contained within game-area div. First,
 * the heading is drawn, and then the character objects
 */

 // STATE: ENEMY_SELECT
 /**
  * INTERACTION: The player can now choose from the
  */