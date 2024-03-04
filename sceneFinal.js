var sceneFinal = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "sceneFinal" });
    },
    init: function() {},
    preload: function() {
    
        this.load.image('background', "../assets/backgroud-sceneOne.png")
    },
    create: function() {
       this.add.image(400, 300, 'background');
    },
    update: function() {}
});

//Não deu tempo de fazer