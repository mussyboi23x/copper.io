function Item(id, name, model){
    this.loadModel = function(){
        model.load();
    }
    this.getName = function(){
        return name;
    }
    this.setAction = function(code){
        code();
    }
    this.pickUp = function(Player){
        //?
    }
    this.putDown = new function(Player){
        //?
    }
    this.removeModel = function() {
    	var oldModel = scene.getObjectByName(this.model.name);
    	scene.remove( oldModel );
    	animate();
	}
}