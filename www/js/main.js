window.addEventListener('load', init, false);

var status = 'waiting';
var scene = new Scene(4, 7);
var mouse = new THREE.Vector2();
var backgroundSound;

function init() {
	scene.init()

	backgroundSound = new Sound(scene.getListener());
	backgroundSound.init(TRACKS.BACKGROUND.VOLUME,TRACKS.BACKGROUND.LOOP,TRACKS.BACKGROUND.SOURCE);
	backgroundSound.play();

	animate();

	document.addEventListener('mousedown', mouseDown);
	document.addEventListener('mousemove', mouseMove);
	window.addEventListener('resize', scene.resizeWindow());
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
			//clickSound.play();

			scene.letRefreshRotation();
			status = 'waiting';

			var glow = new Glow(intersected.position.x, intersected.position.y - 5, intersected.position.z);

			//intersectedCell = new Cell(intersected.name, intersected.position.x, intersected.position.y, intersected.position.z);
			scene.getGrid().setOpenedCell(intersectedCell);
			scene.getGrid().setGlow(glow);

			scene.addMesh(glow.getMesh());

			if (scene.getGrid().getOpenedCells().length == 2) {
				status = 'opening';
			}
		}
	}
}

function animate() {
	switch (status) {
		case 'waiting':
			break;

		case 'opening':
			if (scene.getGrid().getOpenedCell(0).getMesh().rotation.x <= 4) {
				//openSound.play();

				scene.getGrid().getOpenedCell(0).getMesh().rotation.x += 0.2;
				scene.getGrid().getOpenedCell(1).getMesh().rotation.x += 0.2;
			} else {
				if (scene.getGrid().getOpenedCell(0).getType() != scene.getGrid().getOpenedCell(1).getType()) {
					status = 'closing';

					//openSound.stop();
				} else {
					scene.getLight().intensity = 5;
					status = 'down';

					//down_sound.play();
				}
			}
			break;

		case 'closing':
			if (scene.getGrid().getOpenedCell(0).getMesh().rotation.x >= 0) {
				scene.getGrid().getOpenedCell(0).getMesh().rotation.x -= 0.2;
				scene.getGrid().getOpenedCell(1).getMesh().rotation.x -= 0.2;

				//close_sound.play();
			} else {
				scene.letRefresh();
				status = 'waiting';

				//close_sound.stop();
			}
			break;

		case 'down':
			if (scene.getGrid().getOpenedCell(0).getMesh().position.y <= 20) {
				scene.getGrid().getOpenedCell(0).getMesh().position.y += 1;
				scene.getGrid().getOpenedCell(1).getMesh().position.y += 1;
			} else {
				status = 'up';

				//down_sound.stop();
				//up_sound.play();
			}

			break;

		case 'up':
			if (scene.getGrid().getOpenedCell(0).getMesh().position.y >= 0) {
				scene.getGrid().getOpenedCell(0).getMesh().position.y -= 1;
				scene.getGrid().getOpenedCell(1).getMesh().position.y -= 1;
			} else {
				scene.getGrid().getOpenedCell(0).getMesh().position.y = 0;
				scene.getGrid().getOpenedCell(0).getMesh().position.y = 0;

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

				scene.letRefresh();
				status = 'waiting';
				// up_sound.stop();
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
