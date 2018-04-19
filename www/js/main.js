<<<<<<< HEAD
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
=======
window.addEventListener('load', init, false);

var status = 'wait';
var scene = new Scene(4, 7);
var mouse = new THREE.Vector2();

var upSound;
var downSound;
var openSound;
var closeSound;
var clickSound;
var backgroundSound;


function audioPlayer(listener, source, volume, loop) {
	sound = new THREE.Audio(listener);

	audioLoader = new THREE.AudioLoader();
	audioLoader.load(source, function(buffer) {
		sound.setBuffer(buffer);
		sound.setVolume(volume);
		sound.setLoop(loop);
	});
	return sound;
}


function init() {
	scene.init()

	/*
	backgroundSound = audioPlayer(scene.getListener(), 'sounds/background.mp3', 0.3, true);
	upSound = audioPlayer(scene.getListener(), 'sounds/up.mp3', 0.3, false);
	downSound = audioPlayer(scene.getListener(), 'sounds/down.mp3', 0.3, false);
	closeSound = audioPlayer(scene.getListener(), 'sounds/close.mp3', 0.3, false);
	clickSound = audioPlayer(scene.getListener(), 'sounds/click.mp3', 0.3, false);
	openSound = audioPlayer(scene.getListener(), 'sounds/open.mp3', 0.3, false);
	*/

	upSound = new THREE.Audio(scene.getListener());
	downSound = new THREE.Audio(scene.getListener());
	openSound = new THREE.Audio(scene.getListener());
	closeSound = new THREE.Audio(scene.getListener());
	clickSound = new THREE.Audio(scene.getListener());
	backgroundSound = new THREE.Audio(scene.getListener());

	upAudioLoader = new THREE.AudioLoader();
	upAudioLoader.load('sounds/up.mp3', function(buffer) {
		upSound.setBuffer(buffer);
		upSound.setVolume(0.3);
	});

	downAudioLoader = new THREE.AudioLoader();
	downAudioLoader.load('sounds/down.mp3', function(buffer) {
		downSound.setBuffer(buffer);
		downSound.setVolume(0.3);
	});

	backgroundAudioLoader = new THREE.AudioLoader();
	backgroundAudioLoader.load('sounds/background.mp3', function(buffer) {
		backgroundSound.setBuffer(buffer);
		backgroundSound.setLoop(true);
		backgroundSound.setVolume(0.3);
		backgroundSound.play();
	});

	openAudioLoader = new THREE.AudioLoader();
	openAudioLoader.load('sounds/open.mp3', function(buffer) {
		openSound.setBuffer(buffer);
		openSound.setVolume(0.3);
	});

	closeAudioLoader = new THREE.AudioLoader();
	closeAudioLoader.load('sounds/close.mp3', function(buffer) {
		closeSound.setBuffer(buffer);
		closeSound.setVolume(0.3);
	});

	clickAudioLoader = new THREE.AudioLoader();
	clickAudioLoader.load('sounds/click.mp3', function(buffer) {
		clickSound.setBuffer(buffer);
		clickSound.setVolume(0.3);
	});


	animate();

	document.addEventListener('mousedown', mouseDown);
	document.addEventListener('mousemove', mouseMove);
	window.addEventListener('resize', resizeWindow);
}

function resizeWindow(){
	scene.getRenderer().setSize(window.innerWidth, window.innerHeight);
	scene.getCamera().aspect = window.innerWidth / window.innerHeight;
	scene.getCamera().updateProjectionMatrix();
}

