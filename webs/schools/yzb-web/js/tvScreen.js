class TvScreen {
  constructor(images, id) {
    this.images = images;
    this.container = document.getElementById(id);
    this.step();
  }

  step() {
    const { width, height } = this.container.getBoundingClientRect();
    // 场景
    const scene = new THREE.Scene();
    // 相机
    const fieldOfView = 75;
    const aspectRatio = width / height;
    const nearPlane = 0.1;
    const farPlane = 1000;
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    camera.position.z = 0;
    camera.position.x = 0;
    // 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    this.container.appendChild(renderer.domElement);
    // 图片
    const len = this.images.length;
    let imageArr = [];
    let z = -25;
    let coordinate = [
      [-1, -1],
      [1, -1],
      [-1.5, 0],
      [1, 1],
      [-1, 1],
      [1.5, 0],
    ];
    let start_index = 0;
    for (const img of this.images) {
      var loader = new THREE.TextureLoader().load(img, (tex) => {
        tex.needsUpdate = true;
      });
      z += 1.2;
      if (start_index == 6) {
        start_index = 0;
      }
      var material = new THREE.MeshLambertMaterial({
        map: loader,
        // transparent: true,
        // opacity:0.2
      });
      var geometry = new THREE.PlaneGeometry(4.9, 7);
      var mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(0.2, 0.2, 1.0);
      mesh.position.set(coordinate[start_index][0], coordinate[start_index][1], z);
      imageArr.push({
        obj: mesh,
        y: Math.random() > 0.5 ? 0.000001 : -0.000001,
        x: Math.random() > 0.5 ? 0.000001 : -0.000001,
        z: 0.01,
        startZ: z - 8,
        startX: coordinate[start_index][0],
        startY: coordinate[start_index][1],
      });
      start_index++;
      scene.add(mesh);
    }
    // 灯光
    const light = new THREE.SpotLight(0xffffff, 1, 0);
    light.position.set(1, 1, 100);
    scene.add(light);
    // 动画
    function animate() {
      requestAnimationFrame(animate);
      for (let index = 0; index < len; index++) {
        if (imageArr[index].obj.position.z >= 5) {
          imageArr[index].obj.position.z = imageArr[index].startZ;
          imageArr[index].obj.position.x = imageArr[index].startX;
          imageArr[index].obj.position.y = imageArr[index].startY;
        }
        imageArr[index].obj.position.set(
          (imageArr[index].obj.position.x += imageArr[index].x),
          (imageArr[index].obj.position.y -= imageArr[index].y),
          (imageArr[index].obj.position.z += imageArr[index].z),
        );
      }
      renderer.render(scene, camera);
    }
    animate();
  }

  resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
