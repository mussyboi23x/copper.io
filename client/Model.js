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

function loadJSON(ModelBase) {
    var texture = loadTexture(ModelBase.texture);
    var mat;
    var Mat;
    var Mesh;
    Main.loaderJson.load(ModelBase.json, function(geometry, materials) {
      if(materials != undefined){
          for (i in materials){
            i.map = texture;
            i.morphTargets = true;
          }
          if (materials.length > 1){
            mat = new THREE.MultiMaterial(materials);
          }else if (materials.length == 1) {
            mat = materials[0];
          }
      }else{
        mat = new THREE.MeshBasicMaterial({map: texture, morphTargets: true});
      }
      Mat = Physijs.createMaterial(mat, 0.3, 0.3);
      Mesh = new Physijs.ConvexMesh(geometry, Mat);
      Main.scene.add(Mesh);
      return Mesh;
    });
}

function loadTexture(texture) {
    return Main.loaderTexture.load(texture);
}
