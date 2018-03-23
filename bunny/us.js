
// Create a scene which will hold all our meshes to be rendered
var scene = new THREE.Scene();

// Colour attinuation
var light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 0,0,10 );
scene.add( light );

// Create and position a camera
var camera = new THREE.PerspectiveCamera(
	60,                                   // Field of view
	window.innerWidth / window.innerHeight, // Aspect ratio
	0.1,                                  // Near clipping pane
	1000                                  // Far clipping pane
);

// Reposition the camera
camera.position.set(5, 5, 0);

// Point the camera at a given coordinate
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Create a renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });

// Size should be the same as the window
renderer.setSize(window.innerWidth, window.innerHeight);

// Set a near white clear color (default is black)
renderer.setClearColor(0xfff6e6);

// Append to the document
document.body.appendChild(renderer.domElement);

// A mesh is created from the geometry and material, then added to the scene
var plane = new THREE.Mesh(
	new THREE.PlaneGeometry(5, 5, 5, 5),
	new THREE.MeshBasicMaterial({ color: 0x393839, wireframe: true })
);

var loader = new THREE.OBJLoader();
var bunny;


// load a resource
loader.load(
	// resource URL
	'model/model.obj',
	// called when resource is loaded
	function (object) {
		bunny = object;
		//    var MTLLoader = require('three-mtl-loader');
		var mtlLoader = new MTLLoader();
		mtlLoader.setBaseUrl('/model/');
		mtlLoader.load('/model/materials.mtl', function (matl) {
			bunny.material	 = matl;
		});
		bunny.translateZ(1);
		bunny.translateY(1);
		bunny.scale = new THREE.Vector3(10,10,10);
		scene.add(bunny);

	},
	// called when loading is in progresses
	function (xhr) {

		console.log((xhr.loaded / xhr.total * 100) + '% loaded');

	},
	// called when loading has errors
	function (error) {

		console.log('An error happened');

	}
);

plane.rotateX(Math.PI / 2);
scene.add(plane);

// Render the scene/camera combination
renderer.render(scene, camera);

// Add an orbit control which allows us to move around the scene. See the three.js example for more details
// https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', function () { renderer.render(scene, camera); }); // add this only if there is no animation loop (requestAnimationFrame)

var bunnyJumpDirection = 1;
var bunnyDirection = 1;
var slowFactor = 3;
var animate = function () {
	requestAnimationFrame(animate);
	if (!!bunny) {
		bunny.position.y += 0.1 * bunnyJumpDirection / slowFactor;
		bunny.position.z += 0.05 * bunnyDirection / slowFactor;
		if(bunny.position.z > 5) {
			bunnyDirection = -1;
			bunny.rotateY(bunnyDirection * Math.PI);
		} else if(bunny.position.z <= -5) {
			bunnyDirection = 1;
			bunny.rotateY(bunnyDirection * Math.PI);
		}


		if (bunny.position.y > 2) {
			bunnyJumpDirection = -1;
		} else if (bunny.position.y <= 0) {
			bunnyJumpDirection = 1;
		}
		renderer.render(scene, camera);
	}

};

animate();
