import {FirstPersonControls} from "https://cdn.skypack.dev/three@0.136/examples/jsm/controls/FirstPersonControls.js";
import {ObjectFactory} from "/js/ObjectFactory.js";

console.log("app loaded")

class GameEngine {

    constructor() {

        this.clock_ = new THREE.Clock();
        this.ticks_ = 0
        this.objects_ = []
        this.staticObjects_ = []


        this.init()
    }

    init() {
        this.scene_ = new THREE.Scene();
        this.camera_ = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera_.position.z = 5;

        this.renderer_ = new THREE.WebGLRenderer();
        this.renderer_.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer_.domElement );

        this.controls_ = new FirstPersonControls(this.camera_, this.renderer_.domElement)
        this.controls_.movementSpeed = 150;
        this.controls_.lookSpeed = 0.1;

        this.objectFactory_ = new ObjectFactory()
        this.addObject(this.objectFactory_.createCube())
        this.addObject(this.objectFactory_.createCube())
        this.addObject(this.objectFactory_.createCube())
        this.addStaticObject(this.objectFactory_.createGround())


        this.animate();
    }

    animate() {
        requestAnimationFrame(() => {
            this.animate()
        });

        this.controls_.update( this.clock_.getDelta() );

        for (const objectsKey in this.objects_) {
            this.objects_[objectsKey].rotation.x += (objectsKey + 0.5)  / 1000;
            this.objects_[objectsKey].rotation.y += (objectsKey + 0.5) / 1000;
            // if (this.ticks_ % 30 === 0) {
            //     this.objects_[objectsKey].rotation.z += (objectsKey + 1) / 1000;
            // }
        }

        this.renderer_.render( this.scene_, this.camera_ );
    };



    addObject(object) {
        this.objects_.push(object)
        this.scene_.add(object)
    }

    addStaticObject(object) {
        this.staticObjects_.push(object)
        this.scene_.add(object)
    }

}

new GameEngine()