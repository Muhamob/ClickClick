function WindowField() {
    this.window;
    this.mouse;
    this.scene;
    this.camera;
    this.renderer;
    this.listener;
    this.light;
    this.actors;
    this.init();
}

WindowField.prototype.init = function() {
    this.mouse = new THREE.Vector2();
    this.window = window;
    this.actors = new Array();
    this.scene = new THREE.Scene();
    this.addRenderer();
    this.addCamera();
    this.addListener();
    this.addLight();
    this.addFog();

    var container = document.getElementById('field');
    container.insertBefore(this.renderer.domElement, null);
}

WindowField.prototype.getActorByMesh = function(mesh) {
    for (actor of this.actors) {
        console.log(mesh.uuid);
        if (actor.mesh.uuid == mesh.uuid) {
            return actor;
        }
    }
    return undefined;
}

WindowField.prototype.getAllMeshes = function() {
    var meshes = new Array();
    for (mesh of this.scene.children) {
        if (mesh.type == "Mesh") {
            meshes.push(mesh);
        }
    }
    return meshes;
}

WindowField.prototype.resizeWindow = function() {
	this.renderer.setSize(this.window.innerWidth, this.window.innerHeight);
	this.camera.aspect = this.window.innerWidth / this.window.innerHeight;
	this.camera.updateProjectionMatrix();
}

WindowField.prototype.render = function() {
    this.renderer.render(this.scene, this.camera);
}

WindowField.prototype.addLight = function() {
    this.light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
	this.light.position.set(0, 100, 0);
	this.light.castShadow = true;

    this.scene.add(this.light);
}

WindowField.prototype.addListener = function() {
    this.listener = new THREE.AudioListener();
	this.camera.add(this.listener);
}

WindowField.prototype.addCamera = function() {
    this.camera = new THREE.PerspectiveCamera(75, this.window.innerWidth / this.window.innerHeight, 1, 100);
    this.camera.rotation.x = -1;
    this.camera.position.z = 10;
    this.camera.position.y = 55;
    this.camera.position.x = 30;

    this.scene.add(this.camera);
}

WindowField.prototype.addFog = function() {
    this.scene.fog = new THREE.Fog(0xffffff, 0.003, 250);
}

WindowField.prototype.addRenderer = function() {
    this.renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});
	this.renderer.setSize(this.window.innerWidth, this.window.innerHeight);
}
