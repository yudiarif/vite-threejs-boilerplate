import * as THREE from "three";
import { DirectionalLight, PointLight } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import "./style.css";

import vertexShader from "./src/shaders/vertex.glsl";
import fragmentShader from "./src/shaders/fragment.glsl";
import GUI from "lil-gui";

const gui = new GUI();

////SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

////Geometry
const geometry = new THREE.PlaneGeometry(2, 2, 32, 32);
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  side: THREE.DoubleSide,

  uniforms: { uTime: { value: 0 } },
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

///Size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

///Light
const light = new THREE.PointLight(0xffff, 1, 100);
light.position.set(0, 10, 10); /// XYZ = X:0 Y:10 Z:10
scene.add(light);

const sunLight = new DirectionalLight(0xffff, 0.08);
sunLight.position.set(-100, 0, -100);
scene.add(sunLight);

const fillLight = new PointLight(0xffff, 2.7, 4, 3);
fillLight.position.set(30, 3, 1.8);
scene.add(fillLight);

////Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 1.5;
scene.add(camera);

///Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

///Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = true;
controls.enableZoom = true;
//controls.autoRotate = false;
//controls.autoRotateSpeed = 1;

///Resize for responsive
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //Update camera for adjust position camera when display shrink/expand
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

///RE-render responsive camera
const loop = () => {
  material.uniforms.uTime.value += 0.005; //uTime value for shaders
  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(loop);
};
loop();

// GUI
const cameraFolder = gui.addFolder("camera");
cameraFolder.add(camera.position, "z", 0, 10);
cameraFolder.open();
