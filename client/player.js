function player(username, x, y, z) {
    this.health = 100;
    this.username = username;
    this.posX = x;
    this.posY = y;
    this.posZ = z;
    this.enabled = false; //enables/disables controls.
    this.MouseX = 0;
    this.MouseY = 0;
    this.playerObj = new playerModel(camera, new THREE.Vector3(this.posX, this.posY, this.posZ), this)
    this.model = function() {
        return this.playerObj.mesh;
    }

    scene.add(this.model());
    this.getPos3 = function() {
        return THREE.Vector3(this.posX, this.posY, this.posZ);
    };

    this.setPos3 = function(vec) {
        this.posX = vec.posX;
        this.posY = vec.posY;
        this.posZ = vec.posZ;

    };

    this.setPos = function(x, y, z) {
        this.posX = y;
        this.posY = y;
        this.posZ = z;
    };


    this.PosArray = function() {
        return [this.posX, this.posY, this.posY];
    }

    this.updateModel = function(model) {
        model.positsion.x = this.posX;
        model.positsion.y = this.posY;
        model.positsion.z = this.posZ;
    };
    /**
     * This function should only be used in the animation loop
     * dont use it for anything else!
     * 
     **/
    this.updateCamera = function(controls, velocity, delta) {
        controls.getObject().positsion = this.model.positsion;
    };
}

function playerModel(camera, pos, owner) {
    owner.MouseX = 0;
    owner.MouseY = 0;
    owner.enabled = false;
    this.position = pos;
    this.geometry = undefined;
    this.mesh = undefined;
    this.createMesh = function() {
        this.geometry = new THREE.CylinderGeometry(.5, .5, .5, 16);
        this.material = Physijs.createMaterial(new THREE.MeshBasicMaterial({
            color: 0x66CC44,
            morphTargets: true
        }), 0.1, 0.1);
        this.mesh = new Physijs.ConvexMesh(this.geometry, this.material, 1);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.mesh.add(camera);
        this.enabled = true;
        console.log(this.mesh);
    }
    this.createMesh();
    camera.rotation.set(0, 0, 0);
    var PI_2 = Math.PI / 2;

    var onMouseMove = function(event) {
        if (owner.enabled) {
            var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
            owner.MouseX = (event.clientX / window.innerWidth) * 2 - 1;
            owner.MouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            //player.model().__dirtyPosition = true;
			//player.model().__dirtyRotation = true;
            camera.rotation.y -= movementX * 0.002;
            camera.rotation.x -= movementY * 0.002;
            //Index.player.model().rotation.x -= movementY * 0.002
            //camera.rotation.z -= movementY * 0.002;
            console.log("moved");
            //camera.rotation.z = Math.max(-PI_2, Math.min(PI_2, camera.rotation.x));
        }

    };
    document.addEventListener('mousemove', onMouseMove, false);

    this.dispose = function() {

        document.removeEventListener('mousemove', onMouseMove, false);

    };


    this.getObject = function() {

        return this.mesh;

    };

    this.getDirection = function() {

        // assumes the camera itself is not rotated

        var direction = new THREE.Vector3(0, 0, -1);
        var rotation = new THREE.Euler(0, 0, 0, "YXZ");

        return function(v) {

            rotation.set(this.mesh.rotation.x, this.mesh.rotation.y, 0);

            v.copy(direction).applyEuler(rotation);

            return v;

        };

    }();
}
