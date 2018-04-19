function Scene(heightNum, widthNum) {
    this.widthNum;
    this.heightNum;
    this.grid;
    this.active = false;
    this.init(heightNum, widthNum);
}

Scene.prototype = Object.create(WindowField.prototype); // WindowField inheritance
Scene.prototype.constructor = WindowField; // WindowField constructor

Scene.prototype.init = function(heightNum, widthNum) {
    WindowField.prototype.init.apply(this);
    this.widthNum = widthNum;
    this.heightNum = heightNum;
    this.addGrid();
    this.pushActors(this.grid.getCells());
}

Scene.prototype.pushActors = function(actors) {
    for (actor of actors) {
        this.actors.push(actor);
    }
}

Scene.prototype.addGrid = function(){
    this.grid = new Grid(this.heightNum, this.widthNum);
    var dx = this.grid.dx;
    for(var i = 0; i < this.grid.getCells().length; i++) {
        this.scene.add(this.grid.getCell(i).getMesh());
    }
    this.camera.position.x = dx * (this.widthNum - 1) / 2;
