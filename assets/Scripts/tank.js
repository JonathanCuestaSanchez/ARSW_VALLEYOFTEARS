cc.Class({
    extends: cc.Component,

    properties: {
        directionx: 0,
        directiony: 0,
        direction: "up",
        colicion: false,
        collisionleft: false,
        collisionrigh: false,
        collisionup: false,
        collisiondown: false,
    },
    setRotate: function (flag) {
        var rotate;
        if (this.direction == "up") {
            if (flag == "left") {
                rotate = cc.rotateBy(0, 90);
            } else if (flag == "down") {
                rotate = cc.rotateBy(0, 180);
            } else {
                rotate = cc.rotateBy(0, 270);
            }


        } else if (this.direction == "down") {
            if (flag == "right") {
                rotate = cc.rotateBy(0, 90);
            } else if (flag == "up") {
                rotate = cc.rotateBy(0, 180);
            } else {
                rotate = cc.rotateBy(0, 270);
            }

        }
        else if (this.direction == "left") {
            if (flag == "down") {
                rotate = cc.rotateBy(0, 90);
            } else if (flag == "right") {
                rotate = cc.rotateBy(0, 180);
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
                this.direction = "left";
                break;
            case cc.macro.KEY.left:
                if ((this.directionx - 50) > -451 && !this.collisionleft) {
                    this.directionx -= 50;
                    this.direction = "left";
                    this.node.runAction(cc.moveBy(0.4, -50, 0));
                }

                break;

            case cc.macro.KEY.d:
                this.direction = "right";
                break;
            case cc.macro.KEY.right:
                if ((this.directionx + 50) < 451 && !this.collisionrigh) {
                    this.directionx += 50;
                    this.direction = "right";
                    this.node.runAction(cc.moveBy(0.4, 50, 0));
                }
                break;

            case cc.macro.KEY.w:
                this.direction = "up";
                break;
            case cc.macro.KEY.up:
                if ((this.directiony + 50) < 301 && !this.collisionup) {
                    this.directiony += 50;
                    this.direction = "up";
                    this.node.runAction(cc.moveBy(0.4, 0, 50));
                }
                break;
            case cc.macro.KEY.s:
                this.direction = "down";
                break;
            case cc.macro.KEY.down:

                if ((this.directiony - 50) > -301 && !this.collisiondown) {

                    this.directiony -= 50;

                    this.direction = "down";
                    this.node.runAction(cc.moveBy(0.4, 0, -50));


                }
                break;


            default:
                permit = false;

        }

        if (flag != this.direction && permit) {
            this.Dir = this.setRotate(flag);
            this.node.runAction(this.setRotate(flag));
        }


    },


    onLoad: function () {
        cc.audioEngine.stopAll();
        //this.Move = this.setMove();
        //this.node.runAction(this.Move)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyEvent, this);
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;

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
        
        
        if (selfAabb.center.x-otherAabb.center.x<0 && Math.abs(selfAabb.center.y - otherAabb.center.y)<50) {

            this.collisionrigh = true;
            other.touchingX = false;
            other.touchingY =false;

        }


        if (Math.abs(selfAabb.center.y - otherAabb.center.y)<50 && selfAabb.center.x-otherAabb.center.x>0 ) {
            this.collisionleft = true;
            other.touchingX = true;
            other.touchingY =false;
        }


        if (selfAabb.center.y - otherAabb.center.y<0 && Math.abs(selfAabb.center.x - otherAabb.center.x)<50) {

            this.collisionup = true;
            other.touchingX = false;
            other.touchingY =true;

        }
        if (Math.abs(selfAabb.center.x - otherAabb.center.x)<50 && selfAabb.center.y - otherAabb.center.y>0) {


            this.collisiondown = true;
            other.touchingX = true;
            other.touchingY =true;
        }
        
        


    },
    onCollisionExit: function (other) {



        if (other.touchingX && other.touchingY) {
            other.touchingX = null;
            other.touchingY =null;
            this.collisiondown = false;
        }else if(!other.touchingX && other.touchingY){
            other.touchingX = null;
            other.touchingY =null;
            this.collisionup = false
        }else if(other.touchingX && !other.touchingY){
            other.touchingX = null;
            other.touchingY =null;
            this.collisionleft = false;
        }else if(!other.touchingX && !other.touchingY){
            other.touchingX = null;
            other.touchingY =null;
            this.collisionrigh = false;
        }
        
    },
    start() {

    },

    //update (dt) {

    //},
});
