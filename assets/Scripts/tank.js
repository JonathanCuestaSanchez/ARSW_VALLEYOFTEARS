import { getStompClient, subscribeTopic, getStompClientsSize, unsubscribeTopic } from './aaaaa';
import { getRoomPlayers, joinRoom, createRoom } from './Rest.js';
cc.Class({
    extends: cc.Component,

    properties: {

        pos: null,
        id: null,
        stompClient: null,

        racha: 0,
        kills: 0,
        canracha1:false,
        canracha2:false,
        canracha3:false,
        racha1: false,
        racha2: false,
        racha3: false,
		cronometro: false,
        jugadores: 0,
        directionx: 0,
        directiony: 0,
        direction: "up",
        colicion: false,
        collisionleft: false,
        collisionrigh: false,
        collisionup: false,
        collisiondown: false,
        bullet: {
            default: null,
            type: cc.Node, //o prefab
        },

        loadedPlayers: {
            default: [],
            type: [cc.Node],
        },
        player: {
            default: null,
            type: cc.Node,
        },
        enem: {
            default: null,
            type: cc.Node,
        },
    },
    setRotate: function (flag) {
        var rotate;

        if (this.direction == "up") {
            if (flag == "left") {
                rotate = cc.rotateBy(0, 90);
                this.rotationx = 180;
                this.rotationy = 0;
            } else if (flag == "down") {
                rotate = cc.rotateBy(0, 180);
                this.rotationx = -90;
                this.rotationy = 0;
            } else {
                rotate = cc.rotateBy(0, 270);
                this.rotationx = 0;
                this.rotationy = 270;
            }


        } else if (this.direction == "down") {
            if (flag == "right") {
                rotate = cc.rotateBy(0, 90);
                this.rotationx = 0;
                this.rotationy = 0;
            } else if (flag == "up") {
                rotate = cc.rotateBy(0, 180);
                this.rotationx = 0;
                this.rotationy = -90;
            } else {
                rotate = cc.rotateBy(0, 270);
                this.rotationx = 0;
                this.rotationy = 270;
            }

        }
        else if (this.direction == "left") {
            if (flag == "down") {
                rotate = cc.rotateBy(0, 90);
                this.rotationx = 0;
                this.rotationy = 90;
            } else if (flag == "right") {
                rotate = cc.rotateBy(0, 180);
                this.rotationx = 0;
                this.rotationy = 180;
            } else {
                rotate = cc.rotateBy(0, 270);
                this.rotationx = 0;
                this.rotationy = 270;

            }

        } else {
            if (flag == "up") {
                rotate = cc.rotateBy(0, 90);
                this.rotationx = 0;
                this.rotationy = 90;
            } else if (flag == "left") {
                rotate = cc.rotateBy(0, 180);
                this.rotationx = 0;
                this.rotationy = 180;
            } else {
                rotate = cc.rotateBy(0, 270);
                this.rotationx = 0;
                this.rotationy = 270;
            }

        }
        return rotate;

    },
    setRotateEne: function (Player, flag) {
        var rotate;
        if (Player.direction == "up") {
            if (flag == "left") {
                rotate = cc.rotateBy(0, 90);

            } else if (flag == "down") {
                rotate = cc.rotateBy(0, 180);

            } else {
                rotate = cc.rotateBy(0, 270);

            }


        } else if (Player.direction == "down") {
            if (flag == "right") {
                rotate = cc.rotateBy(0, 90);

            } else if (flag == "up") {

                rotate = cc.rotateBy(0, 180);
            } else {
                rotate = cc.rotateBy(0, 270);

            }

        }
        else if (Player.direction == "left") {
            if (flag == "down") {
                rotate = cc.rotateBy(0, 90);

            } else if (flag == "right") {
                rotate = cc.rotateBy(0, 180);
                ;
            } else {
                rotate = cc.rotateBy(0, 270);


            }

        } else {
            if (flag == "up") {
                rotate = cc.rotateBy(0, 90);

            } else if (flag == "left") {
                rotate = cc.rotateBy(0, 180);

            } else {
                rotate = cc.rotateBy(0, 270);

            }

        }
        return rotate;

    },
    onKeyEvent(event) {
        // set a flag when key pressed
        var flag = this.direction;
        var permit = true;
        var realTime = new Date();
        
        if (this.cronometro) {           
            if ((realTime.getTime() - this.actualTime.getTime()) / 1000 > 4) {
                this.cronometro = false;
            }

        } else {
            
            switch (event.keyCode) {
                case cc.macro.KEY.a:
                    this.direction = "a";
                    this.movimientoEnemy("left");
                    break;
                case cc.macro.KEY.left:
                    if ((this.directionx - 50) > -451 && !this.collisionleft) {
                        this.directionx -= 50;
                        this.direction = "left";
                        this.node.runAction(cc.moveBy(0.4, -50, 0));
                        this.movimientoEnemy("left");
                    }

                    break;

                case cc.macro.KEY.d:
                    this.direction = "right";
                    this.movimientoEnemy("d");
                    break;
                case cc.macro.KEY.right:
                    if ((this.directionx + 50) < 451 && !this.collisionrigh) {
                        this.directionx += 50;
                        this.direction = "right";
                        this.node.runAction(cc.moveBy(0.4, 50, 0));
                        this.movimientoEnemy("right");
                    }
                    break;

                case cc.macro.KEY.w:
                    this.direction = "up";
                    this.movimientoEnemy("w");
                    break;
                case cc.macro.KEY.up:
                    if ((this.directiony + 50) < 301 && !this.collisionup) {
                        this.directiony += 50;
                        this.direction = "up";
                        this.node.runAction(cc.moveBy(0.4, 0, 50));
                        this.movimientoEnemy("up");
                    }
                    break;
                case cc.macro.KEY.s:
                    this.direction = "down";
                    this.movimientoEnemy("s");
                    break;
                case cc.macro.KEY.down:

                    if ((this.directiony - 50) > -301 && !this.collisiondown) {

                        this.directiony -= 50;

                        this.direction = "down";
                        this.node.runAction(cc.moveBy(0.4, 0, -50));
                        this.movimientoEnemy("down");


                    }
                    break;

                case cc.macro.KEY.space:
                    var bullet = cc.instantiate(this.bullet);

                    bullet.getComponent("Bullet").direccion = this.direction;
                    bullet.x = this.node.position.x;
                    bullet.y = this.node.position.y;
                    // bullet.getComponent("Bullet").posX = this.rotationx;
                    // bullet.getComponent("Bullet").posY = this.rotationy;
                    //console.log(this.id);
                    bullet.id = this.id;

                    //console.log(bullet);
                    //console.log(this.direction);
                    this.stompClient.send('/app/bullet/' + this.room, {}, JSON.stringify({
                        id: bullet.id,
                        posX: this.node.position.x,
                        posY: this.node.position.y,
                        direccion: this.direction,
                    }));

                    //console.log("send desde keylistener ");
                    var scene = cc.find("mapa");
                    scene.addChild(bullet);
                    bullet.active = true;

                    break;
                case cc.macro.KEY.shift:
                    if (this.canracha1) {
                        console.log("---------------------------------------------");
                        this.racha1 = true;
                    }
                    break;
                case cc.macro.KEY.q:
                    if (this.canracha2) {                                            
                        this.racha2 = true;
                        this.stompClient.send('/app/time-' + this.room, {}, JSON.stringify({
                            id :  this.id     ,  
                            
                        }));

                    }
                    break;
                case cc.macro.KEY.e:
                    if (this.canracha3) {

                        this.racha3 = true;
                    }
                    break;
                default:
                    permit = false;



            }

            if (flag != this.direction && permit) {
                this.Dir = this.setRotate(flag);
                this.node.runAction(this.setRotate(flag));
            }
        }


    },
    movimientoEnemy: function (tecla) {
        this.stompClient.send('/app/movement/' + this.room, {}, JSON.stringify({
            id: this.id,
            tecla: tecla,
        }));

    },
    winnerchicken: function () {
        alert("you win");
    },

    makeShoot: function (shootEvent, bullet) {
        //no estoy eguro de que hace esto
        // this.stompClient.send('/app/bullet', {}, JSON.stringify({
        // posX : bullet.posX,
        // posY : bullet.posY,
        // }));
        //console.log("estoy en make shoot");

        //no seguro de la necesidad de esto
        var self = this;

        //instanciamos la bala
        var bullet = cc.instantiate(this.bullet);

        // no estoy seguro de como obtener la direccion de la bala (abajo arriba o lados)(enviando la direccion como evento)
        bullet.getComponent("Bullet").direccion = shootEvent.direccion;

        //obtener el lugar de disparo de la bala.
        bullet.x = shootEvent.posX;
        bullet.y = shootEvent.posY;
        bullet.id = shootEvent.id;
        //introducir el sprite de la bala a la escena
        var scene = cc.find("mapa");
        scene.addChild(bullet);
        bullet.active = true
    },


    onLoad: function () {

        this.room = cc.find("form").getComponent("Menu").room;
        this.username = cc.find("form").getComponent("Menu").username;
        this.id = cc.find("form").getComponent("Menu").id;
        this.players = null;
		this.cronometro = false;
        this.kills = 0;
        this.racha = 0;
        this.dead = false;

        this.connectAndSubscribe();
        cc.audioEngine.stopAll();
        //this.Move = this.setMove();
        //this.node.runAction(this.Move)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyEvent, this);
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
        this.rotationx = 0;
        this.rotationy = 90;
        //this.pos = getStompClientsSize();


        this.loadAllPlayers();


    },

    onEnable: function () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },

    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },
    onCollisionEnter: function (other, self) {

        if (other.node.name == "bullet" && !this.racha1) {
            this.dead = true;
            this.muerte(this.dead);
            this.racha = 0;
            this.stompClient.send('/app/kill-' + this.room, {}, JSON.stringify({
                idK: other.node.id,
                idM: this.id,
            }));
        } else if (other.node.name == "Wall1" || other.node.name == "Wall3" || other.node.name == "wall2" || other.node.name == "enem") {

            var otherAabb = other.world.aabb;
            var otherPreAabb = other.world.preAabb.clone();
            var selfAabb = self.world.aabb;
            var selfPreAabb = self.world.preAabb.clone();


            if (selfAabb.center.x - otherAabb.center.x < 0 && Math.abs(selfAabb.center.y - otherAabb.center.y) < 50) {

                this.collisionrigh = true;
                other.touchingX = false;
                other.touchingY = false;

            }


            if (Math.abs(selfAabb.center.y - otherAabb.center.y) < 50 && selfAabb.center.x - otherAabb.center.x > 0) {
                this.collisionleft = true;
                other.touchingX = true;
                other.touchingY = false;
            }


            if (selfAabb.center.y - otherAabb.center.y < 0 && Math.abs(selfAabb.center.x - otherAabb.center.x) < 50) {

                this.collisionup = true;
                other.touchingX = false;
                other.touchingY = true;

            }
            if (Math.abs(selfAabb.center.x - otherAabb.center.x) < 50 && selfAabb.center.y - otherAabb.center.y > 0) {


                this.collisiondown = true;
                other.touchingX = true;
                other.touchingY = true;
            }

        }
        if(this.racha1){
            this.racha1=false;
        }


    },

    onCollisionExit: function (other) {



        if (other.touchingX && other.touchingY) {
            other.touchingX = null;
            other.touchingY = null;
            this.collisiondown = false;
        } else if (!other.touchingX && other.touchingY) {
            other.touchingX = null;
            other.touchingY = null;
            this.collisionup = false
        } else if (other.touchingX && !other.touchingY) {
            other.touchingX = null;
            other.touchingY = null;
            this.collisionleft = false;
        } else if (!other.touchingX && !other.touchingY) {
            other.touchingX = null;
            other.touchingY = null;
            this.collisionrigh = false;
        }

    },

    shooTank: function () {
        //tank center
        this.MoveBullet = this.setMove();
        Bullet.node.runAction(this.MoveBullet);
    },

    start() {

    },
    connectAndSubscribe: function () {
        var self = this;
        getStompClient()
            .then((stpClient) => {
                self.stompClient = stpClient;
                subscribeTopic(self.stompClient, "/topic/room-movement-" + self.room, function (eventBody) {
                    var move = JSON.parse(eventBody.body);
                    self.loadedPlayers.forEach(
                        function (player) {
                            if (move.id == player.id && player.id != self.id) {

                                self.moveEnemi(player, move.tecla);
                            }
                        }
                    );
                });

                subscribeTopic(self.stompClient, "/topic/bullet-" + self.room, function (eventBody) {
                    //console.log("entre al suscribe de shoot");
                    var bulletEvent = JSON.parse(eventBody.body);

                    // if(bulletEvent.id != self.id){
                    //console.log("entrea la condicion de disparar bala");
                    self.makeShoot(bulletEvent, self.bullet);
                    //console.log("bala disparada");
                    // }
                });
                subscribeTopic(self.stompClient, "/topic/maravilla-" + self.room, function (eventBody) {
                    var wonderland = JSON.parse(eventBody.body);
                    cc.game.removePersistRootNode(cc.find('form'));
                    if (wonderland.pos == self.pos) {
                        alert("perdiste");
                        cc.director.loadScene("menu", function(){
                            self.node.active= false;
                       });	
                        self.node.destroy();
                    } else {
                        self.loadedPlayers.forEach(
                            function (player) {
                                console.log(player)
                                if (player.pos == wonderland.pos) {
                                    self.jugadores -= 1;
                                    if (self.jugadores == 1) {
                                        self.winnerchicken();
                                    }
                                    player.destroy();
                                }
                            }
                        );
                    }
                });
                subscribeTopic(self.stompClient, "/topic/kill-" + self.room, function (eventBody) {
                    var kill = JSON.parse(eventBody.body);
                    if (kill.idK == self.id) {
                        self.kills += 1;
                        self.racha += 1;
                        
                        if (self.racha==1){
                            self.canracha1=true;
                        }
                        if (self.racha==2){
                            self.canracha2=true;
                        }
                        if (self.racha==3){
                            self.canracha3=true;
                            self.racha=0;
                        }
                    }
                    self.loadedPlayers.forEach(
                        function (player) {
                            if (kill.idM == player.id) {                                
                                self.muerteene(player);
                            }

                        }
                    );
                });
				subscribeTopic(self.stompClient, "/topic/time-" + self.room, function (eventBody) {
                    var abcd = JSON.parse(eventBody.body); 
                    console.log("topico    "+ abcd.id); 
					
                    console.log("mio    "+ self.id);     
                    console.log("prueba   "+ (self.id!=abcd.id));                
                    if(self.id!=abcd.id){                       
                        self.actualTime = new Date();
                        self.cronometro = true;
                    }
                });

            });


    },
    moveEnemi: function (Player, direction) {
        var flag = Player.direction;
        var permit = true;
        switch (direction) {
            case "a":

                Player.direction = "left";
                break;
            case "left":
                if ((Player.directionx - 50) > -451) {
                    Player.directionx -= 50;
                    Player.direction = "left";
                    Player.runAction(cc.moveBy(0.4, -50, 0));
                }

                break;

            case "d":
                Player.direction = "right";
                break;
            case "right":
                if ((Player.directionx + 50) < 451) {
                    Player.directionx += 50;
                    Player.direction = "right";
                    Player.runAction(cc.moveBy(0.4, 50, 0));
                }
                break;

            case "w":
                Player.direction = "up";
                break;
            case "up":
                if ((Player.directiony + 50) < 301) {
                    Player.directiony += 50;
                    Player.direction = "up";
                    Player.runAction(cc.moveBy(0.4, 0, 50));
                }
                break;
            case "s":
                Player.direction = "down";
                break;
            case "down":
                if ((Player.directiony - 50) > -301) {
                    Player.directiony -= 50;
                    Player.runAction(cc.moveBy(0.4, 0, -50));
                    Player.direction = "down";
                }
            default:
                permit == false;

        }
        if (flag != Player.direction && permit) {

            Player.Dir = this.setRotateEne(Player, flag);
            Player.runAction(this.setRotateEne(Player, flag));

        }

    },
    setstart: function () {
        var self = this;
        this.pos = self.pos;
        this.loadedPlayers = self.loadedPlayers;
        if (self.pos == 0) {
            self.node.x, self.directionx = 100;
            self.node.y, self.directiony = -300;
        } else if (self.pos == 1) {
            self.node.x, self.directionx = -100;
            self.node.y, self.directiony = 300;
            self.direction = "down";
            this.Dir = this.setRotate("up");
            this.node.runAction(this.setRotate("up"));
        } else if (self.pos == 2) {
            self.node.x, self.directionx = 450;
            self.node.y, self.directiony = 100;
            self.direction = "left";
            this.Dir = this.setRotate("up");
            this.node.runAction(this.setRotate("up"));
        } else if (self.pos == 3) {
            self.node.x, self.directionx = -450;
            self.node.y, self.directiony = -100;
            self.direction = "right";
            this.Dir = this.setRotate("up");
            this.node.runAction(this.setRotate("up"));
        }
    },
    setstartene: function (player, pos) {
        var self = this;
        if (pos == 0) {
            player.direction = "up";
        } else if (pos == 1) {
            player.direction = "down";
            player.Dir = self.setRotateEne(player, "up");
            player.runAction(self.setRotateEne(player, "up"));
        } else if (pos == 2) {
            player.direction = "left";
            player.Dir = self.setRotateEne(player, "up");
            player.runAction(self.setRotateEne(player, "up"));
        } else if (pos == 3) {
            player.direction = "right";
            player.Dir = self.setRotateEne(player, "up");
            player.runAction(self.setRotateEne(player, "up"));
        }
    },
    loadAllPlayers: function () {
        var self = this;
        this.jugadores = 4;
        var callback = {
            onSuccess: function (response) {
                var cont = 2;
                response.data.forEach(
                    function (player) {

                        if (player.id != self.id) {
                            var plr = cc.instantiate(self.enem);
                            self.loadedPlayers.push(plr);
                            plr.id = player.id;
                            plr.pos = player.pos;
                            if (player.pos == 0) {
                                plr.x = 100;
                                plr.y = -300;
                                plr.directionx = 100;
                                plr.directiony = -300;
                            }
                            if (player.pos == 1) {
                                plr.x = -100;
                                plr.y = 300;
                                plr.directionx = -100;
                                plr.directiony = 300;
                                //plr.direction = "down";
                                //plr.Dir = self.setRotateEne(plr,"up");
                                //plr.runAction(self.setRotateEne(plr,"up"));

                            }
                            if (player.pos == 2) {
                                plr.x = 450;
                                plr.y = 100;
                                plr.directionx = 450;
                                plr.directiony = 100;
                            }
                            if (player.pos == 3) {
                                plr.x = -450;
                                plr.y = -100;
                                plr.directionx = -450;
                                plr.directiony = -100;
                            }
                            cont++;
                            var scene = cc.find("mapa");
                            scene.addChild(plr);
                            plr.active = true;
                            self.setstartene(plr, player.pos);
                            //self.leftPlayersLabel.string = self.loadedPlayers.length;
                        } else {

                            self.pos = player.pos;
                            if (player.pos == 0) {
                                self.node.x = 100;
                                self.node.y = -300;
                            }
                            if (player.pos == 1) {
                                self.node.x = -100;
                                self.node.y = 300;
                            }
                            if (player.pos == 2) {
                                self.node.x = 450;
                                self.node.y = 100;
                            }
                            if (player.pos == 3) {
                                self.node.x = -450;
                                self.node.y = -100;
                            }
                        }

                    }

                );
                self.setstart();


            },
            onFailed: function (error) {
                console.log(error);
            }

        };
        getRoomPlayers(self.room, callback);
    },
    muerte: function () {
        if (this.pos == 0) {

            this.node.x = 100;
            this.node.y = -300;
			this.direction="up";
        }
        if (this.pos == 1) {
            this.node.x = -100;
            this.node.y = 300;
			this.direction="down";
        }
        if (this.pos == 2) {
            this.node.x = 450;
            this.node.y = 100;
			this.direction="left";
        }
        if (this.pos == 3) {
            this.node.x = -450;
            this.node.y = -100;
			this.direction="right";
        }


    },
    
    muerteene: function (ene) {

        if (ene.pos == 0) {

            ene.x = 100;
            ene.y = -300;
			ene.direction="up";
        }
        if (ene.pos == 1) {

            ene.x = -100;
            ene.y = 300;
			ene.direction="down";
        }
        if (ene.pos == 2) {

            ene.x = 450;
            ene.y = 100;
			ene.direction="left";
        }
        if (ene.pos == 3) {

            ene.x = -450;
            ene.y = -100;
			ene.direction="rigth";
        }
    },













});
