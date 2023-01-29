import {FirstPersonControls} from "https://cdn.skypack.dev/three@0.136/examples/jsm/controls/FirstPersonControls.js";
import {clamp} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
console.log("app loaded")

class InputController {
    constructor() {
        this.init()
    }

    init() {
        this.current_ = {
            leftButton: false,
            rightButton: false,
            mouseX: 0,
            mouseY: 0
        };
        this.previous_ = null;
        this.keys_ = {};
        this.previousKeys_ = {};

        document.addEventListener('mousedown', (e) => {
            this.onMouseDown_(e)
        }, false)
        document.addEventListener('mouseup', (e) => {
            this.onMouseUp_(e)
        }, false)
        document.addEventListener('mousemove', (e) => {
            this.onMouseMove_(e)
        }, false)
        document.addEventListener('keydown', (e) => {
            this.onKeyDown_(e)
        }, false)
        document.addEventListener('keyup', (e) => {
            this.onKeyUp_(e)
        }, false)
    }

    onMouseDown_(e) {
        switch(e.button) {
            case 0: {
                this.current_.leftButton = true
                break
            }
            case 1: {
                this.current_.rightButton = true
                break
            }
        }
    }
    onMouseUp_(e) {
        switch(e.button) {
            case 0: {
                this.current_.leftButton = false
                break
            }
            case 1: {
                this.current_.rightButton = false
                break
            }
        }
    }
    onMouseMove_(e) {
        this.current_.mouseX = e.pageX - window.innerWidth / 2
        this.current_.mouseY = e.pageY - window.innerHeight / 2

        if (this.previous_ === null) {
            this.previous_ = {...this.current_}
        }

        this.current_.mouseXDelta = this.current_.mouseX - this.previous_.mouseX
        this.current_.mouseYDelta = this.current_.mouseY - this.previous_.mouseY
    }
    onKeyDown_(e) {
        this.keys_[e.keyCode] = true
    }
    onKeyUp_(e) {
        this.keys_[e.keyCode] = false
    }

    update() {
        this.previous_ = {...this.current_}
    }
}

class FirstPersonCamera {
    constructor(camera) {
        this.camera_ = camera
        this.input_ = new InputController()
        this.rotation_ = THREE.Quaternion()
        this.translation_ = new THREE.Vector3()
        this.phi_ = 0
        this.theta_ = 0
    }

    update(timeElapsedS) {
        this.updateRotation_(timeElapsedS)
        this.updateCamera_(timeElapsedS)
    }

    updateCamera_(timeElapsedS) {
        this.camera_.quaternion.copy(this.rotation_)
    }

    updateRotation_(timeElapsedS) {
        const xh = this.input_.current_.mouseXDelta / window.innerWidth
        const yh = this.input_.current_.mouseYDelta / window.innerHeight

        this.phi_ += -xh * 5
        this.theta_ += clamp(this.theta_ + -yh * 5, Math.PI / 3, Math.PI / 3)

        const qx = new THREE.Quaternion()
        qx.setFromAxisAngle(new THREE.Vector3(0, 1, O), this.phi_)
        const qz = new THREE.Quaternion()
        qz.setFromAxisAngle(new THREE.Vector3(0, 1, O), this.theta_)

        const q = new THREE.Quaternion()
        q.multiply(qx)
        q.multiply(qz)
        this.rotation_.copy(q)
    }
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const controls = new FirstPersonControls(camera, renderer.domElement)
controls.movementSpeed = 5
controls.lockSpeed = 0.8
console.log(controls)

camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // cube.rotation.z += 0.01;

    renderer.render( scene, camera );
}
animate();