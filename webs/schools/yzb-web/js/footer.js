const caseImage = [
  '/images/banner1.jpg',
  '/images/banner2.jpg',
  '/images/banner3.jpg',
  '/images/banner4.jpg',
  '/images/banner5.jpg',
  '/images/banner6.jpg',
  '/images/banner7.jpg',
  '/images/banner1.jpg',
  '/images/banner2.jpg',
  '/images/banner3.jpg',
  '/images/banner4.jpg',
  '/images/banner5.jpg',
  '/images/banner6.jpg',
  '/images/banner7.jpg',
  '/images/banner1.jpg',
  '/images/banner2.jpg',
  '/images/banner3.jpg',
  '/images/banner4.jpg',
  '/images/banner5.jpg',
  '/images/banner6.jpg',
  '/images/banner7.jpg',
]

function footerScroll() {
  if ($(document).height() - $(document).scrollTop() <= window.innerHeight + window.innerHeight / 2) {
    let scroll_bottom = $(document).height() - $(document).scrollTop() - window.innerHeight
    let half_height = window.innerHeight / 2
    $('.footer-content').css({
      opacity: Math.floor((half_height - scroll_bottom) / half_height * 100) / 100,
      transform: 'translateY(-' + Math.floor((half_height - scroll_bottom) / half_height * 100) / 3 + 'px)'
    })
  }
}

window.addEventListener('scroll', footerScroll);

window.onload = function () {
  footerScroll()
  
  var scene = new THREE.Scene();
  /**
  * Camera
  **/
  // Specify the portion of the scene visiable at any time (in degrees)
  var fieldOfView = 75;
  // Specify the camera's aspect ratio
  var aspectRatio = window.innerWidth / window.innerHeight;
  // Specify the near and far clipping planes. Only objects
  // between those planes will be rendered in the scene
  // (these values help control the number of items rendered
  // at any given time)
  var nearPlane = 0.1;
  var farPlane = 1000;
  // Use the values specified above to create a camera
  var camera = new THREE.PerspectiveCamera(
    fieldOfView, aspectRatio, nearPlane, farPlane
  );

  // Finally, set the camera's position in the z-dimension
  camera.position.z = 0;
  camera.position.x = 0;

  /**
  * Renderer
  **/

  // Create the canvas with a renderer
  var renderer = new THREE.WebGLRenderer({ antialias: true });

  // Specify the size of the canvas
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Add the canvas to the DOM
  document.getElementById("bg").appendChild(renderer.domElement);

  /**
  * Image
  **/

  // Create a texture loader so we can load our image file
  let imageArr = []
  let i = - 25;

  let coordinate = [[-1, -1], [1, -1], [-1.5, 0], [1, 1], [-1, 1], [1.5, 0]];
  let start_index = 0
  for (var index = 0; index < 18; index++) {
    var loader = new THREE.TextureLoader().load(caseImage[index], (tex) => {
      tex.needsUpdate = true;
    });
    i += 1.2
    if (start_index == 6) {
      start_index = 0
    }
    // Load an image file into a custom material
    var material = new THREE.MeshLambertMaterial({
      map: loader,
      // transparent: true,
      // opacity:0.2
    });

    // create a plane geometry for the image with a width of 10
    // and a height that preserves the image's aspect ratio
    var geometry = new THREE.PlaneGeometry(9, 5);

    // combine our image geometry and material into a mesh
    var mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(0.2, 0.2, 1.0);
    mesh.position.set(coordinate[start_index][0], coordinate[start_index][1], i)
    // set the position of the image mesh in the x,y,z dimensions

    // add the image to the scene
    imageArr.push({
      obj: mesh,
      y: Math.random() > 0.5 ? 0.000001 : -0.000001,
      x: Math.random() > 0.5 ? 0.000001 : -0.000001,
      z: 0.01,
      startZ: i - 8,
      startX: coordinate[start_index][0],
      startY: coordinate[start_index][1],
    })
    start_index++

    scene.add(mesh);
  }

  /**
  * Lights
  **/
  // Add a point light with #fff color, .7 intensity, and 0 distance
  var light = new THREE.SpotLight(0xffffff, 1, 0);

  // Specify the light's position
  light.position.set(1, 1, 100);

  // const width = 10;
  // const height = 10;
  // const intensity = 1;
  // const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
  // rectLight.position.set( 0, 0, 0);
  // rectLight.lookAt( 0, 0, 5 );
  // scene.add( rectLight )

  // const rectLightHelper = new THREE.RectAreaLightHelper( rectLight );
  // rectLight.add( rectLightHelper );
  // // Add the light to the scene
  scene.add(light)

  // The main animation function that re-renders the scene each animation frame\
  function animate() {
    requestAnimationFrame(animate);
    // mesh.scale.set(i, i, 1.0);
    for (var index = 0; index < 18; index++) {
      // imageArr[index].scale.set(i, i, i)
      if (imageArr[index].obj.position.z >= 5) {
        imageArr[index].obj.position.z = imageArr[index].startZ
        imageArr[index].obj.position.x = imageArr[index].startX
        imageArr[index].obj.position.y = imageArr[index].startY
      }
      imageArr[index].obj.position.set(imageArr[index].obj.position.x += imageArr[index].x, imageArr[index].obj.position.y -= imageArr[index].y, imageArr[index].obj.position.z += imageArr[index].z)

    }
    renderer.render(scene, camera);
  }
  animate();

  function reportWindowSize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', reportWindowSize);
}
