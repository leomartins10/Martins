
var player;
var moedasColetadas = 0;
var score;
let coins;

// Definição da cena do jogo
var sceneGame = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "sceneGame" });
    },
    init: function() {},
    preload() {   
        // Carregamento de sprites e tilemaps
        this.load.spritesheet('player', '../assets/player.png', { frameWidth: 32, frameHeight: 32 })
        this.load.image('tileset_all', '../assets/tileset_all.png')
        this.load.image('moeda', '../assets/coin.png')
        this.load.tilemapTiledJSON('mapa', '../assets/mymap.json')
    },
    create() {
        // Carregamento do mapa e criação das camadas
        const mapa = this.make.tilemap({key: 'mapa'})
        const tileset_all = mapa.addTilesetImage('blocos', 'tileset_all');
        const moedinhas = mapa.addTilesetImage('moeda', 'coin')
    
        const background = mapa.createLayer('background', tileset_all, 0, 0);
        const ground = mapa.createLayer('ground', tileset_all, 0, 0);
        const house = mapa.createLayer('house', tileset_all, 0, 0);
        const moedas = mapa.createLayer('moedas', moedinhas , 0, 0);

        // Criação de grupos de colisão estáticos
        const groundLayer = mapa.getObjectLayer('colisoes')
        const espinhosLayer = mapa.getObjectLayer('espinhos');
        const CoinLayer = mapa.getObjectLayer('coin')['objects']
        const groundLayerCollider = this.physics.add.staticGroup();
        const espinhosLayerCollider = this.physics.add.staticGroup();
        
        // Configuração das colisões para cada grupo
        groundLayer.objects.forEach(obj => { 
            const collider1 = groundLayerCollider.create(obj.x + obj.width / 2, obj.y + obj.height / 2, null) || 
            groundLayerCollider.create(Phaser.Geom.Point(point.x + obj.x, point.y + obj.y));
            collider1.body.setSize(obj.width, obj.height);
            collider1.setOrigin(0.5, 0.5); 
            collider1.setVisible(false);
        });

        espinhosLayer.objects.forEach(obj => { 
            const collider2 = espinhosLayerCollider.create(obj.x + obj.width / 2, obj.y + obj.height / 2, null);
            collider2.body.setSize(obj.width, obj.height);
            collider2.setOrigin(0.5, 0.5); 
            collider2.setVisible(false);
        });
        coins = this.physics.add.staticGroup()
        CoinLayer.forEach(object => {
        let obj = coins.create(object.x, object.y, "moeda"); 
           obj.setScale(object.width/16, object.height/16); 
           obj.setOrigin(0); 
           obj.body.width = object.width; 
           obj.body.height = object.height; 
    });

    

        // Criação do jogador
        player = this.physics.add.sprite(300, 400, 'player').setScale(2);
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.body.setSize(14, 19, true); 
        player.body.setOffset(8, 12)
        this.physics.add.collider(player, groundLayerCollider);
        this.physics.add.overlap(player, espinhosLayerCollider, function(){ //Criação do Overlap entre os espinhos e o jogador
            player.setPosition(300, 400)
        })

         // Criação do texto de pontuação
         score = this.add.text(400, 100, 'Score:' + moedasColetadas, {fontSize: '25px', fill:'416acf'} )

        this.physics.add.overlap(player, coins, collectCoin, null, this); // Criação do Overlap entre as moedas e o jogador
            function collectCoin(player, coin) {
                coin.destroy(coin.x, coin.y);
                moedasColetadas +=1
                if(coin.destroy(coin.x, coin.y)) moedasColetadas ++;
                score.setText('Score:' + moedasColetadas);
                return false;
            }

        

        // Configurações da câmera
        this.cameras.main.startFollow(player);
        this.cameras.main.setZoom(1);
        this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);
        this.physics.world.bounds.width = mapa.widthInPixels;
        this.physics.world.bounds.height = mapa.heightInPixels;
        cursors = this.input.keyboard.createCursorKeys();

        // Criação de animações
        this.anims.create({
            key: 'parado',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 12 }),
            frameRate: 2,
            repeat: -1
        });
        
        this.anims.create({
            key: 'parado',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 12 }),
            frameRate: 2,
            repeat: -1
        });
        
        this.anims.create({
            key: 'direita',
            frames: this.anims.generateFrameNumbers('player', { start: 13, end: 20 }),
            frameRate: 10,
            repeat: 0
        });
        
        this.anims.create({
            key: 'ataque',
            frames: this.anims.generateFrameNumbers('player', { start: 21, end: 30 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'ataque2',
            frames: this.anims.generateFrameNumbers('player', { start: 31, end: 40 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'ataque3',
            frames: this.anims.generateFrameNumbers('player', { start: 41, end: 50 }),
            frameRate: 10,
            repeat: 0
        });
        
        this.anims.create({
            key: 'jmp', 
            frames: this.anims.generateFrameNumbers('player', { start: 65, end: 70}),
            frameRate: 10,
            repeat: 0
        });

        

    },
    update() {
        // Atualização do movimento do jogador e da pontuação
        if (cursors.left.isDown) {
            player.setVelocityX(-200);
            player.setFlip(true, false);
            if (player.body.touching.down) player.anims.play('direita', true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(200);
            player.setFlip(false, false);
            if (player.body.touching.down) player.anims.play('direita', true);
        } else {
            player.setVelocityX(0);
        }

        if(player.body.velocity.x === 0 && player.body.velocity.y === 0) {
            player.anims.play('parado', true);
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.anims.play('jmp');
            player.setVelocityY(-300);
        }
        
        // Atualização do movimento do placar conforme o movimento da câmera
        const camerasX = this.cameras.main.scrollX;
        const camerasY = this.cameras.main.scrollY;
    
        score.x = camerasX + 16;
        score.y = camerasY + 16;


     

    }
})





