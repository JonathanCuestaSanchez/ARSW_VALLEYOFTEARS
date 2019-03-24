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
        directionx:0,
        directiony:0,
        maxSpeed : cc.v2(400,400)
    },
    setMove: function (){
        //var moveUp =cc.moveBy( 100 + this.directionx, -300 + this.directiony)
        var moveUp = cc.moveBy(10, 100 + this.directionx, -300 + this.directiony);
        return moveUp;
    },

    onKeyEvent (event) {
        // set a flag when key pressed
        
        switch(event.keyCode) {
            
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.directionx -= 1;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.directionx += 1;
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:

                this.directiony += 1;
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.directionx -= 1;
                break;
        }
        this.Move = this.setMove();
        this.node.runAction(this.Move)
        
    },

    onLoad () {
        //this.Move = this.setMove();
        //this.node.runAction(this.Move)
        console.log("entre1");
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyEvent,this);
    },

    start () {

    },

    // update (dt) {},
});
