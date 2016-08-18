/*
global MainItemRegistry
*/
MainItemRegistry = new ItemRegistry();

function Item(id, name, model){
    this.id = id;
    this.model = model;
    this.name = name;
    this.loadModel = function(){
        model.load();

    };
    this.getModel = function(){
        return this.model;
    };
    this.getName = function(){
        return name;
    };
    this.setAction = function(code){
        this.action = code();
    };
    this.doAction = function(){
        if(this.action() === undefined){
            this.action();
        }
    };
    this.removeModel = function() {
    	scene.remove( this.model );
    	//animate();
	};
	this.meshFunc = function(edits){
	    edits(this.getModel());
	};
}

function ItemRegistry(){
    this.items = [];
    /**
     * this functions distroys all items in
     * its registry, possably devistating to 
     * gameplay.
     */
     this.destroyItems = function(){
         for(var i =0; i<this.items.length; i++)this.items[i] = undefined;
     };
}