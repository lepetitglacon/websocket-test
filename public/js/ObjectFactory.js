export class ObjectFactory {
    constructor() {}

    createCube() {
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: this.getRandomInt(999999) } );
        return new THREE.Mesh( geometry, material );
    }

    createGround() {
        const geometry = new THREE.PlaneGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: this.getRandomInt(999999) } );
        let ground = new THREE.Mesh( geometry, material );
        ground.material.side = THREE.DoubleSide;


        ground.position.y = -3
        ground.rotation.x = 1.5
        ground.rotation.z = 1.5
        ground.rotation.y = 1.5

        return ground
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}