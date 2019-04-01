// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
		speed: 3000,
		posX: 0,
    posY: 0,
		direccion: "up",
    },
	

    // LIFE-CYCLE CALLBACKS:

		// onLoad () {},
		onCollisionEnter: function (other, self) {
			
					this.node.destroy();
			

		},

    update: function (dt) {
			
	
        // var angle = Math.atan2(this.posX, this.posY);
		if(this.direccion == "down"){
			
			this.node.x += this.speed * dt * Math.cos(90*Math.PI/180.0);      // 90 y 270 abajo    270 y 90 arriba
			this.node.y += this.speed * dt * Math.sin(270*Math.PI/180.0);     //180 y 0 izquierda  0 y 180 derecha 
		}else if(this.direccion == "up"){
			
			this.node.x += this.speed * dt * Math.cos(270*Math.PI/180.0);      // 90 y 270 abajo    270 y 90 arriba
			this.node.y += this.speed * dt * Math.sin(90*Math.PI/180.0);     //180 y 0 izquierda  0 y 180 derecha 
		}else if(this.direccion == "left"){
			
			this.node.x += this.speed * dt * Math.cos(180*Math.PI/180.0);      // 90 y 270 abajo    270 y 90 arriba
			this.node.y += this.speed * dt * Math.sin(0*Math.PI/180.0);     //180 y 0 izquierda  0 y 180 derecha 
		}else{
			
			this.node.x += this.speed * dt * Math.cos(0*Math.PI/180.0);      // 90 y 270 abajo    270 y 90 arriba
			this.node.y += this.speed * dt * Math.sin(180*Math.PI/180.0);     //180 y 0 izquierda  0 y 180 derecha 
		}
		// console.log(angle);
        
    },

    // update (dt) {},
});

