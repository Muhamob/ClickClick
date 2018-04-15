window.addEventListener('load', init, false);

//game
var status = 'waiting';
var random_value_0;
var random_value_1;

//scene
var scene;
var camera;
var renderer;
var listener;

//sound
var up_sound;
var down_sound;
var background_sound;
var close_sound;
var open_sound;
var click_sound;

//sound loader
var down_audio_loader;
var up_audio_loader;
var close_audio_loader;
var open_audio_loader;
var click_audio_loader;
var background_audio_loader;

//meshes
var opened_cells = Array();
var cells = Array();
var static_glows = Array();
var dynamic_glow;

//raycasting
var mouse = new THREE.Vector2();

function init() {
	addScene();
	addCell();

	animate();

	document.addEventListener('mousedown', mouseDown);
	document.addEventListener('mousemove', mouseMove);
	window.addEventListener('resize', resizeWindow);
}

function addScene() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);

	//sound
	listener = new THREE.AudioListener();
	camera.add(listener);

	up_sound = new THREE.Audio(listener);
	down_sound = new THREE.Audio(listener);
	open_sound = new THREE.Audio(listener);
	close_sound = new THREE.Audio(listener);
	click_sound = new THREE.Audio(listener);
	background_sound = new THREE.Audio(listener);

	up_audio_loader = new THREE.AudioLoader();
	up_audio_loader.load('sounds/up.mp3', function(buffer) {
		up_sound.setBuffer(buffer);
		up_sound.setVolume(0.3);
	});

	down_audio_loader = new THREE.AudioLoader();
	down_audio_loader.load('sounds/down.mp3', function(buffer) {
		down_sound.setBuffer(buffer);
		down_sound.setVolume(0.3);
	});

	background_audio_loader = new THREE.AudioLoader();
	background_audio_loader.load('sounds/background.mp3', function(buffer) {
		background_sound.setBuffer(buffer);
		background_sound.setLoop(true);
		background_sound.setVolume(0.5);
		background_sound.play();
	});

	open_audio_loader = new THREE.AudioLoader();
	open_audio_loader.load('sounds/open.mp3', function(buffer) {
		open_sound.setBuffer(buffer);
		open_sound.setVolume(0.3);
	});

	close_audio_loader = new THREE.AudioLoader();
	close_audio_loader.load('sounds/close.mp3', function(buffer) {
		close_sound.setBuffer(buffer);
		close_sound.setVolume(0.3);
	});

	click_audio_loader = new THREE.AudioLoader();
	click_audio_loader.load('sounds/click.mp3', function(buffer) {
		click_sound.setBuffer(buffer);
		click_sound.setVolume(0.3);
	});


	light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
	light.position.set(0, 100, 0);
	light.castShadow = true;

	camera.rotation.x = -1;
	camera.position.z = 10;
	camera.position.y = 55;
	camera.position.x = 30;

	var container = document.getElementById('field');
	container.insertBefore(renderer.domElement, null);

	scene.add(camera);
	scene.add(light);
	scene.fog = new THREE.Fog(0xffffff, 0.003, 250);
}

function addCell() {
	var dx = 20;
	var dz = 20;
	var x = 0;
	var y = 0;
	var z = 0;

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var random_value = Math.round(Math.random() * 9 + 1);

			var material_top = new THREE.MeshLambertMaterial({
				map: THREE.ImageUtils.loadTexture('./img/chip.png'),
			});
			var material_side = new THREE.MeshPhongMaterial({
				//wireframe: true,
				color: 0xffff00
			});

			var dynamic_texture = new THREEx.DynamicTexture(512, 512)
			dynamic_texture.context.font = 'bolder 200px Verdana';

			var material_bottom = new THREE.MeshBasicMaterial({
				map: dynamic_texture.texture,
				color: 0xffffff
			});

			dynamic_texture.drawText(random_value, undefined, 325, 'white');


			var materials_array = [];
			materials_array.push(material_side);
			materials_array.push(material_top);
			materials_array.push(material_bottom);
			var cell = new THREE.Mesh(new THREE.CylinderGeometry(8, 8, 2, 32, 1, false), new THREE.MeshFaceMaterial(materials_array));

			cell.position.set(x, y, z);
			cell.geometry.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 2));
			camera.position.x = x / 2;

			cell.name = random_value;
			console.log(cell);

			cells.push(cell);
			scene.add(cell);

			x += dx;
		}
		z -= dz;
		x = 0;
	}
}


