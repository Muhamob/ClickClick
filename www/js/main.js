window.addEventListener('load', init, false);

var game;

function init() {
	var unlimitedGame = new Scene(4, 4);
	game = new Game();
	game.activeWindow = unlimitedGame;
	document.addEventListener('mousemove', mouseMove);
	document.addEventListener('mousedown', mouseDown);
	animate();
}

function animate() {
	requestAnimationFrame(animate);
	game.activeWindow.render();
}

function mouseMove(event) {
	game.activeWindow.mouse.x = (event.clientX / game.activeWindow.window.innerWidth) * 2 - 1;
	game.activeWindow.mouse.y = -(event.clientY / game.activeWindow.window.innerHeight) * 2 + 1;
}

function mouseDown(event) {
	var raycaster = new THREE.Raycaster();
	raycaster.setFromCamera(game.activeWindow.mouse, game.activeWindow.camera);
	var intersections = raycaster.intersectObjects(game.activeWindow.getAllMeshes());
	//game.activeWindow.mouseDown();
	console.log(game.activeWindow.getActorByMesh(intersections[0].object));
}
