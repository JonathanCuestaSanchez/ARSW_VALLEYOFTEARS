import { getStompClient, subscribeTopic, getStompClientsSize, unsubscribeTopic } from './aaaaa';
import { getRoomPlayers, joinRoom, createRoom } from './Rest.js';
cc.Class({
    extends: cc.Component,

    properties: {

        pos: null,
        id: null,
        stompClient: null,

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
    setRotateEne: function (Player,flag) {
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
                var scene = cc.find("Canvas");
                scene.addChild(bullet);
                bullet.active = true;

                break;

            default:
                permit = false;



        }

        if (flag != this.direction && permit) {
            this.Dir = this.setRotate(flag);
            this.node.runAction(this.setRotate(flag));
        }



    },
    movimientoEnemy: function (tecla) {
        this.stompClient.send('/app/room-movement', {}, JSON.stringify({
            id: this.id,
            tecla: tecla,
        }));

    },
	
	makeShoot: function(shootEvent,bullet){
		//no estoy eguro de que hace esto
		this.stompClient.send('/app/room-bullet', {}, JSON.stringify({
			posX : bullet.posX,
			posY : bullet.posY,
        }));
		
		//no seguro de la necesidad de esto
		var self = this;
		
		//instanciamos la bala
		var bullet = cc.instantiate(this.bullet);
		
		// no estoy seguro de como obtener la direccion de la bala (abajo arriba o lados)
		bullet.getComponent("Bullet").direccion = this.direction;
		
		//obtener el lugar de disparo de la bala.
		bullet.x = shootEvent.posX;
		bullet.y = shootEvent.posY;
		
		//introducir el sprite de la bala a la escena
		var scene = cc.find("Canvas");
		scene.addChild(bullet);
		bullet.active = true
	},


    onLoad: function () {

        this.room = cc.find("form").getComponent("Menu").room;
        this.username = cc.find("form").getComponent("Menu").username;
        this.id = cc.find("form").getComponent("Menu").id;
        this.players = null;

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
                subscribeTopic(self.stompClient, "/topic/room-movement", function (eventBody) {

                    var move = JSON.parse(eventBody.body);
                    self.loadedPlayers.forEach(
                        function (player) {
                            if (move.id == player.id && player.id != self.id) {
                                
                                self.moveEnemi(player,move.tecla);
                                console.log(move)
                            }
                        }
                    );



                });
				
				subscribeTopic(self.stompClient, "/topic/bullet", function (eventBody) {

                    var bulletEvent = JSON.parse(eventBody.body);
					
					if(bulletEvent.id != self.id){
						self.makeShoot(bulletEvent,self.bullet);
						console.log("bala disparada");
					}
                });
				
            });


    },
    moveEnemi: function (Player, direction) {
        var flag=Player.direction;
        var permit=true;
        switch (direction) {
            case "a":
                
                Player.direction = "left";
                break;
            case "left":
                if ((Player.directionx - 50) > -451 ) {
                    Player.directionx -= 50;
                    Player.direction = "left";
                    Player.runAction(cc.moveBy(0.4, -50, 0));
                }

                break;

            case "d":
                Player.direction = "right";
                break;
            case "right":
                if ((Player.directionx + 50) < 451 ) {
                    Player.directionx += 50;
                    Player.direction = "right";
                    Player.runAction(cc.moveBy(0.4, 50, 0));
                }
                break;

            case "w":
                Player.direction = "up";
                break;
            case "up":
                if ((Player.directiony + 50) < 301 ) {
                    Player.directiony += 50;
                    Player.direction = "up";
                    Player.runAction(cc.moveBy(0.4, 0, 50));
                }
                break;
            case "s":
                Player.direction = "down";
                break;
            case "down":
                if ((Player.directiony - 50) > -301 ) {          
                    Player.directiony -= 50;
                    Player.runAction(cc.moveBy(0.4, 0, -50));
                }
            default:
                permit==false;
        
        }
        if (flag != Player.direction && permit) {
            
            Player.Dir = this.setRotateEne(Player,flag);
            Player.runAction(this.setRotateEne(Player,flag));
           
        }
        
    },
    setstart: function () {
        var self = this;
        if (self.pos == 0) {
            self.node.x, self.directionx = 100;
            self.node.y, self.directiony = -300;
        } else if (self.pos == 1) {
            self.node.x, self.directionx = -100;
            self.node.y, self.directiony = 300;
            self.direction="down";
            this.Dir = this.setRotate("up");
            this.node.runAction(this.setRotate("up"));
        } else if (self.pos == 2) {
            self.node.x, self.directionx = 450;
            self.node.y, self.directiony = 100;
            self.direction="left";
            this.Dir = this.setRotate("up");
            this.node.runAction(this.setRotate("up"));
        } else if (self.pos == 3) {
            self.node.x, self.directionx = -450;
            self.node.y, self.directiony = -100;
            self.direction="right";
            this.Dir = this.setRotate("up");
            this.node.runAction(this.setRotate("up"));
        }
    },
    setstartene: function (player,pos) {
        var self = this;
        if (pos == 0) {
        } else if (pos == 1) {
            player.direction="down";
            player.Dir = self.setRotateEne(player,"up");
            player.runAction(self.setRotateEne(player,"up"));
        } else if (pos == 2) {
            player.direction="left";
            player.Dir = self.setRotateEne(player,"up");
            player.runAction(self.setRotateEne(player,"up"));
        } else if (pos == 3) {
            player.direction="right";
            player.Dir = self.setRotateEne(player,"up");
            player.runAction(self.setRotateEne(player,"up"));
        }
    },
    loadAllPlayers: function () {
        var self = this;
        var callback = {
            onSuccess: function (response) {
                var cont = 2;
                response.data.forEach(
                    function (player) {

                        if (player.id != self.id) {
                            var plr = cc.instantiate(self.enem);
                            self.loadedPlayers.push(plr);
                            plr.id = player.id;
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
                            var scene = cc.find("Canvas");
                            scene.addChild(plr);
                            plr.active = true;
                            self.setstartene(plr,player.pos);
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












    //update (dt) {

    //},
});
