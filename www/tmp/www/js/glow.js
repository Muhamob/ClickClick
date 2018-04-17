function Glow(x, y, z) {
    this.mesh;
    this.position = {
      x: x,
      y: y,
      z: z,
    };
}

Glow.prototype.getMesh = function() {
    this.mesh = new THREE.Mesh(new THREE.CircleGeometry(10, 32), new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('./img/glow.png'),
    }));
    this.mesh.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    this.mesh.position.set(x, y, z);

}

Glow.prototype.getMesh = function(){
    return this.mesh;
}

Glow.prototype.setMesh = function(mesh){
    this.mesh = mesh;
}

Glow.prototype.setPosition = function(x, y, z) {
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
}
