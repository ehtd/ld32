var VERSION = "v. 0.1.0";

var CONSTANT_STATES = {
    GAME:'GameState',
    BOOT:'BootState',
    PRELOAD:'PreloadState'
};

versioning = function(game){
    var style = { font: "14px Arial", fill: "#FFFFFF", align: "center" };
    var text = game.add.text(800-50, 600-20, VERSION, style);
    text.fixedToCamera = true;
}