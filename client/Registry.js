function ItemRegistry() {
    // name (string) and item (object)
    this.items = new Map();

    this.addItem = function(item){
        //so crude
        var dirs = item.file.split("/");
        var name = dirs[dirs.length-1].split(".");
        this.items.set(name[0], item);
        console.log(name[0] + " " + name[1]);

        var model = new Model(item.file, name[1],
        function(mesh){
          //model object doesnt have mesh assignment techincally
          if(model.hasAnimations()){
            for(var an in model.animations){
              AnimationRegistry.addAnimation(an);
            }
          }
        });
    }

    this.getItem = function(name) {
        return this.items.get(name);
    };
}

function AnimationRegistry(){
    // name (string) and animation (object)
    this.animations = new Map();

    this.addAnimation = function(name, animation){
        return this.animations.set(name, animation);
    }

    this.getAnimation = function(name){
        return this.animations.get(name);
    }

    this.getAnimations = function(){
        return this.animations;
    }
}

function AudioRegistry(){

}

var ItemRegistry = new ItemRegistry();
var AnimationRegistry = new AnimationRegistry();
var AudioRegistry = new AudioRegistry();
