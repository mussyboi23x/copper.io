/**
 * json is the url to a json model file
 * testure is a url to a jpeg
 *  pos is the xyz pos of the model with the THREE.Vector3 object
 **/
function Model(ModelBase) {
  var root = this;
    var model = loadJSON(ModelBase);
    this.load = function(){
        Main.scene.add(model)
    }

}

function loadJSON(ModelBase) {
    Main.loaderJson.load(ModelBase.json, function(geometry, materials) {
            var mat = new Physijs.createMaterial(new THREE.MeshLambertMaterial({
                map: loadTexture(ModelBase),
                morphTargets: true
            }), 0.3, 0.3);
            console.log(mat);
            return new Physijs.ConvexMesh(geometry, mat);
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function(xhr) {
            console.log('An error happened');
        }
    );
}

function loadTexture(ModelBase) {
    Main.loaderTexture.load(ModelBase.texture,
        function(texture) {
            return texture;
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function(xhr) {
            console.log('An error happened');
        }
    );
}
