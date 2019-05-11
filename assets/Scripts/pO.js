// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        id: null,
        directionx: 0,
        directiony: 0,
    },

    moveTank: function (direction) {
        switch (direction) {
            case "a":
                this.direction = "left";
                break;
            case "left":
                if ((this.directionx - 50) > -451 && !this.collisionleft) {
                    this.directionx -= 50;
                    this.direction = "left";
                    this.node.runAction(cc.moveBy(0.4, -50, 0));
                }

                break;

            case "d":
                this.direction = "right";
                break;
            case "right":
                if ((this.directionx + 50) < 451 && !this.collisionrigh) {
                    this.directionx += 50;
                    this.direction = "right";
                    this.node.runAction(cc.moveBy(0.4, 50, 0));
                }
                break;

            case "w":
                this.direction = "up";
                break;
            case cc.macro.KEY.up:
                if ((this.directiony + 50) < 301 && !this.collisionup) {
                    this.directiony += 50;
                    this.direction = "up";
                    this.node.runAction(cc.moveBy(0.4, 0, 50));
                }
                break;
            case "s":
                this.direction = "down";
                break;
            case "down":

                if ((this.directiony - 50) > -301 && !this.collisiondown) {

                    this.directiony -= 50;

                    this.rota = "down";
                    this.node.runAction(cc.moveBy(0.4, 0, -50));


                }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    //start () {

    //},

    // update (dt) {},
});
