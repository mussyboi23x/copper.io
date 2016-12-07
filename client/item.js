/*
global MainItemRegistry
*/
/**
 * the ItemRegistry is a weak attempt at giving UIDs. Needs upgrades.
 */
function ItemRegistry() {
    this.items = [];
    this.currentID = 0;
    this.addItem = function(item) {
        this.items[item.uid] = item;
    };
    this.destroyItems = function() {
        for (var i = 0; i < this.items.length; i++) this.items[i] = undefined;
    };
    this.getNewUID = function() {
        return this.currentUID;

    };
    this.getItemFromMesh = function(mesh) {
        mesh.userData.name;
    };
}

MainItemRegistry = new ItemRegistry();

function ModelBase(json, texture) {
    this.json = json;
    this.texture = texture;
}

function GeometryBase(geometry, texture) {
    this.json = json;
    this.texture = texture;
}
/**
 * technically a ItemModel, it uses a model to form a object, and 
 * puts the model into the UnloadedModels array to wait for the next animation 
 * frame to add it.
 */
function Item(name, modelBase) {
    this.name = name;
    this.uid = MainItemRegistry.getNewUID();
    this.model = new Model(modelBase, this.uid);
    UnloadedModels.push(this.model);
    this.name = name;

    this.loadModel = function() {
        this.model.load();
    };
    this.getModel = function() {
        return this.model;
    };
    this.getMesh = function() {
        return this.model.getMesh();
    };
    this.getName = function() {
        return this.name;
    };
    this.setAction = function(code) {
        this.action = code();
    };
    this.doAction = function() {
        if (this.action() != undefined) {
            this.action();
        }
    };
    this.removeModel = function(scene) {
        scene.remove(this.model.getMesh());
    };
    this.meshFunc = function(edits) {
        edits(this.getModel());
    };
    this.setMeshPos = function(x, y, z) {
        this.getMesh().positsion = THREE.Vector3(x, y, z);
    }
    this.getPos = function() {
        return this.getMesh().position;
    }
}
/**
 *ItemGeometry is similar to Item, but instead of using a ModelBase, it uses a Geometrybase Object 
 */
function ItemGeometry(name, GeometryBase){
    this.name = name;
    this.geometry = GeometryBase.geometry;
    this.texture = GeometryBase.texture;
    this.material = Physijs.createMaterial(new THREE.MeshBasicMaterial({ color: 0x888888, texture:this.texture }),.3,.3);
    this.mesh = new Physijs.ConvexMesh(new this.geometry,this.material);
    this.getMesh = function(){
        return this.model.getMesh();
    };
    this.getName = function(){
        return this.name;
    };
    this.setAction = function(code){
        this.action = code();
    };
    this.doAction = function(){
        if(this.action() != undefined){
            this.action();
        }
    };
    this.removeModel = function(scene) {
    	scene.remove( this.mesh );
	};
	this.setMeshPos = function(x,y,z){
	    this.mesh.positsion = THREE.Vector3(x,y,z);
	}
	this.getPos = function(){
	    return this.mesh.position;
	}
}
/**
 * json is the url to a json model file
 * testure is a url to a jpeg
 *  pos is the xyz pos of the model with the THREE.Vector3 object
 **/
function Model(ModelBase, uid) {
    var mesh;
    var json = ModelBase.json;
    var texture = ModelBase.texture;
    this.load = function() {
        try {
            loader.load(json, function(geometry, materials) {
                var tex = THREE.ImageUtils.loadTexture(texture);
                var mat = new Physijs.createMaterial(new THREE.MeshLambertMaterial({
                    map: tex,
                    morphTargets: true
                }), 0.3, 0.3);
                mesh = new Physijs.ConvexMesh(geometry, mat);
                mesh.castShadow = true;
                mesh.userData.name = uid;
                scene.add(mesh);
                return mesh;
            });
        }
        catch (error) {
            console.log("error wloading models: " + error);
        }
    };
    this.getMesh = function() {
        return mesh;
    };

}