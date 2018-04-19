function StartWindow() {
    this.active = true;
    this.text = "Click Click, start play";
    this.init();
}

StartWindow.prototype = Object.create(WindowField.prototype); // WindowField inheritance
StartWindow.prototype.constructor = WindowField; // WindowField constructor

StartWindow.prototype.init = function() {
    WindowField.prototype.init.apply(this);
    // write function
}
