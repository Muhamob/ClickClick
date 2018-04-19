function Grid(height, width) {
    this.height = height;
    this.width = width;
    this.openedCells = Array();
    this.cells = Array();
    this.glows = Array();
    this.dx = 20;
    this.dy = 20;
    this.init();
}

Grid.prototype.init = function() {
    var dx = this.dx;
	var dz = this.dy;
	var x = 0;
	var y = 0;
	var z = 0;

	for (var i = 0; i < this.height; i++) {
		for (var j = 0; j < this.width; j++) {
			var randomValue = Math.round(Math.random() * 9 + 1);

            var cell = new Cell(randomValue, x, y, z);
			this.setCell(cell);

			x += dx;
		}
		z -= dz;
		x = 0;
	}
}

// Grid.prototype.removeCell = function(cell) {
//
// }

Grid.prototype.getGlows = function(){
    return this.glows;
}

Grid.prototype.getCells = function(){
    return this.cells;
}

Grid.prototype.getOpenedCells = function(){
    return this.openedCells;
}

Grid.prototype.setGlow = function(mesh){
    this.glows.push(mesh);
}

Grid.prototype.setGlows = function(glows) {
    this.glows = glows;
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

Grid.prototype.getGlow = function(index){
    return this.glows[index];
}

Grid.prototype.getCell = function(index){
    return this.cells[index];
}

Grid.prototype.getOpenedCell = function(index){
    return this.openedCells[index];
}

Grid.prototype.getCellByUniqueIdOfMesh = function(uuid) {
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
