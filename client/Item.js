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
    this.getItems = function(){
        return this.items;
    }
}

MainItemRegistry = new ItemRegistry();
/**
 *contains the json and texture url
 * can/should be indexed/added to a array for
 * quick use of a known item
 * 
 * json - string
 * 
 * texture - string
 */
function ModelBase(json, texture) {
    this.json = json;
    this.texture = texture;
}
/**
 *contains the json and texture url
 * can/should be indexed/added to a array for
 * quick use of a known item
 * 
 * json - string
 * 
 * texture - string
 * 
 * positsion in world
 */
function ModelBase(json, texture, pos) {
    this.json = json;
    this.texture = texture;
    this.pos = pos;
    
    this.getPos = function(){
      return this.pos;  
    };
}
/**
 *contains the THREE geometry and texture url
 * can/should be indexed/added to a array for
 * quick use of a known item
 * 
 * geometry - Three.geometry (any)
 * 
 * texture - string
 * 
 * positsion in world
 */
function GeometryBase(geometry, texture) {
    this.geometry = geometry;
    this.texture = texture;
}
function GeometryBase(geometry, texture, pos) {
    this.geometry = geometry;
    this.texture = texture;
    this.pos = pos;
}
/**
 * technically a ItemModel, it uses a model to form a object, and 
 * puts the model into the UnloadedModels array to wait for the next animation 
 * frame to add it.
 */
function Item(name, modelBase) {
    this.name = name;
    this.model = new Model(modelBase);
    this.model.load();
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
/*
function Item(name, modelBase, pos) {

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
    this.name = name;
    this.uid = MainItemRegistry.getNewUID();
    this.model = new Model(modelBase, this.uid);
    this.model.load();
    console.log(this.getModel().mesh);
    this.name = name;
}
*/
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