function mouseMove(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function mouseDown(event) {
	var raycaster = new THREE.Raycaster();
	raycaster.setFromCamera(mouse, scene.getCamera());

	var intersects = raycaster.intersectObjects(scene.getGrid().getCellMeshes());

	if (intersects.length > 0 && scene.getGrid().getOpenedCells().length < 2) {
		intersected = intersects[0].object;
		intersectedCell = scene.getGrid().getCellByUniqueIdOfMesh(intersected.uuid);

		if (intersectedCell != scene.getGrid().getOpenedCell(0)) {
			clickSound.play();

			scene.letRefreshRotation();
			status = 'shake';

			var glow = new Glow(intersected.position.x, intersected.position.y - 5, intersected.position.z);

			scene.getGrid().setOpenedCell(intersectedCell);
			scene.getGrid().setGlow(glow);

			scene.addMesh(glow.getMesh());

			if (scene.getGrid().getOpenedCells().length == 2) {
				status = 'open';
			}
		}
	}
}

function animate() {
	switch (status) {
		case 'shake':
			status = 'left';
			break;

		case 'left':
			if (scene.getGrid().getOpenedCell(0).getMesh().rotation.z <= 0.1 && scene.getGrid().getOpenedCell(0).getMesh().rotation.x <= 0.1) {
				scene.getGrid().getOpenedCell(0).getMesh().rotation.z += 0.03;
				scene.getGrid().getOpenedCell(0).getMesh().rotation.x += 0.03;
			} else {
				status = 'right';
			}
			break;

		case 'right':
			if (scene.getGrid().getOpenedCell(0).getMesh().rotation.z >= -0.1 && scene.getGrid().getOpenedCell(0).getMesh().rotation.x >= -0.1) {
				scene.getGrid().getOpenedCell(0).getMesh().rotation.z -= 0.03;
				scene.getGrid().getOpenedCell(0).getMesh().rotation.x -= 0.03;
			} else {
				status = 'left';
			}
			break;

		case 'wait':
			break;

		case 'open':
			if (scene.getGrid().getOpenedCell(0).getMesh().rotation.x <= 4) {
				openSound.play();

				scene.getGrid().getOpenedCell(0).getMesh().rotation.x += 0.2;
				scene.getGrid().getOpenedCell(1).getMesh().rotation.x += 0.2;
			} else {
				if (scene.getGrid().getOpenedCell(0).getType() != scene.getGrid().getOpenedCell(1).getType()) {
					status = 'close';

					openSound.stop();
				} else {
					scene.getLight().intensity = 5;
					status = 'down';

					downSound.play();
				}
			}
			break;

		case 'close':
			if (scene.getGrid().getOpenedCell(0).getMesh().rotation.x >= 0) {
				scene.getGrid().getOpenedCell(0).getMesh().rotation.x -= 0.2;
				scene.getGrid().getOpenedCell(1).getMesh().rotation.x -= 0.2;

				closeSound.play();
			} else {
				scene.letRefresh();
				status = 'wait';

				closeSound.stop();
			}
			break;

		case 'down':
			if (scene.getGrid().getOpenedCell(0).getMesh().position.y <= 20) {
				scene.getGrid().getOpenedCell(0).getMesh().position.y += 1;
				scene.getGrid().getOpenedCell(1).getMesh().position.y += 1;
			} else {
				status = 'up';

				downSound.stop();
				upSound.play();
			}

			break;

		case 'up':
			if (scene.getGrid().getOpenedCell(0).getMesh().position.y >= 0) {
				scene.getGrid().getOpenedCell(0).getMesh().position.y -= 1;
				scene.getGrid().getOpenedCell(1).getMesh().position.y -= 1;
			} else {
				scene.getGrid().getOpenedCell(0).getMesh().position.y = 0;
				scene.getGrid().getOpenedCell(0).getMesh().position.y = 0;

				/*
				randomValue0 = (Math.random()*10)+1|0;
				randomValue1 = (Math.random()*10)+1|0;

				scene.getGrid().getOpenedCell(0).setType(randomValue0);
				scene.getGrid().getOpenedCell(1).setType(randomValue1);

				var dynamicTexture0 = new THREEx.DynamicTexture(512, 512)
				dynamicTexture0.context.font = 'bolder 200px Verdana';

				scene.getGrid().getOpenedCell(0).getMesh().material[2].map = dynamicTexture0.texture;
				dynamicTexture0.drawText(randomValue0, undefined, 325, 'white');

				var dynamicTexture1 = new THREEx.DynamicTexture(512, 512)
				dynamicTexture1.context.font = 'bolder 200px Verdana';

				scene.getGrid().getOpenedCell(1).getMesh().material[2].map = dynamicTexture1.texture;
				dynamicTexture1.drawText(randomValue1, undefined, 325, 'white');
				*/

				scene.letRefresh();
				status = 'wait';

				upSound.stop();
			}

			break;

		default:
			break;
	}

	if (scene.getLight().intensity > 1) {
		scene.getLight().intensity -= 0.1;
	}

	requestAnimationFrame(animate);
	scene.render();
}
>>>>>>> 4a6da7fd55ba298eb8dba9545568de5db70df53a
