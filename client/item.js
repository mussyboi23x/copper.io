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
    this.pickUp = function(Player){
        //?
    };
    this.putDown = function(Player){
        //?
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
	this.editModel = function(edits){
	    edits(this.getModel());
	    //animate();
	};
	this.detectCollision = function(){
	    
	    var vertices = model.getMesh().geometry.vertices;
	    
	    
	    for (var vertexIndex = 0; vertexIndex < player.geometry.vertices.length; vertexIndex++)
        {       
            var localVertex = player.geometry.vertices[vertexIndex].clone();
            var globalVertex = player.matrix.multiplyVector3(localVertex);
            var directionVector = globalVertex.subSelf( player.position );
        
            var ray = new THREE.Ray( player.position, directionVector.clone().normalize() );
            var collisionResults = ray.intersectObjects( collidableMeshList );
            if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
            {
                // a collision occurred... do something...
            }
        }
	};
	
	this.largestX = function(vertices, matrix){
	    var x;
	    for(var i = 0; i < vertices.length; i++){
	        var vertex = matrix.multiplyVector3(vertices[i].clone());
	        if(x == undefined || vertex.x > x){
	            x = vertex.x;
	        }
	    }
	    return ;
	}
	this.smallestX = function(vertices, matrix){
	    var x;
	    for(var i = 0; i < vertices.length; i++){
	        var vertex = matrix.multiplyVector3(vertices[i].clone());
	        if(x == undefined || vertex.x < x){
	            x = vertex.x;
	        }
	    }
	    return x;
	}
	this.largestY = function(vertices, matrix){
	    var y;
	    for(var i = 0; i < vertices.length; i++){
	        var vertex = matrix.multiplyVector3(vertices[i].clone());
	        if(y == undefined || vertex.y > y){
	            y = vertex.y;
	        }
	    }
	    return y;
	}
	this.smallestY = function(vertices, matrix){
	    var y;
	    for(var i = 0; i < vertices.length; i++){
	        var vertex = matrix.multiplyVector3(vertices[i].clone());
	        if(y == undefined || vertex.y < y){
	            y = vertex.y;
	        }
	    }
	    return y;
	}
	this.largestZ = function(vertices, matrix){
	    var z;
	    for(var i = 0; i < vertices.length; i++){
	        var vertex = matrix.multiplyVector3(vertices[i].clone());
	        if(z == undefined || vertex.z > z){
	            z = vertex.z;
	        }
	    }
	    return z;
	}
	this.smallestZ = function(vertices, matrix){
	    var z;
	    for(var i = 0; i < vertices.length; i++){
	        var vertex = matrix.multiplyVector3(vertices[i].clone());
	        if(z == undefined || vertex.z < z){
	            z = vertex.z;
	        }
	    }
	    return z;
	}
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