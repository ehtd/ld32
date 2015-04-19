var VERSION = "v. 1.0.0";

var CONSTANT_STATES = {
    GAME:'GameState',
    BOOT:'BootState',
    PRELOAD:'PreloadState',
    DEFEAT:'DefeatState',
    START:'StartState',
    VICTORY:'VictoryState'
};

versioning = function(game){
    var style = { font: "14px Arial", fill: "#FFFFFF", align: "center" };
    var text = game.add.text(800-50, 600-20, VERSION, style);
    text.fixedToCamera = true;
}