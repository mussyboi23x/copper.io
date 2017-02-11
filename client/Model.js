/**
 * json is the url to a json model file
 * testure is a url to a jpeg
 *  pos is the xyz pos of the model with the THREE.Vector3 object
 **/
function Model(ModelBase) {
    this.root = this;
    this.mesh = loadJSON(ModelBase);
}

function loadJSON(ModelBase) {
  var texturePath = "models/" //temperary
  Main.loader.setTexturePath(texturePath);
  Main.loader.load(ModelBase.json, function(geometry, materials){
      var material;
      if(materials == undefined || materials.length == 0){
        material = new MeshBasicMaterial();
      }else if(materials.length == 1){
        material = materials[0];
      }else if(materials.length > 1){
        material = new THREE.MultiMaterial(materials);
      }

      var Material = Physijs.createMaterial(material, 0.3, 0.3);
      var mesh = new Physijs.ConvexMesh(geomentry, Material);
      mesh.position.set( x, y, z );
      mesh.__dirtyPosition = true;
      Main.scene.add(mesh);
      return mesh;
  });
}
