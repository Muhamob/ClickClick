function Cell(type, x, y, z) {
    this.type = type;
    this.mesh;
    this.position = {
      x: x,
      y: y,
      z: z,
    };
    this.init();
}

Cell.prototype.init = function() {
    var texloader = new THREE.TextureLoader();
    var tex=texloader.load("./img/chip.png");
    var materialTop = new THREE.MeshLambertMaterial({
        map: tex,
    });
    var materialSide = new THREE.MeshPhongMaterial({
        //wireframe: true,
        color: 0xffff00
    });

    var dynamicTexture = new THREEx.DynamicTexture(512, 512);
    dynamicTexture.context.font = 'bolder 200px Verdana';

    var materialBottom = new THREE.MeshBasicMaterial({
        map: dynamicTexture.texture,
        color: 0xffffff
    });

    dynamicTexture.drawText(this.type, undefined, 325, 'white');


    var materialsArray = [];
    materialsArray.push(materialSide);
    materialsArray.push(materialTop);
    materialsArray.push(materialBottom);
    this.mesh = new THREE.Mesh(new THREE.CylinderGeometry(8, 8, 2, 32, 1, false), new THREE.MeshFaceMaterial(materialsArray));

    this.mesh.geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.mesh.name = this.type;
    this.mesh.uniqueID = String(Math.random());
}

Cell.prototype.getType = function(){
    //return this.mesh.name;
    return this.type;
}

Cell.prototype.setType = function(type){
    this.type = type;
}

Cell.prototype.getMesh = function(){
    return this.mesh;
}

Cell.prototype.setMesh = function(mesh){
    this.mesh = mesh;
}

Cell.prototype.setPosition = function(x, y, z) {
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
}
