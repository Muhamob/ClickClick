function Game() {
    this.windowField;
    this.settings;
    this.activeWindow;
    this.init();
}

Game.prototype.init = function() {
    this.windowField = new WindowField();
    this.activeWindow = new StartWindow();
}

// Game.prototype.getActiveWindow = function() {
//     for (w of this.windows) {
//         if (w.active == true) {
//             this.activeWindow = w
//             return w;
//         }
//     }
// }
//
// Game.prototype.refreshActiveWindow = function() {
//     var activeWindows = new Array();
//     for (w of this.windows) {
//         if (w.active == true) { activeWindows.push(w); }
//     }
//     if (activeWindows.length != 1) {
//         console.log("THERE IS NOT THE ONLY ONE OPEND WINDOW");
//         return undefined;
//     } else {
//         return activeWindows[0];
//     }
// }
