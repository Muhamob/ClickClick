function Grid(height, width) {
    this.height = height;
    this.width = width;
    this.openedCells = Array();
    this.cells = Array();
    this.staticGlows = Array();
}

Grid.prototype.init = function() {
    var dx = 20;
	var dz = 20;
	var x = 0;
	var y = 0;
	var z = 0;

	for (var i = 0; i < this.height; i++) {
		for (var j = 0; j < this.width; j++) {
			var randomValue = Math.round(Math.random() * 9 + 1);

            var cell = new Cell(randomValue, x, y, z);
            cell.init();

            //camera.position.x = x / 2;
			this.setCell(cell);
            //console.log(cell);
			x += dx;
		}
		z -= dz;
		x = 0;
	}

}

Grid.prototype.getStaticGlows = function(){
    return this.staticGlows;
}

Grid.prototype.getCells = function(){
    return this.cells;
}

Grid.prototype.getOpenedCells = function(){
    return this.openedCells;
}

Grid.prototype.setStaticGlow = function(mesh){
    this.staticGlows.push(mesh);
}

Grid.prototype.setStaticGlows = function(staticGlows) {
    this.staticGlows = staticGlows;
}

Grid.prototype.setOpenedCells = function(openedCells) {
    this.openedCells = openedCells;
}

Grid.prototype.setCell = function(mesh){
    this.cells.push(mesh);
}

Grid.prototype.setOpenedCell = function(mesh){
    this.openedCells.push(mesh);
}

Grid.prototype.getStaticGlow = function(index){
    return this.staticGlows[index];
}

Grid.prototype.getCell = function(index){
    return this.cells[index];
}

Grid.prototype.getOpenedCell = function(index){
    return this.openedCells[index];
}

Grid.prototype.getCellByUniqueIDOfMesh = function(uuid) {
    for (var i=0; i < this.cells.length; i++) {
        if (this.cells[i].mesh.uuid == uuid) {
            return this.cells[i];
        } else {
            continue;
        }
    }
    return 0;
}

Grid.prototype.getCellMeshes = function() {
    cellMeshes = Array();
    for(var i=0; i<this.cells.length; i++) {
        cellMeshes.push(this.cells[i].mesh);
    }
    return cellMeshes;
}
