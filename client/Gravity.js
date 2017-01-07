function GravityPoint(x, y, z){

this.point = THREE.Vector3(x,y,z);
this.objects = {};
this.FieldStrength = 9.8;


this.GravityRadius = function(){
    return 5;
};

this.update = function(){
    for(var i = 0; i < this.objects.length; i++){
        var object = this.objects[i];
        if(object.getPos().distanceTo(this.point) == this.GravityRadius()){
            object.setLinearVelocity(this.getVector(this.point,object));
        }
    }
    
    var items = MainItemRegistry.getItems();
    //TODO ineffectent code, will soon become less brute force
    for(var i = 0; i < items; i++){
        var item = items[i];
        this.objects.push(item);
    }
};

this.getVector = function(pos1, item2){
        var pos2 = item2.getPos();
        var phyimesh = item2.getMesh();
        var feildstrength = this.FieldStrength;
        var x;
        var y;
        var z;
        var vector;
        
        if(pos1.x > pos2.x){
            x = phyimesh.getLinearVelocity().x + feildstrength;
        }else{
            x = phyimesh.getLinearVelocity().x - feildstrength;
        }
        if(pos1.y > pos2.y){
            y = phyimesh.getLinearVelocity().y + feildstrength;
        }else{
            y = phyimesh.getLinearVelocity().y - feildstrength;
        }
        if(pos1.z > pos2.z){
            z = phyimesh.getLinearVelocity().z + feildstrength;
        }else{
            z = phyimesh.getLinearVelocity().z - feildstrength;
        }
        vector = new THREE.Vector3(x,y,z);
};
}

