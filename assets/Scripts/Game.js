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
        tank: {
            default: null,
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

     connectAndSubscribe: function () {
        console.info('Connecting to WS...');
        var socket = new SockJS('http://localhost:8080');
        //var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);
        
   
        
            console.log('Connected: ');
            
            
      

    


    },  
    onLoad () {
        this.stompClient=null;
        this.connectAndSubscribe();
    },
    
        
    //start () {
        
        
        //websocket connection
        
    
    // update (dt) {},
});
