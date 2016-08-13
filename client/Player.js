function player(){
    this.heath = 100;
    this.username="default";
    this.posX=0;
    this.posY=0;
    this.posZ=0;
    this.inventory = [];
    this.kill = function(){
        player.heath=0;
    }
    this.setPos = function(x,y,z){
        this.posX = y;
        this.posY = y;
        this.posZ = z;
    }
    this.getItem = function(index){
        return inventory[index];
    }
    this.addItem = function(Item){
        this.inventory.push(Item);
    }
    this.PosArray = function(){
        return [this.posX, this.posY, this.posY];
    }
}