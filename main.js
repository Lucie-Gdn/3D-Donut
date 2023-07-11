import * as THREE from 'three';
import './style.css';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap';

console.log("coucou")

// create scene
const scene = new THREE.Scene()

// create donut
const geometry = new THREE.TorusGeometry( 7, 4, 23, 100 ); 
const material = new THREE.MeshStandardMaterial( { 
  color:"#F396C6", 
  roughness:0.1
} ); 
const mesh = new THREE.Mesh( geometry, material ); 
scene.add( mesh );

// add sizes
const sizes = {
  width : window.innerWidth,
  height : window.innerHeight
}

// add light 
const light= new THREE.PointLight(0xffffff, 1,100)
light.position.set(10,15,30)
// light.intensity=1.25
// light.castShadow = true;
const lightHolder = new THREE.Group();
lightHolder.add(light);
scene.add(lightHolder)
// scene.add(light)

// add camera
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height, 0.1,100);
camera.position.z=40
scene.add(camera);

// renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setPixelRatio(3)
renderer.setClearColor(0x000000,0)
renderer.setSize (sizes.width,sizes.height);
renderer.render(scene, camera);

//controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping=true
controls.enablePan=false
controls.enableZoom =false

// resize the background 
window.addEventListener('resize',()=>{
  sizes.width=window.innerWidth
  sizes.height=window.innerHeight
  // Update the camera au resize
  camera.aspect=sizes.width/sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height);
})

const loop = () => {
  controls.update()
  lightHolder.quaternion.copy(camera.quaternion)
  renderer.render(scene, camera) 
  window.requestAnimationFrame(loop)  // dit au browser qu'on veut faire une animation via l'appel d'une fct callback avant le prochain rendu
}
loop()

const clock = new THREE.Clock()
function animate() {
  requestAnimationFrame(animate);
    const time = clock.getElapsedTime();
  mesh.position.y = Math.cos( time ) * 0.4;
  renderer.render(scene, camera);
}
animate()

// animation loading donut 
const donutReload = gsap.timeline({defaults : {duration : 2}})
donutReload.fromTo(mesh.scale,{x:0,y:0,z:0},{x:1,y:1,z:1})
donutReload.fromTo('nav',{y:"-100%"}, {y:"0%"})
donutReload.fromTo('.title1', {opacity:0}, {opacity:1})

// animation souris
let mouseDown=false
let rgb=[]
window.addEventListener('mousedown', ()=>(mouseDown=true))
window.addEventListener('mouseup', ()=>(mouseDown=false))
window.addEventListener('mousemove',(e)=>{
  if (mouseDown){
    rgb = [Math.round(e.pageX/sizes.width)*255]
    // console.log("rgb où es-tu?")
    console.log(rgb)
  }
})