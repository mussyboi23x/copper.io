			//Start physijs 
			Physijs.scripts.worker = 'js/physijs_worker.js';
			Physijs.scripts.ammo = 'ammo.js';
			var camera, scene, renderer;
			var controls;
			var Main = this;
			var objects = [];
			var blocker = document.getElementById('blocker');
			var instructions = document.getElementById('instructions');
			var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
			var controlsEnabled = false;
			var moveForward = false;
			var moveBackward = false;
			var moveLeft = false;
			var moveRight = false;
			var moveup = false;
			var movedown = false;
			var Interact = false;
			var raycaster = THREE.Raycaster();
			var prevTime = performance.now();
			var velocity = new THREE.Vector3();
			var loaderJson = new THREE.JSONLoader();
			var loaderTexture = new THREE.TextureLoader();
			var millcouter = 0;
			if (havePointerLock) {

				var element = document.body;

				var pointerlockchange = function(event) {

					if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {

						controlsEnabled = true;
						Index.player.enabled = true;

						blocker.style.display = 'none';

					}
					else {

						Index.player.enabled = false;

						blocker.style.display = '-webkit-box';
						blocker.style.display = '-moz-box';
						blocker.style.display = 'box';

						instructions.style.display = '';

					}

				};

				var pointerlockerror = function(event) {

					instructions.style.display = '';

				};

				// Hook pointer lock state change events
				document.addEventListener('pointerlockchange', pointerlockchange, false);
				document.addEventListener('mozpointerlockchange', pointerlockchange, false);
				document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

				document.addEventListener('pointerlockerror', pointerlockerror, false);
				document.addEventListener('mozpointerlockerror', pointerlockerror, false);
				document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

				instructions.addEventListener('click', function(event) {

					instructions.style.display = 'none';

					// Ask the browser to lock the pointer
					element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

					if (/Firefox/i.test(navigator.userAgent)) {

						var fullscreenchange = function(event) {

							if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {

								document.removeEventListener('fullscreenchange', fullscreenchange);
								document.removeEventListener('mozfullscreenchange', fullscreenchange);

								element.requestPointerLock();
							}

						};

						document.addEventListener('fullscreenchange', fullscreenchange, false);
						document.addEventListener('mozfullscreenchange', fullscreenchange, false);

						element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

						element.requestFullscreen();

					}
					else {

						element.requestPointerLock();

					}

				}, false);

			}
			else {

				instructions.innerHTML = "Oops! Incompatable browser. Try chrome or firefox?";

			}
			init();

			function init() {

				camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .001, 1000);
				scene = new Physijs.Scene({
					fixedTimeStep: .01
				});
				
				//var gravity = new THREE.Vector3(0, 0, 0);
				//scene.setGravity(gravity);

				scene.addEventListener("update", function() {
					scene.simulate(undefined, 1);
				});

				var onKeyDown = function(event) {

					switch (event.keyCode) {

						case 87: // w
							moveForward = true;
							break;
						case 65: // a
							moveLeft = true;
							break;
						case 83: // s
							moveBackward = true;
							break;
						case 68: // d
							moveRight = true;
							break;

						case 32: // space
							//Jump = true;
							moveup = true;
							break;
						case 16: //shift
							movedown = true;
							break;
						case 70:
							Interact = true;
							break;
					}

				};

				var onKeyUp = function(event) {

					switch (event.keyCode) {

						case 38: // up
						case 87: // w
							moveForward = false;
							break;

						case 37: // left
						case 65: // a
							moveLeft = false;
							break;

						case 40: // down
						case 83: // s
							moveBackward = false;
							break;

						case 39: // right
						case 68: // d
							moveRight = false;
							break;
						case 32: // space
							//Jump == false;
							moveup = false;
							break;
						case 16: //shift
							movedown = false;
							break;
						case 70: //F
							Interact = false;
							break;

					}

				};
				document.addEventListener('keydown', onKeyDown, false);
				document.addEventListener('keyup', onKeyUp, false);


				renderer = new THREE.WebGLRenderer();
				renderer.setClearColor(0xffffff);
				renderer.setPixelRatio(window.devicePixelRatio);
				renderer.setSize(window.innerWidth, window.innerHeight);
				document.body.appendChild(renderer.domElement);
				window.addEventListener('resize', onWindowResize, false);
				//animation trigger!
				scene.simulate();
				animate();
			}


			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize(window.innerWidth, window.innerHeight);


			}

			/**
			 * runs when world changes and anamation is needed
			 */
			function animate() {
				//setInterval(animate(), 1000);
				if (controlsEnabled) {
					var time = performance.now();
					var delta = (time - prevTime) / 1000;
					var Multiplyer = 15;
					// velocity.x -= velocity.x * Multiplyer * delta;
					// velocity.z -= velocity.z * Multiplyer * delta;
					velocity.y -= velocity.y * Multiplyer * delta;
					if (moveup) velocity.y += Multiplyer * delta;
					if (movedown) velocity.y -= Multiplyer * delta;
					player.model().__dirtyPosition = true;
					player.model().__dirtyRotation = true;
					player.model().translateY(velocity.y * delta);
					if (moveForward) {
						var direction = camera.getWorldDirection();
						direction.y = 0;
						Index.player.model().position.add(direction.multiplyScalar(.1)); //the .1 is essentally the speed of movement 
					}
					prevTime = time;
					//The following code SHOULD be moved to the player class
					var selected = getPointedObject(camera);
					if (selected != undefined) {
						
					}
					//Index.gravitypoint.update();
				}

				renderer.render(scene, camera);
				//EXPERIMENTAL!!! replace with accual animation request code.
				setTimeout(function() {
					animate();
				}, 20);
			}
			//gets vertex the players camera is pointed at
			function getPointedObject(camera) {
				var raycaster = new THREE.Raycaster();
				raycaster.setFromCamera(new THREE.Vector2(Index.player.MouseX, Index.player.MouseY), camera);
				var intersects = raycaster.intersectObjects(scene.children); //replace with rangebox
				if (intersects.length > 0) {
					return intersects[0];
				}
			}
			