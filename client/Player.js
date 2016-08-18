function player(model, username){
    this.heath = 100;
    this.username=username;
    this.posX=0;
    this.posY=0;
    this.posZ=0;
    this.getPos3 = function(){
        return THREE.Vector3(this.posX,this.posY,this.posZ);
    }
    
    this.setPos3 = function(vec){
        this.posX = vec.posX;
        this.posY = vec.posY;
        this.posZ = vec.posZ;
        
    }
    
    this.inventory = [];
    
    this.kill = function(){
        this.heath=0;
    };
    
    this.setPos = function(x,y,z){
        this.posX = y;
        this.posY = y;
        this.posZ = z;
    };
    
    this.getItem = function(index){
        return inventory[index];
    };
    
    this.addItem = function(Item){
        this.inventory.push(Item);
    };
    
    this.PosArray = function(){
        return [this.posX, this.posY, this.posY];
    };
    
    this.updateModel = function(model){
        model.
    }
}