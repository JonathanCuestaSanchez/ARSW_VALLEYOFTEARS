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
        direction: "up",
    },
    setMove: function (){
        var moveUp =cc.moveTo(0.5, this.directionx,  this.directiony)
        //var moveUp = cc.moveBy(100,-300);
        return moveUp;
    },
    setRotate : function (flag){
        var rotate;
        if(this.direction == "up"){
            if(flag=="left"){
                rotate= cc.rotateBy(0,90);
            } else if(flag =="down"){
                rotate= cc.rotateBy(0,180);
            }else{
                rotate= cc.rotateBy(0,270);
            }

           
        } else if(this.direction == "down"){
            if(flag=="right"){
                rotate= cc.rotateBy(0,90);
            } else if(flag =="up"){
                rotate= cc.rotateBy(0,180);
            }else{
                rotate= cc.rotateBy(0,270);
            }
            
        }
        else if(this.direction == "left"){
            if(flag=="down"){
                rotate= cc.rotateBy(0,90);
            } else if(flag =="right"){
                rotate= cc.rotateBy(0,180);
            }else{
                rotate= cc.rotateBy(0,270);
            }
            
        } else {
            if(flag=="up"){
                rotate= cc.rotateBy(0,90);
            } else if(flag =="left"){
                rotate= cc.rotateBy(0,180);
            }else{
                rotate= cc.rotateBy(0,270);
            }
            
        }
        return rotate;
        
    },
    onKeyEvent (event) {
        // set a flag when key pressed
        var flag=this.direction;
        var permit=true;
        switch(event.keyCode) {
            
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.directionx -= 50;
                this.direction="left";
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.directionx += 50;
                this.direction="right";
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                this.directiony += 50;
                this.direction="up";
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.directiony -= 50;
                this.direction="down";
                break;
            default:
                permit=false;
        }
        this.Move = this.setMove();
        this.node.runAction(this.Move);
        if (flag != this.direction && permit){
            this.Dir = this.setRotate(flag);
            this.node.runAction(this.Dir);
        }
        
        
    },

    onLoad () {
        cc.audioEngine.stopAll();
        //this.Move = this.setMove();
        //this.node.runAction(this.Move)
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyEvent,this);
    },

    start () {

    },

    // update (dt) {},
});
