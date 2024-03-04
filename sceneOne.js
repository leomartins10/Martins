// Definição de uma cena do Phaser chamada sceneOne
var sceneOne = new Phaser.Class({
    // Herda as propriedades e métodos da classe Phaser.Scene
    Extends: Phaser.Scene,
    
    // Método de inicialização da cena
    initialize: function() {
        // Chama o construtor da classe Phaser.Scene com uma chave 'sceneOne'
        Phaser.Scene.call(this, { "key": "sceneOne" });
    },
    
    init() {},
    
    preload: function() {
        // Carrega a imagem de fundo da cena
        this.load.image("background-sceneOne", "../assets/backgroud-sceneOne.png");
        // Carrega a imagem do botão
        this.load.image('button', 'assets/play.button.png')
    },
    
    create() {
        // Adiciona a imagem de fundo na posição (400, 300)
        this.add.image(400, 300, "background-sceneOne");
        // Adiciona o botão na posição (400, 300) e escala para 0.3
        const button = this.add.image(400, 300, "button").setScale(0.3);

        // Torna o botão interativo,
        button.setInteractive()
        // Define o evento 'pointerdown' (clique do mouse ou toque) para o botão
        button.on('pointerdown', () => {
            // Para a cena atual
            this.scene.stop();
            // Inicia a cena 'sceneGame'
            this.scene.start('sceneGame');
        })
    },
    
    update() {}
});
