import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const sphere_colors = [
  "#42ecf5",
  "#a833cc",
  "#e3226c",
  "#f70a0a",
  "#faf60f",
  "#f2f2f2",
  "#4400ff",
]

const geometry = new THREE.SphereGeometry(15, 42, 20)
var s_material = new THREE.MeshBasicMaterial({
  color: sphere_colors[Math.floor(Math.random() * sphere_colors.length)],
  wireframe: true
})
const sphere = new THREE.Mesh(geometry, s_material)
scene.add(sphere)

const sphere_positions = [-10, -5, 0, 5, 10]

scene.position.x = sphere_positions[Math.floor(Math.random() * sphere_positions.length)]
scene.position.y = sphere_positions[Math.floor(Math.random() * sphere_positions.length)]

window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

renderer.setAnimationLoop(() => {
  sphere.rotation.x += 0.005
  sphere.rotation.y += 0.005
  sphere.rotation.z += 0.001
  renderer.render(scene, camera)
})
