/**
 * file is the url to a model file
 *  pos is the xyz pos of the model with the THREE.Vector3 object
 **/
function Model(file, type, callback) {
    this.file = file;
    this.type = type;
    this.animations;
    this.mesh;

    switch (type) {
        case "json":
          this.mesh = loadJSON(file, callback); break;
        case "dae":
          this.mesh = loaderCollada(file, callback); break;
        default:
          console.log("Invaid Model format: " + type + " ! Will assume it is a JSON model!");
          this.mesh = loadJSON(file, callback);
          break;
    }

    this.hasAnimations = function(){
      return this.animations != undefined && this.animations.length > 0;
    };

    this.getMesh = function(){
      return this.mesh;
    };
}

function loadJSON(file, callback) {
  Main.loaderJson.setTexturePath("models/");
  Main.loaderJson.load(file,
    function(geometry, materials){
      var material;
      if(materials == undefined || materials.length == 0){
        material = new THREE.MeshBasicMaterial();
      }else if(materials.length == 1){
        material = materials[0];
      }else if(materials.length > 1){
        material = new THREE.MultiMaterial(materials);
      }

      var PhysijsMesh = new Physijs.ConvexMesh(geometry, Physijs.createMaterial(material, 0.3, 0.3));
      PhysijsMesh.__dirtyPosition = true;
      Main.scene.add(PhysijsMesh);
      callback(PhysijsMesh);
      return PhysijsMesh;
  }, function(xhr){
    	console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
  }, function(xhr) {
      console.log("An error occurs");
  });
}

function loaderCollada(file, callback){
  var loader = new THREE.ColladaLoader();
    loader.load(file,
    function(collada){

      var col = collada.scene;
      Main.scene.add(col);
      var dae = collada.dae;
      console.log(col);
      console.log(dae);

    }, function(xhr){
      	console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    }, function(xhr) {
        console.log("An error occurs");
    });
}
