function Item(file, position) {
    this.file = file;
    this.model;
    //This is static adding of a Item, so dont leave this here later on.
    ItemRegistry.addItem(this);

    this.getModel = function() {
        return this.model;
    };
    this.getMesh = function() {
        return this.getModel().getMesh();
    };
    this.getFile = function() {
        return this.file;
    };
    this.setAction = function(code) {
        this.action = code();
    };
    this.doAction = function() {
        if (this.action() != undefined) {
            this.action();
        }
    };
    this.removeModel = function(scene) {
        scene.remove(this.model.getMesh());
    };
    this.meshFunc = function(edits) {
        edits(this.getModel());
    };
    this.setMeshPos = function(x, y, z) {
        this.getMesh().position.set(x, y, z);
    };
    this.getPos = function() {
        return this.getMesh().position;
    };
}