function mouseMove(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function mouseDown(event) {
	var raycaster = new THREE.Raycaster();
	raycaster.setFromCamera(mouse, camera);

	var intersects = raycaster.intersectObjects(cells);

	if (intersects.length > 0 && opened_cells.length < 2) {
		intersected = intersects[0].object;

		if (intersected != opened_cells[0]) {
			click_sound.play();

			refreshRotation();
			status = 'waiting';

			static_glow = new THREE.Mesh(new THREE.CircleGeometry(10, 32), new THREE.MeshLambertMaterial({
				map: THREE.ImageUtils.loadTexture('./img/glow.png'),
			}));
			static_glow.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
			static_glow.position.set(intersected.position.x, intersected.position.y - 5, intersected.position.z);

			opened_cells.push(intersected);
			static_glows.push(static_glow);

			scene.add(static_glow);

			if (opened_cells.length == 2) {
				status = 'opening';
			}
		}
	}
}

function refreshRotation() {
	for (var i = 0; i < cells.length; i++) {
		cells[i].rotation.x = 0;
		cells[i].rotation.y = 0;
		cells[i].rotation.z = 0;
	}
}

function refresh() {
	refreshRotation();

	for (var i = 0; i < static_glows.length; i++) {
		scene.remove(static_glows[i]);
	}

	static_glows.length = 0;
	static_glows = new Array();

	opened_cells.length = 0;
	opened_cells = new Array();
}

function animate() {
	switch (status) {
		case 'waiting':
			break;

		case 'opening':
			if (opened_cells[0].rotation.x <= 4) {
				open_sound.play();
				opened_cells[0].rotation.x += 0.2;
				opened_cells[1].rotation.x += 0.2;
			} else {
				if (opened_cells[0].name != opened_cells[1].name) {
					status = 'closing';
					open_sound.stop();
				} else {
					light.intensity = 5;
					status = 'down';

					down_sound.play();
				}
			}
			break;

		case 'closing':
			if (opened_cells[0].rotation.x >= 0) {
				opened_cells[0].rotation.x -= 0.2;
				opened_cells[1].rotation.x -= 0.2;

				close_sound.play();
			} else {
				refresh();
				status = 'waiting';

				close_sound.stop();
			}
			break;

		case 'down':
			if (opened_cells[0].position.y <= 20) {
				opened_cells[0].position.y += 1;
				opened_cells[1].position.y += 1;
			} else {
				status = 'up';

				down_sound.stop();
				up_sound.play();
			}

			break;

		case 'up':
			if (opened_cells[0].position.y >= 0) {
				opened_cells[0].position.y -= 1;
				opened_cells[1].position.y -= 1;
			} else {
				opened_cells[0].position.y = 0;
				opened_cells[1].position.y = 0;
				
				random_value_0 = (Math.random()*10)+1|0;
				random_value_1 = (Math.random()*10)+1|0;
				
				opened_cells[0].name = random_value_0;
				opened_cells[1].name = random_value_1;

				var dynamic_texture_0 = new THREEx.DynamicTexture(512, 512)
				dynamic_texture_0.context.font = 'bolder 400px Verdana';

				opened_cells[0].material[2].map = dynamic_texture_0.texture;
				dynamic_texture_0.drawText(random_value_0, undefined, 375, 'white');

				var dynamic_texture_1 = new THREEx.DynamicTexture(512, 512)
				dynamic_texture_1.context.font = 'bolder 400px Verdana';

				opened_cells[1].material[2].map = dynamic_texture_1.texture;
				dynamic_texture_1.drawText(random_value_1, undefined, 375, 'white');

				refresh();
				status = 'waiting';
				up_sound.stop();
			}

			break;

		default:
			break;
	}

	if (light.intensity > 1) {
		light.intensity -= 0.1;
	}

	requestAnimationFrame(animate);
	render();
}

function render() {
	renderer.render(scene, camera);
}

function resizeWindow() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}