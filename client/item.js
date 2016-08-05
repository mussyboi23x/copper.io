function Item(id, name, model){
    this.loadModel = function(){
        model.load();
    }
    this.getName = function(){
        return name;
    }
    this.setAction = function(code){
        this.action = code();
    }
    this.pickUp = function(Player){
        //?
    }
    this.putDown = function(Player){
        //?
    }
    this.doAction = function(){
        if(this.action() === undefined){
            this.action();
        }
    }
    this.removeModel = function() {
    	scene.remove( this.model );
    	animate();
	}
}