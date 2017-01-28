/**
 * json is the url to a json model file
 * testure is a url to a jpeg
 *  pos is the xyz pos of the model with the THREE.Vector3 object
 **/
function Model(ModelBase) {
    this.root = this;
    this.mesh = loadJSON(ModelBase);
    this.load = function() {
        Main.scene.add(mesh.model)
    }

}

function loadJSON(ModelBase, Texture) {
    var root = this;
    var Mesh;
    var Texture = loadTexture(ModelBase);
    Main.loaderJson.load(ModelBase.json, function(geometry, materials) {
        var mat = new Physijs.createMaterial(new THREE.MeshLambertMaterial({
            map: Texture,
            morphTargets: true
        }), 0.3, 0.3);
        console.log(mat);
        var Mesh = new Physijs.ConvexMesh(geometry, mat);
        Main.scene.add(Mesh.map)
        return Mesh;
    });
    return Mesh
}

function loadJSON(ModelBase) {
    var Texture = loadTexture(ModelBase);
    Main.loaderJson.load(ModelBase.json, function(geometry, materials) {
        for (i in materials){

        }
        materials[0].map = Texture;
        materials[0].morphTargets = true;
        console.log("asddf")
        var mat = new Physijs.createMaterial(materials[0], 0.3, 0.3);
        console.log(mat);
        console.log(mat.map);
        var Mesh = new Physijs.ConvexMesh(geometry, mat);
        Main.scene.add(Mesh)
        return Mesh;
    });
}

function loadTexture(ModelBase) {
    return Main.loaderTexture.load(ModelBase.texture);
}
/*
function loadTexture(url) {
    Main.loaderTexture.load(url,
        function(texture) {
            return texture;
        }
    );
}
*/

function loadItem() {

}
